import Link from 'next/link';
import StudentSidebar from "../components/StudentSidebar";

async function getAvailableExams() {
  return [
    {
      id: 1,
      title: 'Mock Test - Thermodynamics & Heat Transfer',
      type: 'mock',
      questions: 40,
      duration: '90 min',
      status: 'available',
    },
    
    {
      id: 3,
      title: 'Civil Engineering Mock - Structural Analysis',
      type: 'mock',
      questions: 35,
      duration: '60 min',
      status: 'available',
    },
  ];
}

export default async function ExamsList() {
  const exams = await getAvailableExams();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main content */}
      <div className="flex-1 ml-64 p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Available Exams
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {exam.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      exam.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : exam.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {exam.status === 'available'
                      ? 'Available'
                      : exam.status === 'upcoming'
                      ? 'Upcoming'
                      : 'Closed'}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Type:</span>{' '}
                    {exam.type === 'mock' ? 'Mock Test' : 'Entrance Exam'}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Questions:</span> {exam.questions}
                  </p>
                  {exam.type === 'mock' ? (
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Duration:</span> {exam.duration}
                    </p>
                  ) : (
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Date:</span>{' '}
                      {exam.date || 'TBA'}
                    </p>
                  )}
                </div>

                {exam.status === 'available' && (
                  <Link
                    href={`/student/exams/${exam.id}/attempt`}
                    className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
                  >
                    Start Exam
                  </Link>
                )}

                {exam.status === 'upcoming' && (
                  <button
                    disabled
                    className="block w-full bg-gray-400 text-white py-3 rounded-lg font-medium cursor-not-allowed"
                  >
                    Not Started Yet
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
