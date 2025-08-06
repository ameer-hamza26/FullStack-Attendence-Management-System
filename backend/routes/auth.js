import express from 'express';
import { register, login, test } from '../controllers/authController.js';

const router = express.Router();

// Test route to check if auth routes are working
router.get('/test', (req, res, next) => {
  console.log('Auth test route accessed');
  next();
}, test);

router.post('/register', (req, res, next) => {
  console.log('Register route accessed with body:', req.body);
  next();
}, register);

router.post('/login', (req, res, next) => {
  console.log('Login route accessed with body:', req.body);
  next();
}, login);

export default router; 