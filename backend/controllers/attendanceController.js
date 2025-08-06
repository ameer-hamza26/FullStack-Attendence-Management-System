import Attendance from '../models/Attendance.js';
import User from '../models/User.js';

// Mark attendance for the current user
export const markAttendance = async (req, res) => {
  try {
    const { status, date } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!status || !['present', 'absent', 'leave'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid status: present, absent, or leave'
      });
    }

    // Use provided date or current date
    const attendanceDate = date ? new Date(date) : new Date();
    
    // Check if attendance already exists for this user and date
    const existingAttendance = await Attendance.findOne({
      user: userId,
      date: {
        $gte: new Date(attendanceDate.getFullYear(), attendanceDate.getMonth(), attendanceDate.getDate()),
        $lt: new Date(attendanceDate.getFullYear(), attendanceDate.getMonth(), attendanceDate.getDate() + 1)
      }
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Attendance already marked for this date'
      });
    }

    // Create new attendance record
    const newAttendance = new Attendance({
      user: userId,
      date: attendanceDate,
      status
    });

    await newAttendance.save();

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      attendance: newAttendance
    });

  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while marking attendance'
    });
  }
};

// Get current user's attendance records
export const getAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    let query = { user: userId };

    // Add date range filter if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(query)
      .sort({ date: -1 }) // Most recent first
      .populate('user', 'name email');

    res.json({
      success: true,
      attendance,
      count: attendance.length
    });

  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching attendance'
    });
  }
};

// Get all attendance records (admin only)
export const getAllAttendance = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Admins only'
      });
    }

    const { userId, startDate, endDate, status } = req.query;

    let query = {};

    // Add filters if provided
    if (userId) query.user = userId;
    if (status) query.status = status;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(query)
      .sort({ date: -1 })
      .populate('user', 'name email');

    res.json({
      success: true,
      attendance,
      count: attendance.length
    });

  } catch (error) {
    console.error('Get all attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching all attendance'
    });
  }
}; 