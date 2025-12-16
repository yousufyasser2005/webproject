const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@MintLib\.com$/i, 'Admin email must end with @MintLib.com']
  },
  id: {
    type: String,
    required: [true, 'Please provide an ID'],
    unique: true,
    match: [/^[0-9]{9}$/, 'ID must be exactly 9 digits']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);
