'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '' },
  { name: 'Students', href: '/admin/students', icon: '' },
  { name: 'Questions', href: '/admin/addquestion', icon: '' },
  { name: 'Results', href: '/admin/view-results', icon: '' },
    { name: 'Question list', href: '/admin/question', icon: '' },

];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="mt-6 flex flex-col">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-6 py-4 hover:bg-gray-800 transition ${
              pathname === item.href ? 'bg-gray-800 border-l-4 border-blue-500' : ''
            }`}
          >
            <span className="mr-4 text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
