// app/admin/dashboard/page.tsx
import AdminSidebar from "../components/AdminSidebar";
import Link from 'next/link';
import { Users, FileText, HelpCircle, TrendingUp, Clock } from 'lucide-react'; // optional icons — npm install lucide-react if using

export default function Dashboard() {
  // Dummy data — replace with real fetches later (e.g. useEffect + API in client component)
  const stats = [
    {
      title: 'Total Students',
      value: '1,248',
      changeType: 'increase' as const,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Total Exams',
      value: '42',
      changeType: 'increase' as const,
      icon: FileText,
      color: 'text-green-600',
    },
    {
      title: 'Total Questions',
      value: '3,670',
      changeType: 'increase' as const,
      icon: HelpCircle,
      color: 'text-purple-600',
    },
    {
      title: 'Active Entrance Exams',
      value: '3',
      changeType: 'neutral' as const,
      icon: Clock,
      color: 'text-amber-600',
    },
  
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 ">
        <main className="p-6 md:p-10">
          {/* Welcome & Title */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Overview of your exam platform — students, exams, and questions.
            </p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                 
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Action Cards */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Exams Card */}
            <Link
              href="/admin/dashboard/exams"
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500 overflow-hidden flex flex-col items-center justify-center text-center h-56 p-8"
            >
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                📝
              </div>
              <h3 className="text-2xl font-semibold text-blue-700 group-hover:text-blue-800">
                Manage Exams
              </h3>
              <p className="mt-3 text-gray-600 text-sm">
                Create, edit mock tests & entrance exams
              </p>
            </Link>

            {/* Students Card */}
            <Link
              href="/admin/dashboard/students"
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500 overflow-hidden flex flex-col items-center justify-center text-center h-56 p-8"
            >
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                👥
              </div>
              <h3 className="text-2xl font-semibold text-blue-700 group-hover:text-blue-800">
                View Students
              </h3>
              <p className="mt-3 text-gray-600 text-sm">
                See registered users & their details
              </p>
            </Link>

            {/* Questions Card */}
            <Link
              href="/admin/dashboard/questions"
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500 overflow-hidden flex flex-col items-center justify-center text-center h-56 p-8"
            >
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                ❓
              </div>
              <h3 className="text-2xl font-semibold text-blue-700 group-hover:text-blue-800">
                Questions Bank
              </h3>
              <p className="mt-3 text-gray-600 text-sm">
                Bulk upload & manage questions by faculty
              </p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}