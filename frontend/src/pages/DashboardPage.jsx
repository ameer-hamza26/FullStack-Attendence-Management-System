import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import MarkAttendanceForm from '../components/MarkAttendanceForm';
import AttendanceTable from '../components/AttendanceTable';
import { useEffect, useState } from 'react';
import { getMyAttendance } from '../api/attendance';

export default function DashboardPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getMyAttendance().then(res => setRecords(res.data.attendance));
  }, [records]);

  // Redirect admin users to admin panel
  if (user && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">Welcome, {user.name}</h2>
              <div className="text-gray-600 mb-4">
                Role: <span className="font-semibold text-gray-900">{user.role}</span>
              </div>
              <MarkAttendanceForm />
            </div>
          </div>

          {/* Attendance Records Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4">Your Attendance Records</h3>
            <AttendanceTable records={records} />
          </div>
        </div>
      </div>
    </div>
  );
}