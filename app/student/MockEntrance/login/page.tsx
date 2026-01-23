'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function MockEntranceLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ email: string; password: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Log to console
    console.log('Email:', email);
    console.log('Password:', password);

    // Save data to state to show on page
    setSubmittedData({ email, password });

    // Reset inputs if needed
    // setEmail('');
    // setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 via-sky-500 to-blue-700 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 relative">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Entrance Login
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-2 text-gray-700 font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div
              className="absolute right-3 top-11 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Display Submitted Data */}
    
      </div>
    </div>
  );
}
