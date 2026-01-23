'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Eye,
  EyeOff,
  GraduationCap,
  Phone,
  Mail,
  User,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function StudentRegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/student/login');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-blue-900 via-indigo-700 to-purple-800">

      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-center px-16 text-white">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-yellow-300" />
            <span className="uppercase tracking-widest text-sm text-gray-200">
              Exam Platform
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight">
            Crack Exams <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
              With Confidence
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Join thousands of students preparing smarter, faster & better.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6">
        {/* Updated background color here */}
        <div className="w-full max-w-md bg-gradient-to-br from-blue-100/80 via-indigo-100/80 to-purple-100/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600">
              <GraduationCap className="text-white w-7 h-7" />
            </div>
            <h2 className="text-3xl font-extrabold mt-4 text-gray-800">
              Student Registration
            </h2>
            <p className="text-gray-500 text-sm">
              Create your exam account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">

            <LabeledInput
              icon={<User size={18} />}
              label="Full Name"
              value={name}
              onChange={setName}
            />

            <LabeledInput
              icon={<Mail size={18} />}
              label="Email Address"
              value={email}
              onChange={setEmail}
              type="email"
            />

            <LabeledInput
              icon={<Phone size={18} />}
              label="Mobile Number"
              value={mobile}
              onChange={setMobile}
            />

            {/* Password */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-600 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white rounded-xl
              bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
              hover:scale-[1.03] transition shadow-xl"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already registered?
            <Link href="/student/login" className="ml-1 text-blue-600 font-semibold">
              Login here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

/* Simple Labeled Input Component (label always on top) */
function LabeledInput({
  icon,
  label,
  value,
  onChange,
  type = 'text'
}: any) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-gray-600 font-medium">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          required
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>
  );
}
