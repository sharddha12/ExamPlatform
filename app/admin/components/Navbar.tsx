"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user: { email: string; role: string } | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link href={user.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}>
          MCQ Platform
        </Link>
      </div>
      <div className="space-x-4">
        {user.role === "admin" && (
          <>
            <Link href="/admin/dashboard">Dashboard</Link>
            <Link href="/admin/add-question">Add Question</Link>
            <Link href="/admin/create-exam">Create Exam</Link>
            <Link href="/admin/view-results">Results</Link>
          </>
        )}
        {user.role === "student" && (
          <>
            <Link href="/student/dashboard">Dashboard</Link>
            <Link href="/student/exam/1">Exams</Link>
            <Link href="/student/result/1">My Results</Link>
          </>
        )}
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
