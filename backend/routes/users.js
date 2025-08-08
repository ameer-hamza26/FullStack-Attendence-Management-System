import express from 'express';
import auth from '../middleware/auth.js';
import { getUsers, createUser, updateUser, deleteUser, getUserAttendance } from '../controllers/userController.js';

const router = express.Router();

router.get('/', auth, getUsers);
router.post('/', auth, createUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.get('/:id/attendance', auth, getUserAttendance);

export default router; 