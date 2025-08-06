import User from '../models/User.js';
import Attendance from '../models/Attendance.js';

export const getUsers = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
    }
    const users = await User.find({}, '-password'); // Exclude password
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get a user's attendance records (admin or self)
export const getUserAttendance = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!req.user || (req.user.role !== 'admin' && req.user.id !== userId)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const attendance = await Attendance.find({ user: userId }).populate('user', 'name email');
    res.json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}; 