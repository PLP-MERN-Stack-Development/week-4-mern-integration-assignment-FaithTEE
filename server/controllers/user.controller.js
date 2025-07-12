import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Check if user is admin
// @route   GET /api/users/admin-check
// @access  Private/Admin
const adminCheck = asyncHandler(async (req, res) => {
  res.json({ isAdmin: req.user.role === 'admin' });
});

export { getUserProfile, adminCheck };