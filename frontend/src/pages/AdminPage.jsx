import UserList from '../components/UserList';
import UserAttendance from '../components/UserAttendance';
import { useState, useEffect } from 'react';
import { getAllAttendance } from '../api/attendance';
import { getUsers } from '../api/users';
import AttendanceTable from '../components/AttendanceTable';

export default function AdminPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [allRecords, setAllRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  
  // Filter states
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: ''
  });

  // Fetch initial data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setStatsLoading(true);
    try {
      // Fetch users and attendance data in parallel
      const [usersRes, attendanceRes] = await Promise.all([
        getUsers(),
        getAllAttendance()
      ]);
      
      setUsers(usersRes.data.users);
      setAllRecords(attendanceRes.data.attendance);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  // Refresh user count when users are modified
  const refreshUserCount = async () => {
    try {
      console.log('Refreshing user count...');
      // Small delay to ensure previous operations complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const usersRes = await getUsers();
      console.log('Users response:', usersRes);
      if (usersRes && usersRes.data && usersRes.data.users) {
        setUsers(usersRes.data.users);
        console.log('User count updated successfully');
      } else {
        console.error('Invalid response format from getUsers');
      }
    } catch (error) {
      console.error('Error refreshing user count:', error);
      // Fallback: try to reload initial data
      try {
        await loadInitialData();
      } catch (fallbackError) {
        console.error('Fallback data loading also failed:', fallbackError);
      }
    }
  };

  const loadFilteredData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      if (filters.status) params.status = filters.status;
      
      const res = await getAllAttendance(params);
      setAllRecords(res.data.attendance);
    } catch (error) {
      console.error('Error fetching filtered attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadFilteredData();
  };

  const clearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      status: ''
    });
    loadInitialData();
  };

  // Handle user selection for attendance viewing
  const handleUserSelection = (userId) => {
    setSelectedUser(userId);
  };

  // Filter records by status
  const presentRecords = allRecords.filter(r => r.status === 'present');
  const absentRecords = allRecords.filter(r => r.status === 'absent');
  const leaveRecords = allRecords.filter(r => r.status === 'leave');

  // Get today's records
  const today = new Date().toDateString();
  const todayRecords = allRecords.filter(r => new Date(r.date).toDateString() === today);
  const todayPresent = todayRecords.filter(r => r.status === 'present').length;
  const todayAbsent = todayRecords.filter(r => r.status === 'absent').length;
  const todayLeave = todayRecords.filter(r => r.status === 'leave').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Admin Control Panel</h1>
                <p className="mt-2 text-gray-600 text-lg">Manage users, monitor attendance, and control system access</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg">
                  <span className="text-sm font-medium opacity-90">Admin Access</span>
                  <div className="text-2xl font-bold">Full Control</div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Notice */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-blue-800">Administrative Access</h3>
                <div className="mt-2 text-blue-700">
                  <p>You have full administrative privileges to manage users, view comprehensive attendance records, and control system settings.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  {statsLoading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-xl">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Present Today</p>
                  {statsLoading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">{todayPresent}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">On Leave Today</p>
                  {statsLoading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">{todayLeave}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-xl">
                  <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Absent Today</p>
                  {statsLoading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">{todayAbsent}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Full Width Layout */}
          <div className="space-y-8">
            {/* User Management Section - Full Width */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                <p className="text-sm text-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
              </div>
              <div className="p-6">
                <UserList onSelectUser={handleUserSelection} onUsersChange={refreshUserCount} />
              </div>
            </div>
            
            {/* User Attendance Details - Conditional Display */}
            {selectedUser && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-blue-900">User Attendance Details</h2>
                      <p className="text-sm text-blue-700 mt-1">View detailed attendance records for selected user</p>
                    </div>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <UserAttendance userId={selectedUser} />
                </div>
              </div>
            )}

            {/* Enhanced Attendance Overview Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <svg className="w-7 h-7 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Attendance Analytics Dashboard
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">Comprehensive attendance monitoring and analytics across your organization</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={loadInitialData}
                      disabled={statsLoading}
                      className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Refresh Data
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {/* Enhanced Filters Section */}
                <div className="mb-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Advanced Filters</h3>
                    <p className="text-sm text-gray-600 ml-2">Refine your attendance data with precision</p>
                  </div>
                  <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Start Date</label>
                      <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => handleFilterChange('startDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">End Date</label>
                      <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => handleFilterChange('endDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Status</label>
                      <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
                      >
                        <option value="">All Status</option>
                        <option value="present">✅ Present</option>
                        <option value="absent">❌ Absent</option>
                        <option value="leave">🏖️ Leave</option>
                      </select>
                    </div>
                    <div className="flex items-end space-x-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Filtering...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                            </svg>
                            Apply Filters
                          </div>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-sm font-semibold rounded-lg hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear
                      </button>
                    </div>
                  </form>
                </div>

                {/* Enhanced Summary Stats */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-3 bg-green-500 rounded-xl shadow-md">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-semibold text-green-800 uppercase tracking-wide">Present Records</p>
                          <p className="text-3xl font-bold text-green-900 mt-1">{presentRecords.length}</p>
                          <p className="text-xs text-green-700 mt-1">Active attendance</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {allRecords.length > 0 ? Math.round((presentRecords.length / allRecords.length) * 100) : 0}%
                        </div>
                        <p className="text-xs text-green-600">of total</p>
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
                          <p className="text-sm font-semibold text-red-800 uppercase tracking-wide">Absent Records</p>
                          <p className="text-3xl font-bold text-red-900 mt-1">{absentRecords.length}</p>
                          <p className="text-xs text-red-700 mt-1">Missing attendance</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">
                          {allRecords.length > 0 ? Math.round((absentRecords.length / allRecords.length) * 100) : 0}%
                        </div>
                        <p className="text-xs text-red-600">of total</p>
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
                          <p className="text-sm font-semibold text-yellow-800 uppercase tracking-wide">Leave Records</p>
                          <p className="text-3xl font-bold text-yellow-900 mt-1">{leaveRecords.length}</p>
                          <p className="text-xs text-yellow-700 mt-1">Approved leave</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-600">
                          {allRecords.length > 0 ? Math.round((leaveRecords.length / allRecords.length) * 100) : 0}%
                        </div>
                        <p className="text-xs text-yellow-600">of total</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Attendance Tables */}
                <div className="space-y-8">
                  {/* Present Records Table */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 overflow-hidden shadow-lg">
                    <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ✅ Present Records ({presentRecords.length})
                      </h3>
                      <p className="text-green-100 text-sm mt-1">Employees who attended work</p>
                    </div>
                    <div className="p-6">
                      {presentRecords.length > 0 ? (
                        <AttendanceTable records={presentRecords} showUserInfo={true} />
                      ) : (
                        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-green-200">
                          <svg className="w-16 h-16 text-green-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-green-600 text-lg font-semibold">No present records available</p>
                          <p className="text-green-500 text-sm mt-1">Attendance records will appear here when employees mark themselves present</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Absent Records Table */}
                  <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200 overflow-hidden shadow-lg">
                    <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-rose-600">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        ❌ Absent Records ({absentRecords.length})
                      </h3>
                      <p className="text-red-100 text-sm mt-1">Employees who were absent from work</p>
                    </div>
                    <div className="p-6">
                      {absentRecords.length > 0 ? (
                        <AttendanceTable records={absentRecords} showUserInfo={true} />
                      ) : (
                        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-red-200">
                          <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <p className="text-red-600 text-lg font-semibold">No absent records available</p>
                          <p className="text-red-500 text-sm mt-1">Great! All employees are present</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Leave Records Table */}
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 overflow-hidden shadow-lg">
                    <div className="px-6 py-4 bg-gradient-to-r from-yellow-600 to-amber-600">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        🏖️ Leave Records ({leaveRecords.length})
                      </h3>
                      <p className="text-yellow-100 text-sm mt-1">Employees on approved leave</p>
                    </div>
                    <div className="p-6">
                      {leaveRecords.length > 0 ? (
                        <AttendanceTable records={leaveRecords} showUserInfo={true} />
                      ) : (
                        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-yellow-200">
                          <svg className="w-16 h-16 text-yellow-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-yellow-600 text-lg font-semibold">No leave records available</p>
                          <p className="text-yellow-500 text-sm mt-1">No employees are currently on leave</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}