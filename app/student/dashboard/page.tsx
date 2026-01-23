'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, BookOpen, LogOut, Moon, Sun, X, BarChart3, CheckCircle, Trophy } from 'lucide-react';

export default function StudentDashboard() {
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [examTab, setExamTab] = useState('upcoming');
  const [activeExam, setActiveExam] = useState(null);
  const [timer, setTimer] = useState(null);
  const [myExams, setMyExams] = useState([]); 

  useEffect(() => {
    
    const exams = [
      { id: 1, title: 'English Grammar', type: 'entrance', status: 'upcoming', duration: 60, date: 'Jan 25, 2026 09:00' },
      { id: 2, title: 'Math Mock Test', type: 'mock', status: 'mock', duration: 30 },
      { id: 3, title: 'Web Fundamentals', type: 'entrance', status: 'completed', score: '82%' },
    ];
    setMyExams(exams);
  }, []);


  useEffect(() => {
    if (!activeExam || timer === null) return;
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          finishExam();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeExam, timer]);

  const startExam = (exam) => {
    router.push(`/student/exam?examId=${exam.id}`);
  };

  const finishExam = () => {
    setMyExams((prev) =>
      prev.map((e) =>
        e.id === activeExam ? { ...e, status: 'completed', score: '78%', progress: 100 } : e
      )
    );
    setActiveExam(null);
    setTimer(null);
  };

  const filtered = myExams.filter((e) =>
    examTab === 'upcoming'
      ? e.status === 'upcoming' || e.type === 'mock'
      : e.status === examTab
  );

  return (
    <div className={dark ? 'bg-gray-900 text-white' : 'bg-gray-100'}>
      <div className="flex min-h-screen">
      
        <aside className={`w-64 p-6 border-r ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}>
          <h1 className="text-xl font-bold mb-8">Student Panel</h1>
          <nav className="space-y-3">
            <button
              onClick={() => setPage('dashboard')}
              className={`w-full flex gap-3 p-2 rounded ${page === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button
              onClick={() => setPage('myexams')}
              className={`w-full flex gap-3 p-2 rounded ${page === 'myexams' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
            >
              <BookOpen size={18} /> My Exams
            </button>
            <button className="w-full flex gap-3 p-2 rounded hover:bg-gray-100">
              <LogOut size={18} /> Logout
            </button>
          </nav>
          <button
            onClick={() => setDark(!dark)}
            className="mt-10 flex gap-2 px-3 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />} {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </aside>


        <main className="flex-1 p-6">
          {page === 'dashboard' && (
            <>
          
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Stat label="Total Exams" value={myExams.length} icon={<BarChart3 />} color="blue" />
                <Stat
                  label="Attempted"
                  value={myExams.filter((e) => e.status === 'completed').length}
                  icon={<CheckCircle />}
                  color="orange"
                />
                <Stat label="Highest Score" value="92%" icon={<Trophy />} color="green" />
              </div>

              
              {myExams.find((e) => e.status === 'upcoming') && (
                <div className="bg-white p-6 rounded shadow mb-6">
                  <h2 className="text-xl font-bold mb-2">Upcoming Entrance Exam</h2>
                  <p>{myExams.find((e) => e.status === 'upcoming').title}</p>
                  <p className="text-orange-600">Countdown: {/* add countdown logic */}</p>
                </div>
              )}

              {/* Mock Tests */}
              <div className="bg-white p-6 rounded shadow mb-6">
                <h2 className="text-xl font-bold mb-2">Available Mock Tests</h2>
                {myExams.filter((e) => e.type === 'mock').map((exam) => (
                  <div key={exam.id} className="flex justify-between items-center p-2 border-b">
                    <p>{exam.title}</p>
                    <button
                      onClick={() => startExam(exam)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {page === 'myexams' && (
            <>
              <h2 className="text-xl font-bold mb-4">My Exams</h2>
              <div className="flex gap-3 mb-6">
                {['upcoming', 'ongoing', 'completed'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setExamTab(t)}
                    className={`px-4 py-2 rounded font-medium ${examTab === t ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {filtered.map((exam) => (
                <div key={exam.id} className="border rounded p-4 mb-4 flex justify-between">
                  <div>
                    <p className="font-semibold">{exam.title}</p>
                    <p className="text-sm opacity-70">{exam.duration} mins</p>
                  </div>
                  <div>
                    {exam.status === 'completed' ? (
                      <button className="bg-green-600 px-3 py-1 rounded text-white">View Result</button>
                    ) : (
                      <button
                        onClick={() => startExam(exam)}
                        className="bg-blue-600 px-3 py-1 rounded text-white"
                      >
                        Start
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <p className="text-sm opacity-60">No exams found</p>}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function Stat({ label, value, icon, color }) {
  const colorMap = { blue: 'text-blue-600', orange: 'text-orange-500', green: 'text-green-600' };
  return (
    <div className="bg-white p-5 rounded shadow hover:shadow-lg transition-transform transform hover:scale-105">
      <div className="flex justify-between items-center">
        <p className="text-sm opacity-70">{label}</p>
        <div className={colorMap[color]}>{icon}</div>
      </div>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
