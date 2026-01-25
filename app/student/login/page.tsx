'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function StudentLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/student'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-5 lg:p-10">

        {/* Header */}
        <div className="flex flex-col items-center mb-1">
          <GraduationCap className="w-16 h-16 text-gray-800 mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 text-center">Student Login</h1>
          <p className="text-gray-500 text-lg mt-3 text-center">
            Login to continue to your Exam Platform
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-8">

          {/* Email Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-400 outline-none text-lg"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-lg font-medium text-gray-700 mb-3">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-400 outline-none text-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-5 bg-gray-800 text-white font-semibold text-xl rounded-2xl hover:bg-gray-900 transition-shadow shadow-xl"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-lg text-gray-500 mt-10">
          Don&apos;t have an account?{' '}
          <Link href="/student/register" className="text-gray-800 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
