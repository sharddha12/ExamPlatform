// app/admin/dashboard/layout.tsx
import type { ReactNode } from 'react';
import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - fixed on left */}
      <AdminSidebar />

      {/* Main content - pushed right by sidebar width */}
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
}