
import Link from 'next/link';

async function fetchExams() {

  return [
    { id: 1, title: 'Mock Test 1', type: 'mock' },
    { id: 2, title: 'Entrance Exam 2026', type: 'entrance', activationTime: '2026-01-01T10:00:00Z' },
  ];
}

export default async function Exams() {
  const exams = await fetchExams();
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Manage Exams</h1>
      </header>
      <main className="container mx-auto p-6">
        <Link 
          href="/admin/dashboard/exams/create" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded mb-6 inline-block"
        >
          Create New Exam
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{exam.title}</h2>
              <p className="text-gray-600">Type: {exam.type}</p>
              {exam.type === 'entrance' && (
                <p className="text-gray-600">Activation: {new Date(exam.activationTime).toLocaleString()}</p>
              )}
            
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}