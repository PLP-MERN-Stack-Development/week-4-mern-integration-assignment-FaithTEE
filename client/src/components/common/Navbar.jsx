import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.5a1 1 0 01.894.553l7 14a1 1 0 01-.447 1.342A1 1 0 0119 18.5H5a1 1 0 01-.447-1.342l7-14A1 1 0 0112 2.5z"/>
              </svg>
            </div>
            <div className="text-white">
              <span className="text-2xl font-bold tracking-tight">AquaFlux</span>
              <span className="text-xs block text-blue-100 font-medium">Water Conservation SA</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative px-3 py-2 text-white/90 hover:text-white font-medium transition-all duration-200 ${
                  isActive ? 'text-white' : ''
                } group`
              }
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative px-3 py-2 text-white/90 hover:text-white font-medium transition-all duration-200 ${
                  isActive ? 'text-white' : ''
                } group`
              }
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </NavLink>
            <NavLink
              to="/tips"
              className={({ isActive }) =>
                `relative px-3 py-2 text-white/90 hover:text-white font-medium transition-all duration-200 ${
                  isActive ? 'text-white' : ''
                } group`
              }
            >
              Conservation Tips
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </NavLink>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-white/90 hover:text-white font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <div className="text-white/90">
                    <span className="text-sm font-medium">Welcome back,</span>
                    <span className="block text-white font-semibold">{user?.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="bg-red-500/90 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white/90 hover:text-white font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm hover:shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;