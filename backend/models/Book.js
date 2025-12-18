const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  author: {
    type: String,
    required: [true, 'Please provide an author']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'General'
  },
  condition: {
    type: String,
    enum: ['New', 'Used', 'Like New'],
    default: 'Used'
  },
  description: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 1,
    min: 0
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved'],
    default: 'available'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
