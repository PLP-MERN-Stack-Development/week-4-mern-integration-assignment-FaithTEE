import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminNavbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/admin" className="text-2xl font-bold">
          Admin Panel
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/admin" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/admin/posts" className="hover:text-gray-300">
            Posts
          </Link>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;