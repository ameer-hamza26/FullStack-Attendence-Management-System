import { useState } from 'react';
import { register as registerApi } from '../api/auth';

export default function RegisterForm({ onRegisterSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await registerApi(name, email, password);
      setMessage('Registration successful! Please login.');
      setName('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
       
        if (onRegisterSuccess) onRegisterSuccess();
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-1">Name</label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded shadow hover:bg-green-700 transition"
      >
        Register
      </button>
      {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </form>
  );
}