// app/admin/dashboard/questions/page.tsx
import Link from 'next/link';
// Hardcoded faculties
const faculties = [
  { id: 'civil', name: 'Civil Engineering' },
  { id: 'computer', name: 'Computer Engineering' },
  // Add more as needed
];

export default function Questions() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Manage Questions</h1>
      </header>
      <main className="container mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Bulk Questions by Faculty</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {faculties.map((faculty) => (
            <Link 
              key={faculty.id} 
              href={`/admin/dashboard/questions/${faculty.id}/upload`} 
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition text-center text-blue-600 font-medium"
            >
              {faculty.name}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}