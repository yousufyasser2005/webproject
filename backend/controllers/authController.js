const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters and include both letters and numbers'
      });
    }

    const userExists = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (userExists) {
      if (userExists.email === email) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }
      if (userExists.phone === phone) {
        return res.status(400).json({
          success: false,
          message: 'An account with this phone number already exists'
        });
      }
    }

    if (role === 'administrator') {
      const adminExists = await Admin.findOne({ email });
      if (!adminExists) {
        return res.status(400).json({
          success: false,
          message: "Can't register account. This email isn't an admin email"
        });
      }
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role || 'user'
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, login_role } = req.body;

    if (!email || !password || !login_role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, password, and role'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect role or email or password'
      });
    }

    if (user.role !== login_role) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect role or email or password'
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect role or email or password'
      });
    }

    user.is_logged_in = true;
    await user.save();

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        is_logged_in: user.is_logged_in,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.is_logged_in = false;
    await user.save();

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout',
      error: error.message
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, id } = req.body;

    const adminExists = await Admin.findOne({ 
      $or: [{ email }, { id }] 
    });

    if (adminExists) {
      let message = 'Error: ';
      if (adminExists.email === email && adminExists.id === id) {
        message += 'Both email and ID already exist';
      } else if (adminExists.email === email) {
        message += 'Admin email already exists';
      } else {
        message += 'Admin ID already exists';
      }
      
      return res.status(400).json({
        success: false,
        message
      });
    }

    const admin = await Admin.create({
      name,
      email,
      id
    });

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        adminId: admin.id
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during admin creation',
      error: error.message
    });
  }
};
