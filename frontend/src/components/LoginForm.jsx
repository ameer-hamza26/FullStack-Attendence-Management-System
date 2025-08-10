import { useState, useEffect } from 'react';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi(email, password);
      login(res.data.token);
      // Navigation will be handled by useEffect
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2 text-sm font-medium">Email</label>
        <input
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm sm:text-base transition-colors"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2 text-sm font-medium">Password</label>
        <input
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm sm:text-base transition-colors"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors font-medium text-sm sm:text-base"
      >
        Sign In
      </button>
      {error && (
        <div className="text-red-500 text-sm mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}
    </form>
  );
}