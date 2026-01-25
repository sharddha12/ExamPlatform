
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Trophy,
  User,
  LogOut,
} from 'lucide-react';

export default function StudentSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + '/');

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white flex flex-col shadow-2xl">
      {/* Brand / Logo */}
      <div className="p-6 border-b border-indigo-800">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-indigo-300" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Student Portal</h1>
            <p className="text-xs text-indigo-300 mt-0.5">Exam Preparation</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-8 space-y-1.5 overflow-y-auto">
        <Link
          href="/student"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            isActive('/student') && !isActive('/student/exams') && !isActive('/student/results')
              ? 'bg-indigo-700 text-white'
              : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
          }`}
        >
          Dashboard
        </Link>

        <Link
          href="/student/exams"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            isActive('/student/exams')
              ? 'bg-indigo-700 text-white'
              : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
          }`}
        >
          Available Exams
        </Link>

        <Link
          href="/student/results"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            isActive('/student/results')
              ? 'bg-indigo-700 text-white'
              : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
          }`}
        >
          My Results
        </Link>

        <Link
          href="/student/profile"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            isActive('/student/profile')
              ? 'bg-indigo-700 text-white'
              : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
          }`}
        >
          Profile
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-5 border-t border-indigo-800 mt-auto">
        <button
          onClick={() => {
            // TODO: real logout logic later
            alert('Logged out');
            // router.push('/login');
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/90 hover:bg-red-700 rounded-lg transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}