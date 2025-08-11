import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import connectDB from "./config/db.js"
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import attendanceRoutes from './routes/attendance.js';
// Load environment variables first
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://full-stack-attendence-management-sy.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()

// Test route - no database required
app.get('/', (req, res) => {
  console.log('Root route accessed');
  res.json({ message: 'API Running - Server is working!' });
});

// Test auth route - no database required
app.get('/api/auth/test', (req, res) => {
  console.log('Auth test route accessed');
  res.json({ 
    success: true, 
    message: 'Auth test endpoint reached!' 
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);

// Export the app for Vercel (remove app.listen)
export default app; 
