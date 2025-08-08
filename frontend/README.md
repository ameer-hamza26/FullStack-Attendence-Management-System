# Attendance Management System - Frontend

A modern, responsive React frontend for the Attendance Management System with professional UI/UX design and comprehensive admin functionality.

## 🚀 Features

- **Modern UI/UX** - Professional design with Tailwind CSS
- **Responsive Design** - Works perfectly on all devices
- **Authentication System** - Login/Register with role-based access
- **Admin Dashboard** - Complete user and attendance management
- **User Dashboard** - Personal attendance tracking
- **Real-time Updates** - Live data synchronization
- **Animated Transitions** - Smooth page transitions and interactions
- **Role-based Routing** - Automatic redirection based on user role

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend server running (see backend README)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Attendece Management System/frontend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── axios.js          # Axios configuration
│   │   ├── auth.js           # Authentication API calls
│   │   ├── users.js          # User management API calls
│   │   └── attendance.js     # Attendance API calls
│   ├── components/
│   │   ├── LoginForm.jsx     # Login form component
│   │   ├── RegisterForm.jsx  # Registration form component
│   │   ├── Navbar.jsx        # Navigation component
│   │   ├── UserList.jsx      # User management table
│   │   ├── AttendanceTable.jsx # Attendance display table
│   │   ├── MarkAttendanceForm.jsx # Attendance marking form
│   │   ├── UserAttendance.jsx # Individual user attendance
│   │   └── ProtectedRoute.jsx # Route protection component
│   ├── context/
│   │   └── AuthContext.jsx   # Authentication context
│   ├── pages/
│   │   ├── LoginPage.jsx     # Login/Register page
│   │   ├── DashboardPage.jsx # User dashboard
│   │   ├── AdminPage.jsx     # Admin control panel
│   │   └── NotFoundPage.jsx  # 404 error page
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── package.json
└── vite.config.js
```

## 🎨 UI Components

### Authentication
- **LoginForm** - User login with email/password
- **RegisterForm** - User registration with validation
- **LoginPage** - Animated login/register page with smooth transitions

### Navigation
- **Navbar** - Professional navigation with user info and logout
- **ProtectedRoute** - Route protection based on authentication and roles

### User Management (Admin)
- **UserList** - Complete user management with CRUD operations
- **Add/Edit User Modals** - Professional forms for user management
- **User Attendance** - Individual user attendance viewing

### Attendance Management
- **MarkAttendanceForm** - Attendance marking for users
- **AttendanceTable** - Professional attendance display
- **UserAttendance** - Individual user attendance records

### Pages
- **DashboardPage** - User's personal dashboard
- **AdminPage** - Complete admin control panel
- **NotFoundPage** - Professional 404 error page

## 🔐 Authentication Flow

### User Login
1. User enters email/password
2. System validates credentials
3. JWT token stored in localStorage
4. Automatic redirect based on role:
   - **Admin** → `/admin` (Admin Panel)
   - **User** → `/` (Dashboard)

### Role-based Access
- **Admin Users**: Full access to admin panel, user management, all attendance records
- **Regular Users**: Personal dashboard, own attendance marking and viewing

## 🎯 Key Features

### Admin Panel
- **User Management**: Create, read, update, delete users
- **Attendance Overview**: View all attendance records
- **Statistics**: Quick stats on attendance patterns
- **User Details**: Individual user attendance viewing

### User Dashboard
- **Attendance Marking**: Mark daily attendance (present/absent/leave)
- **Personal Records**: View own attendance history
- **Date Filtering**: Filter attendance by date range

### Professional Design
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Smooth Animations**: Page transitions and interactive elements
- **Loading States**: Professional loading indicators
- **Error Handling**: User-friendly error messages

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Technology Stack
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **JWT Decode** - JWT token parsing

## 🔧 Configuration

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

### API Integration
The frontend integrates with the backend API through:
- **Axios Instance** - Configured with base URL and interceptors
- **JWT Token** - Automatically included in API requests
- **Error Handling** - Comprehensive error management

## 🎨 Design System

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale

### Typography
- **Headings**: Font-bold with appropriate sizing
- **Body**: Clean, readable text
- **Labels**: Medium weight for form labels

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent styling with hover states
- **Forms**: Professional input styling with focus states
- **Tables**: Clean, responsive table design

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Features
- **Mobile-first** approach
- **Flexible layouts** that adapt to screen size
- **Touch-friendly** interface elements
- **Optimized navigation** for mobile devices

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Zero-config deployment
- **Netlify**: Drag and drop deployment
- **GitHub Pages**: Static hosting
- **AWS S3**: Cloud storage hosting

## 🔍 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Admin user creation and management
- [ ] Attendance marking and viewing
- [ ] Responsive design on different devices
- [ ] Error handling and validation
- [ ] Navigation and routing

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

## 🔗 Related

- [Backend README](../backend/README.md) - Backend API documentation
- [API Documentation](../backend/README.md#api-endpoints) - Complete API reference
