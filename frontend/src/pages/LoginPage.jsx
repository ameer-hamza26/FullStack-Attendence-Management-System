import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function LoginPage() {
  const [showRegister, setShowRegister] = useState(false);
  const { user } = useAuth();

  // Callback to switch to login after successful registration
  const handleRegisterSuccess = () => setShowRegister(false);

  // If user is already logged in, redirect to dashboard
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Login Form */}
        <div 
          className={`transition-all duration-500 ease-in-out ${
            showRegister ? 'opacity-0 pointer-events-none absolute' : 'opacity-100 relative'
          }`}
          style={{ 
            transform: showRegister ? 'translateX(-100%)' : 'translateX(0)',
            zIndex: showRegister ? 0 : 10 
          }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="mb-6 text-center">
              <span className="text-2xl sm:text-3xl font-bold text-green-600">AttendancePro</span>
              <p className="text-gray-500 mt-2 text-sm sm:text-base">Sign in to your account</p>
            </div>
            <LoginForm />
            <div className="mt-4 text-center">
              <span className="text-gray-600 text-sm sm:text-base">Don't have an account? </span>
              <button
                className="text-green-600 font-semibold hover:underline focus:outline-none text-sm sm:text-base"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </div>
          </div>
        </div>

        {/* Register Form */}
        <div 
          className={`transition-all duration-500 ease-in-out ${
            showRegister ? 'opacity-100 relative' : 'opacity-0 pointer-events-none absolute'
          }`}
          style={{ 
            transform: showRegister ? 'translateX(0)' : 'translateX(100%)',
            zIndex: showRegister ? 10 : 0 
          }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="mb-6 text-center">
              <span className="text-2xl sm:text-3xl font-bold text-green-600">AttendancePro</span>
              <p className="text-gray-500 mt-2 text-sm sm:text-base">Create your account</p>
            </div>
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
            <div className="mt-4 text-center">
              <span className="text-gray-600 text-sm sm:text-base">Already have an account? </span>
              <button
                className="text-green-600 font-semibold hover:underline focus:outline-none text-sm sm:text-base"
                onClick={() => setShowRegister(false)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}