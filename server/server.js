const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit'); // 1. NEW IMPORT
require('dotenv').config();

// Fix for MongoDB querySrv ECONNREFUSED issue on some networks
if (process.env.MONGO_URI && process.env.MONGO_URI.startsWith('mongodb+srv')) {
  const dns = require('dns');
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

const app = express();
const PORT = process.env.PORT || 5009;

// --- 1. MIDDLEWARE ---
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://psyx.io',
    'https://www.psyx.io'
  ],
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));

// --- 2. RATE LIMITING (The Traffic Cop) ---
// This prevents brute-force attacks and simple DoS attacks

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

// Apply to all API routes
app.use('/api', limiter);


// --- 3. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/psychometric-db')
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// --- 4. ROUTES ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));

// --- 5. ERROR HANDLERS ---
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log('🚀 Server running safely at http://localhost:${PORT}');
});