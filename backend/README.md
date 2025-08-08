# Attendance Management System - Backend

A robust Node.js backend API for managing user attendance with authentication, user management, and attendance tracking.

## 🚀 Features

- **User Authentication** - JWT-based authentication with role-based access
- **User Management** - Admin can create, read, update, and delete users
- **Attendance Tracking** - Mark and retrieve attendance records
- **Role-based Access** - Admin and User roles with different permissions
- **MongoDB Integration** - Scalable database with Mongoose ODM
- **Security** - Password hashing, input validation, and CORS protection

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Attendece Management System/backend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/attendance_system
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── userController.js   # User management
│   └── attendanceController.js # Attendance operations
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js            # User schema
│   └── Attendance.js      # Attendance schema
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── users.js           # User management routes
│   └── attendance.js      # Attendance routes
├── index.js               # Main server file
└── package.json
```

## 🔌 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/test` - Test authentication

### User Management Routes (Admin Only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `GET /api/users/:id/attendance` - Get user's attendance

### Attendance Routes
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance` - Get current user's attendance
- `GET /api/attendance/all` - Get all attendance (Admin only)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in request headers:

```javascript
// Using x-auth-token header
headers: {
  'x-auth-token': 'your_jwt_token'
}

// Or using Authorization header
headers: {
  'Authorization': 'Bearer your_jwt_token'
}
```

## 👥 User Roles

### Admin
- Full access to all endpoints
- Can manage users (CRUD operations)
- Can view all attendance records
- Cannot mark their own attendance

### User
- Can mark their own attendance
- Can view their own attendance records
- Limited access to user management

## 📊 Database Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: 'user', 'admin', default: 'user'),
  date: Date (default: Date.now)
}
```

### Attendance Schema
```javascript
{
  user: ObjectId (ref: 'User', required),
  date: Date (required),
  status: String (enum: 'present', 'absent', 'leave', required)
}
```

## 🛡️ Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Request body validation
- **CORS Protection** - Cross-origin request handling
- **Role-based Access** - Admin/User permission system

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/attendance_system` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `PORT` | Server port | `5000` |

## 🚀 Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (if configured)

### Error Handling
The API includes comprehensive error handling:
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid/missing token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found (resource not found)
- 500: Internal Server Error

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🔍 Testing with Postman

1. **Register a user:**
   ```
   POST http://localhost:5000/api/auth/register
   Content-Type: application/json
   
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

2. **Login:**
   ```
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json
   
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Mark attendance:**
   ```
   POST http://localhost:5000/api/attendance
   x-auth-token: your_jwt_token
   Content-Type: application/json
   
   {
     "status": "present"
   }
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository. 