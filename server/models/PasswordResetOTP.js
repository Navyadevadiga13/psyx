const mongoose = require('mongoose');

const PasswordResetOTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  nextAllowedTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  'PasswordResetOTP',
  PasswordResetOTPSchema
);