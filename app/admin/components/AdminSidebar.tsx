'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  HelpCircle,
  LogOut,
  BookOpen,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + '/');

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col shadow-2xl">
      {/* Brand / Logo area */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Exam Admin</h1>
            <p className="text-xs text-gray-400 mt-0.5">Control Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-8 space-y-1.5 overflow-y-auto">
        <Link
          href="/admin/dashboard"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/dashboard') && !isActive('/admin/dashboard/exams') && !isActive('/admin/dashboard/students') && !isActive('/admin/dashboard/questions')
              ? 'bg-blue-700 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </Link>

        <Link
          href="/admin/dashboard/exams"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/dashboard/exams')
              ? 'bg-blue-700 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <FileText className="w-5 h-5 mr-3" />
          Exams
        </Link>

        <Link
          href="/admin/dashboard/students"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/dashboard/students')
              ? 'bg-blue-700 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <Users className="w-5 h-5 mr-3" />
          Students
        </Link>

        <Link
          href="/admin/dashboard/questions"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/dashboard/questions')
              ? 'bg-blue-700 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <HelpCircle className="w-5 h-5 mr-3" />
          Questions
        </Link>

        {/* You can add more menu items here later */}
      </nav>

      {/* Logout section */}
      <div className="p-5 border-t border-gray-800 mt-auto">
        <button
          onClick={() => {
            // TODO: implement real logout (next-auth, supabase, etc.)
            alert('Logged out');
            // window.location.href = '/login';
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