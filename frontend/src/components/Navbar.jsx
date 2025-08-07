import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-400 shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-wide">AttendancePro</Link>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-white hidden sm:inline">
              Welcome, <span className="font-semibold">{user.name}</span> <span className="bg-white/20 rounded px-2 py-1 ml-2 text-xs">{user.role}</span>
            </span>
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="text-white font-semibold hover:underline"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-white text-green-700 px-4 py-1 rounded shadow hover:bg-green-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}