"use client";

import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Check if current page is exactly /admin/login
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="min-h-screen flex">
      {/* Sidebar only for non-login pages */}
      {!isLoginPage && (
        <aside className="w-64 bg-gray-900 text-white p-5">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <nav className="space-y-2">
            <p className="hover:text-gray-300 cursor-pointer">Dashboard</p>
            <p className="hover:text-gray-300 cursor-pointer">Manage Exams</p>
            <p className="hover:text-gray-300 cursor-pointer">Students</p>
            <p className="hover:text-gray-300 cursor-pointer">Results</p>
          </nav>
        </aside>
      )}

      {/* Main content */}
      <main
        className={
          isLoginPage
            ? "flex-1 flex items-center justify-center bg-gray-100"
            : "flex-1 bg-gray-100 p-6"
        }
      >
        {children}
      </main>
    </div>
  );
}
