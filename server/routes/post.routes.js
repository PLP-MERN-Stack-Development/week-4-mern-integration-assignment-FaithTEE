import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/post.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(protect, admin, createPost);
router
  .route('/:id')
  .get(getPostById)
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost);
router.route('/:id/like').put(protect, likePost);

export default router;