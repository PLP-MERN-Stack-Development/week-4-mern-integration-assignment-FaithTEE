import express from 'express';
import { getUserProfile, adminCheck } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/profile').get(protect, getUserProfile);
router.route('/admin-check').get(protect, adminCheck);

export default router;