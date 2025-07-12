import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';

// @desc    Add a comment
// @route   POST /api/posts/:postId/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const post = await Post.findById(req.params.postId);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const comment = new Comment({
    content,
    author: req.user._id,
    post: post._id,
  });

  const createdComment = await comment.save();
  post.comments.push(createdComment._id);
  await post.save();

  res.status(201).json(createdComment);
});

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private/Admin
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    // Remove comment reference from post
    await Post.updateOne(
      { _id: comment.post },
      { $pull: { comments: comment._id } }
    );
    
    await comment.deleteOne();
    res.json({ message: 'Comment removed' });
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

export { addComment, deleteComment };