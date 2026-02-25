// server/routes/testRoutes.js
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const TestResult = require('../models/TestResult'); 

// --- MIDDLEWARE: The Security Guard ---
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

// --- ROUTE 1: SAVE RESULTS (POST) ---
router.post('/save', auth, async (req, res) => {
  try {
    const { testName, result } = req.body;

    // 🛡️ SECURITY SHIELD: Input Validation
    // 1. Check if data exists
    if (!testName || !result) {
      return res.status(400).json({ msg: "Bad Request: Missing 'testName' or 'result'." });
    }

    // 2. Prevent saving empty strings
    if (typeof testName === 'string' && testName.trim().length === 0) {
      return res.status(400).json({ msg: "Bad Request: Test Name cannot be empty." });
    }

    // Create the new entry
    const newResult = new TestResult({
      user: req.user.id,
      testName: testName.trim(), 
      result: result
    });

    const savedResult = await newResult.save();
    res.json(savedResult); // Send back the receipt
    
  } catch (err) {
    console.error("❌ Save Error:", err);
    res.status(500).json({ error: 'Server Error: Failed to save result' });
  }
});

// --- ROUTE 2: GET MY HISTORY (GET) ---
router.get('/history', auth, async (req, res) => {
  try {
    // Find results for THIS user, newest first
    const results = await TestResult.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(50); // Optimization: Limit to last 50 tests
      
    res.json(results);
  } catch (err) {
    console.error("❌ History Error:", err);
    res.status(500).json({ error: 'Server Error: Failed to fetch history' });
  }
});

module.exports = router;
