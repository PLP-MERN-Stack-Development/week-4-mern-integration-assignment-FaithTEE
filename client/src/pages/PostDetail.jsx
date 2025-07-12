import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useApi from '../hooks/useApi';
import { useAuth } from '../contexts/AuthContext';
import CommentList from '../components/comments/CommentList';
import CommentForm from '../components/comments/CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { get, post: postApi, put } = useApi();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await get(`/api/posts/${id}`);
        setPost(data);
        setComments(data.comments || []);
      } catch (error) {
        toast.error('Failed to load post');
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to like posts');
      return;
    }

    try {
      const data = await put(`/api/posts/${id}/like`);
      setPost({ ...post, likes: data.likes });
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleCommentSubmit = async (content) => {
    try {
      const newComment = await postApi(`/api/posts/${id}/comments`, { content });
      setComments([...comments, newComment]);
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  if (!post) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-gray-600 text-sm">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="prose max-w-none text-gray-700 mb-6">
            {post.content}
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isAuthenticated ? 'hover:text-blue-600 cursor-pointer' : 'cursor-default'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{post.likes?.length || 0} likes</span>
            </button>
          </div>
        </div>
      </article>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
        {isAuthenticated ? (
          <CommentForm onSubmit={handleCommentSubmit} />
        ) : (
          <div className="mb-4">
            <Link
              to="/login"
              className="text-blue-600 hover:underline"
            >
              Login
            </Link>{' '}
            to post a comment
          </div>
        )}
        <CommentList comments={comments} />
      </section>
    </div>
  );
};

export default PostDetail;