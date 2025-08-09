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
    return <div className="text-center py-4 text-gray-500">Loading attendance...</div>;
  }

  return (
    <div>
      <AttendanceTable records={records} />
    </div>
  );
}