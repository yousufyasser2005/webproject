const Category = require('../models/Category');
const Book = require('../models/Book');

// @desc    Get all active categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get categories',
      error: error.message
    });
  }
};

// @desc    Get all categories (admin)
// @route   GET /api/categories/all
// @access  Private/Admin
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Get all categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get categories',
      error: error.message
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid category ID',
      error: error.message
    });
  }
};

// @desc    Get books by category
// @route   GET /api/categories/:id/books
// @access  Public
exports.getBooksByCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    const books = await Book.find({ 
      category: category.name,
      approvalStatus: 'approved'
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      category: category.name,
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error('Get books by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get books',
      error: error.message
    });
  }
};

// @desc    Add new category
// @route   POST /api/categories
// @access  Private/Admin
exports.addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    console.error('Add category error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists'
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Failed to create category',
      error: error.message
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Category updated successfully',
      data: category
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update category',
      error: error.message
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Check if any books use this category
    const booksCount = await Book.countDocuments({ category: category.name });
    
    if (booksCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. ${booksCount} book(s) are using this category.`
      });
    }
    
    await category.deleteOne();
    
    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to delete category',
      error: error.message
    });
  }
};
