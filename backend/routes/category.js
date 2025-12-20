const express = require('express');
const router = express.Router();
const {
  getCategories,
  getAllCategories,
  getCategoryById,
  getBooksByCategory,
  addCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.get('/:id/books', getBooksByCategory);

// Admin routes
router.get('/admin/all', protect, adminOnly, getAllCategories);
router.post('/', protect, adminOnly, addCategory);
router.put('/:id', protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

module.exports = router;
