import UserList from '../components/UserList';
import UserAttendance from '../components/UserAttendance';
import { useState } from 'react';
import { getAllAttendance } from '../api/attendance';
import AttendanceTable from '../components/AttendanceTable';

export default function AdminPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [allRecords, setAllRecords] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = async () => {
    const res = await getAllAttendance();
    setAllRecords(res.data.attendance);
    setShowAll(true);
  };

  return (
    <div className="pt-20 max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Admin Panel</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-700">All Users</h3>
            </div>
            <UserList onSelectUser={setSelectedUser} />
          </div>
          {selectedUser && (
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-700 mb-4">User Attendance</h3>
              <UserAttendance userId={selectedUser} />
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-700">All Attendance Records</h3>
              <button
                onClick={handleShowAll}
                className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition font-semibold"
              >
                Show All Attendance
              </button>
            </div>
            {showAll && <AttendanceTable records={allRecords} />}
          </div>
        </div>
      </div>
    </div>
  );
}