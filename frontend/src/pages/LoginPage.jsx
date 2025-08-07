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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="w-full max-w-md">
        <div className="relative">
          {/* Animated container */}
          <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: showRegister ? 0 : 1, zIndex: showRegister ? 0 : 10 }}>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-6 text-center">
                <span className="text-3xl font-bold text-green-600">AttendancePro</span>
                <p className="text-gray-500 mt-2">Sign in to your account</p>
              </div>
              <LoginForm />
              <div className="mt-4 text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <button
                  className="text-green-600 font-semibold hover:underline focus:outline-none"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: showRegister ? 1 : 0, zIndex: showRegister ? 10 : 0 }}>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-6 text-center">
                <span className="text-3xl font-bold text-green-600">AttendancePro</span>
                <p className="text-gray-500 mt-2">Create your account</p>
              </div>
              <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
              <div className="mt-4 text-center">
                <span className="text-gray-600">Already have an account? </span>
                <button
                  className="text-green-600 font-semibold hover:underline focus:outline-none"
                  onClick={() => setShowRegister(false)}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}