import { useAuth } from '../context/AuthContext';
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

  return (
    <div className="pt-20 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Welcome, {user.name}</h2>
        <div className="text-gray-600 mb-2">Role: <span className="font-semibold">{user.role}</span></div>
        <MarkAttendanceForm />
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Your Attendance</h3>
        <AttendanceTable records={records} />
      </div>
    </div>
  );
}