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
const allowedOrigins = new Set([
  'http://localhost:5173',
  'https://full-stack-attendence-management-sy.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean));

function isAllowedPreviewOrigin(origin) {
  try {
    const { hostname } = new URL(origin);
    // Allow preview deployments for this frontend project only
    return hostname.endsWith('.vercel.app') && hostname.startsWith('full-stack-attendence-management-sy');
  } catch {
    return false;
  }
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.has(origin) || isAllowedPreviewOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
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
// Compatibility shim: remap requests missing /api prefix
app.use((req, res, next) => {
  if (
    req.path.startsWith('/auth/') ||
    req.path.startsWith('/users/') ||
    req.path.startsWith('/attendance/')
  ) {
    req.url = `/api${req.url}`;
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);

// Export the app for Vercel
export default app; 
