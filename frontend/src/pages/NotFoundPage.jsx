import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
        <div className="text-7xl font-extrabold text-green-600 mb-4">404</div>
        <div className="text-2xl font-bold text-green-700 mb-2">Page Not Found</div>
        <div className="text-gray-500 mb-6 text-center max-w-xs">
          Oops! The page you are looking for does not exist in AttendancePro.<br />
          Please check the URL or return to the dashboard.
        </div>
        <Link
          to="/"
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition font-semibold"
        >
          Go to Dashboard
        </Link>
      </div>
      <div className="mt-8 text-green-400 text-sm font-mono tracking-widest">AttendancePro &mdash; Attendance Management System</div>
    </div>
  );
} 