import express from 'express';
import auth from '../middleware/auth.js';
import { getUsers, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', auth, getUsers);
router.delete('/:id', auth, deleteUser);

export default router; 