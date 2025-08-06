import express from 'express';
import auth from '../middleware/auth.js';
import { markAttendance, getAttendance, getAllAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/mark', auth, markAttendance);
router.get('/me', auth, getAttendance);
router.get('/all', auth, getAllAttendance);

export default router; 