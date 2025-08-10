import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 flex flex-col items-center max-w-sm sm:max-w-md">
        <div className="text-6xl sm:text-7xl font-extrabold text-green-600 mb-4">404</div>
        <div className="text-xl sm:text-2xl font-bold text-green-700 mb-2 text-center">Page Not Found</div>
        <div className="text-gray-500 mb-6 text-center text-sm sm:text-base">
          Oops! The page you are looking for does not exist in AttendancePro.<br />
          Please check the URL or return to the dashboard.
        </div>
        <Link
          to="/"
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors font-semibold text-sm sm:text-base"
        >
          Go to Dashboard
        </Link>
      </div>
      <div className="mt-8 text-green-400 text-xs sm:text-sm font-mono tracking-widest text-center">
        AttendancePro &mdash; Attendance Management System
      </div>
    </div>
  );
} 