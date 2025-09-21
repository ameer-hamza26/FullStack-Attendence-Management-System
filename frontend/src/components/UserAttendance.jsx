import { useEffect, useState } from 'react';
import { getUserAttendance } from '../api/users';
import AttendanceTable from './AttendanceTable';
import { toast } from 'react-toastify';

export default function UserAttendance({ userId }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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
        setUserInfo(res.data.user);
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

  // Calculate statistics
  const presentCount = records.filter(r => r.status === 'present').length;
  const absentCount = records.filter(r => r.status === 'absent').length;
  const leaveCount = records.filter(r => r.status === 'leave').length;
  const totalRecords = records.length;
  const attendanceRate = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div className="text-gray-600 text-lg font-medium">Loading attendance records...</div>
          <div className="text-gray-500 text-sm mt-2">Please wait while we fetch the data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* User Profile Header */}
      {userInfo && (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center mb-6 lg:mb-0">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">{userInfo.name}</h3>
                <p className="text-indigo-100 text-lg">{userInfo.email}</p>
                <div className="flex items-center mt-2">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    userInfo.role === 'admin' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {userInfo.role === 'admin' ? '👑 Admin' : '👤 User'}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-2">{attendanceRate}%</div>
              <div className="text-indigo-100 text-lg">Attendance Rate</div>
              <div className="text-indigo-200 text-sm mt-1">Based on {totalRecords} records</div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-green-500 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-green-800 uppercase tracking-wide">Present</p>
                <p className="text-2xl font-bold text-green-900 mt-1">{presentCount}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                {totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-100 border border-red-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-red-500 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-red-800 uppercase tracking-wide">Absent</p>
                <p className="text-2xl font-bold text-red-900 mt-1">{absentCount}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-red-600">
                {totalRecords > 0 ? Math.round((absentCount / totalRecords) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-yellow-800 uppercase tracking-wide">Leave</p>
                <p className="text-2xl font-bold text-yellow-900 mt-1">{leaveCount}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-yellow-600">
                {totalRecords > 0 ? Math.round((leaveCount / totalRecords) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide">Total</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">{totalRecords}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">Records</div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Records Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">Attendance Records</h4>
                <p className="text-sm text-gray-600 mt-1">Detailed attendance history for {userInfo?.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{totalRecords}</div>
              <div className="text-sm text-gray-600">Total Records</div>
            </div>
          </div>
        </div>
        <div className="p-6">
          {records.length > 0 ? (
            <AttendanceTable records={records} />
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-600 text-xl font-semibold mb-2">No Attendance Records</p>
              <p className="text-gray-500 text-sm">This user hasn't marked any attendance yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}