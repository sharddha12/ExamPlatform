
import StudentSidebar from './components/StudentSidebar'; 

export default function StudentHome() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <StudentSidebar />

    
      <div className="flex-1 ml-64 p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, Student!
        </h1>
        <p className="text-gray-600 mb-10">
          Here are your available mock tests and upcoming entrance exams.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-3 text-indigo-600">
              <li>
                <a href="/student/exams" className="hover:underline">
                  → View All Exams
                </a>
              </li>
              <li>
                <a href="/student/results" className="hover:underline">
                  → My Previous Results
                </a>
              </li>
              <li>
                <a href="/student/profile" className="hover:underline">
                  → Update Profile
                </a>
              </li>
            </ul>
          </div>

      
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">Your Stats</h3>
            <div className="space-y-2 text-gray-700">
              <p>Mock Tests Taken: <strong>7</strong></p>
              <p>Best Score: <strong>84%</strong></p>
              <p>Entrance Exams Attempted: <strong>1</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
