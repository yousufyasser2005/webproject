const express = require('express');
const router = express.Router();
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks
} = require('../controllers/bookController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);

// Admin routes
router.post('/', protect, adminOnly, addBook);
router.put('/:id', protect, adminOnly, updateBook);
router.delete('/:id', protect, adminOnly, deleteBook);

module.exports = router;
