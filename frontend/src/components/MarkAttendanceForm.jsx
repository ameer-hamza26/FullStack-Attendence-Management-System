import { useState } from 'react';
import { markAttendance } from '../api/attendance';

export default function MarkAttendanceForm() {
  const [status, setStatus] = useState('present');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await markAttendance(status); 
      setMessage('Attendance marked successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error marking attendance');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">Attendance Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full sm:w-48 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm transition-colors"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="leave">Leave</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors font-medium text-sm"
        >
          Mark Attendance
        </button>
      </div>
      {message && (
        <div className={`text-sm mt-2 p-3 rounded-lg border ${
          message.includes('successfully') 
            ? 'text-green-600 bg-green-50 border-green-200' 
            : 'text-red-600 bg-red-50 border-red-200'
        }`}>
          {message}
        </div>
      )}
    </form>
  );
}