import SideNav from './components/SideNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideNav />
      <div className="ml-64 w-full min-h-screen bg-gray-100">
        <header className="bg-white shadow px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome to Admin Dashboard</h1>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}