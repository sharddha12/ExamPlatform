'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost/exam-api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      // role check
      if (data.user.role !== 'admin') {
        alert('You are not an admin');
        return;
      }

      // save admin
      localStorage.setItem('user', JSON.stringify(data.user));

      // redirect
      router.push('/admin/dashboard');

    } catch (error) {
      alert('Server error. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck className="w-10 h-10 text-indigo-600 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Login
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to access Admin Dashboard
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-lg"
          >
            Login as Admin
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Exam Platform
        </p>
      </div>
    </div>
  );
}
