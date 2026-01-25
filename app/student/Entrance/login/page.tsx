'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function MockEntranceLoginPage() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);

    router.push('/student/rules');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700 p-3">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-4 relative">
      
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Entrance Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
        
          <div className="relative">
            <label className="block mb-2 text-gray-700 font-medium">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
              />
            </div>
          </div>

        
          <div className="relative">
            <label className="block mb-2 text-gray-700 font-medium">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

        
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl transition duration-300 shadow"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
