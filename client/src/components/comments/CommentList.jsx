import { useAuth } from '../../contexts/AuthContext';

const CommentList = ({ comments }) => {
  const { isAdmin } = useAuth();

  if (!comments || comments.length === 0) {
    return <div className="text-gray-500 italic">No comments yet</div>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-800">{comment.author?.name || 'Anonymous'}</p>
              <p className="text-gray-600 text-sm mb-2">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-700">{comment.content}</p>
            </div>
            {isAdmin && (
              <button className="text-red-500 hover:text-red-700 text-sm">
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;