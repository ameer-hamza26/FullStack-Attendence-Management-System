import { useState } from 'react';
import { markAttendance } from '../api/attendance';

export default function MarkAttendanceForm() {
  const [status, setStatus] = useState('present');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await markAttendance(status);
      setMessage('Attendance marked!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 mt-4">
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="present">Present</option>
        <option value="absent">Absent</option>
        <option value="leave">Leave</option>
      </select>
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
      >
        Mark Attendance
      </button>
      {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
    </form>
  );
}