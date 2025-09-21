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
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Explicitly handle preflight
app.options('*', cors());
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Export the app for Vercel
export default app; 
