'use client';

import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      
        <div className="flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-indigo-600" />
          <span className="text-xl font-bold text-indigo-600">
            Exam Platform
          </span>
        </div>

        {/* Navbar Sections */}
        <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <a href="#home" className="hover:text-indigo-600 transition">
            Home
          </a>
          <a href="#features" className="hover:text-indigo-600 transition">
            FeaturesSection
          </a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition">
            WorksSection
          </a>
          <a href="#about" className="hover:text-indigo-600 transition">
            AboutUs
          </a>

          <Link
            href="student/Entrance/login"
            className="hover:text-indigo-600 transition font-semibold"
          >
            Entrance Exam
          </Link>
        </nav>

        <Link
          href="/student/login"
          className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md"
        >
          Take Mock Entrance
        </Link>

      </div>
    </header>
  );
}
