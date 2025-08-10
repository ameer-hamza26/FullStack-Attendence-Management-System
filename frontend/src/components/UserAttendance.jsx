import { useEffect, useState } from 'react';
import { getUserAttendance } from '../api/users';
import AttendanceTable from './AttendanceTable';
import { toast } from 'react-toastify';

export default function UserAttendance({ userId }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      // Show loading toast
      const loadingToast = toast.loading('📊 Loading attendance records...', {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      });
      
      getUserAttendance(userId).then(res => {
        setRecords(res.data.attendance);
        setLoading(false);
        // Update loading toast to success
        toast.update(loadingToast, {
          render: `✅ Loaded ${res.data.attendance.length} attendance records`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
      }).catch((error) => {
        setLoading(false);
        // Update loading toast to error
        toast.update(loadingToast, {
          render: `❌ Failed to load attendance: ${error.response?.data?.message || 'Unknown error'}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
        });
      });
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-500 text-sm">Loading attendance records...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">User Attendance Records</h4>
        <p className="text-sm text-gray-600">
          Total records: <span className="font-medium text-gray-900">{records.length}</span>
        </p>
      </div>
      <AttendanceTable records={records} />
    </div>
  );
}