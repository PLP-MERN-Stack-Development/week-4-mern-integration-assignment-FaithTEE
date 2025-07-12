import express from 'express';
import { addComment, deleteComment } from '../controllers/comment.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/posts/:postId/comments').post(protect, addComment);
router.route('/comments/:id').delete(protect, admin, deleteComment);

export default router;