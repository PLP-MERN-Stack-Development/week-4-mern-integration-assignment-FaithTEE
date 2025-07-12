import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PostCard = ({ post }) => {
  const { isAuthenticated } = useAuth();

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
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
            <span className="text-gray-500">
              {post.likes?.length || 0}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;