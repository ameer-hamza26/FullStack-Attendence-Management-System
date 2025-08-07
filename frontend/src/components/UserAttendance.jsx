import { useEffect, useState } from 'react';
import { getUserAttendance } from '../api/users';
import AttendanceTable from './AttendanceTable';

export default function UserAttendance({ userId }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getUserAttendance(userId).then(res => {
        setRecords(res.data.attendance);
        setLoading(false);
      }).catch(() => setLoading(false));
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