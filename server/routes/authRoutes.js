// // server/routes/authRoutes.js
// const router = require('express').Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { check, validationResult } = require('express-validator');
// const nodemailer = require('nodemailer');
// const { OAuth2Client } = require('google-auth-library');
// const User = require('../models/User');
// // ✅ NEW: Import the TestResult model so we can fetch history
// const TestResult = require('../models/TestResult');

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // --- EMAIL TRANSPORTER CONFIG ---
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // --- MIDDLEWARE ---
// const auth = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (e) {
//     res.status(400).json({ msg: 'Token is not valid' });
//   }
// };

// // --- ROUTES ---

// // 1. GET CURRENT USER (Now includes Test History!)
// router.get('/me', auth, async (req, res) => {
//   try {
//     // 1. Fetch the User (without password)
//     // .lean() converts the Mongoose document to a plain JavaScript object so we can add properties to it
//     const user = await User.findById(req.user.id).select('-password').lean();
    
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     // 2. Fetch the Test History for this user
//     const testHistory = await TestResult.find({ user: req.user.id }).sort({ date: -1 });

//     // 3. Attach history to the user object
//     user.testHistory = testHistory;

//     // 4. Send the combined package
//     res.json(user);

//   } catch (err) {
//     console.error("Profile Fetch Error:", err);
//     res.status(500).send('Server Error');
//   }
// });

// // 2. REGISTER
// router.post('/register', [
//   check('fullname', 'Name is required').not().isEmpty(),
//   check('email', 'Please include a valid email').isEmail(),
//   check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
// ], async (req, res) => {
  
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   try {
//     const { fullname, email, password } = req.body;
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: 'User already exists' });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = new User({ fullname, email, password: hashedPassword });
//     await user.save();

//     const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     const url = `http://localhost:3000/verify-email?token=${verificationToken}`;
    
//     await transporter.sendMail({
//       to: email,
//       subject: 'Verify your Psychometric App Account',
//       html: `<h3>Hello ${fullname},</h3>
//              <p>Please click the link below to verify your email address:</p>
//              <a href="${url}">Verify Email</a>
//              <p>This link expires in 1 hour.</p>`
//     });

//     res.json({ msg: "Registration successful! Please check your email to verify account." });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // 3. VERIFY EMAIL
// router.post('/verify-email', async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) return res.status(400).json({ msg: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
    
//     if (!user) return res.status(400).json({ msg: "User not found" });
//     if (user.isVerified) return res.status(400).json({ msg: "Email already verified" });

//     user.isVerified = true;
//     await user.save();

//     const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    
//     res.json({ 
//       msg: "Email verified successfully!", 
//       token: authToken, 
//       user: { id: user._id, fullname: user.fullname, email: user.email } 
//     });

//   } catch (err) {
//     res.status(400).json({ msg: "Invalid or expired verification link" });
//   }
// });

// // 4. LOGIN
// router.post('/login', [
//   check('username', 'Please include a valid email').isEmail(),
//   check('password', 'Password is required').exists()
// ], async (req, res) => {
  
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ email: username });
    
//     if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

//     if (!user.isVerified) {
//       return res.status(400).json({ msg: 'Please check your email to verify your account first.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
//     res.json({ token, user: { id: user._id, fullname: user.fullname, email: user.email } });
    
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // 5. GOOGLE AUTH
// router.post('/google', async (req, res) => {
//   try {
//     const { token } = req.body;
//     const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
//     const { name, email } = ticket.getPayload();

//     let user = await User.findOne({ email });

//     if (!user) {
//       const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(randomPassword, salt);

//       user = new User({ 
//         fullname: name, 
//         email, 
//         password: hashedPassword,
//         isVerified: true 
//       });
//       await user.save();
//     }

//     const localToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
//     res.json({ token: localToken, user: { id: user._id, fullname: user.fullname, email: user.email } });

//   } catch (err) {
//     res.status(400).json({ msg: 'Google verification failed' });
//   }
// });

// module.exports = router;

// server/routes/authRoutes.js

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const TestResult = require('../models/TestResult');

// --- MIDDLEWARE ---
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



// =====================================
// 1️⃣ GET CURRENT USER (WITH TEST HISTORY)
// =====================================
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const testHistory = await TestResult
      .find({ user: req.user.id })
      .sort({ date: -1 });

    user.testHistory = testHistory;

    res.json(user);

  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).send('Server Error');
  }
});



// =====================================
// 2️⃣ REGISTER
// =====================================
router.post('/register', [
  check('fullname', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { fullname, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ fullname, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});



// =====================================
// 3️⃣ LOGIN
// =====================================
router.post('/login', [
  
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
console.log("🔥 NEW AUTH ROUTES FILE LOADED 🔥");

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
