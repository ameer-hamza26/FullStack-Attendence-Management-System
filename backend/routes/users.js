import express from 'express';
import auth from '../middleware/auth.js';
import { getUsers, deleteUser, getUserAttendance } from '../controllers/userController.js';

const router = express.Router();

router.get('/', auth, getUsers);
router.delete('/:id', auth, deleteUser);
router.get('/:id/attendance', auth, getUserAttendance);

export default router; 