"use client";

import {
  BarChart3,
  CheckCircle,
  Trophy,
  Bell,
  Clock,
  Search,
  Moon,
  Sun,
  LayoutDashboard,
  BookOpen,
  LogOut,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [examTab, setExamTab] = useState("upcoming");
  const [showModal, setShowModal] = useState(false);
  const [activeExam, setActiveExam] = useState(null);
  const [timer, setTimer] = useState(null);

  // ---------------- MOCK DATA ----------------
  const [myExams, setMyExams] = useState([
    {
      id: 1,
      title: "English Grammar",
      status: "upcoming",
      duration: 60,
      date: "Jan 12, 2026",
    },
    {
      id: 2,
      title: "Math",
      status: "ongoing",
      duration: 45,
      remaining: 1500,
      progress: 60,
    },
    {
      id: 3,
      title: "Web Fundamentals",
      status: "completed",
      score: "82%",
    },
  ]);

  // ---------------- TIMER LOGIC ----------------
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

      // simulate progress bar
      setMyExams((prev) =>
        prev.map((e) =>
          e.id === activeExam
            ? {
                ...e,
                progress: e.progress + 100 / (e.duration * 60) || 0,
              }
            : e
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [activeExam, timer]);

  const startExam = (exam) => {
    setShowModal(false);
    setActiveExam(exam.id);
    setTimer(exam.duration * 60);

    const updated = myExams.map((e) =>
      e.id === exam.id ? { ...e, status: "ongoing", progress: 0 } : e
    );

    setMyExams(updated);
  };

  const finishExam = () => {
    const updated = myExams.map((e) =>
      e.id === activeExam
        ? { ...e, status: "completed", score: "78%", progress: 100 }
        : e
    );
    setMyExams(updated);
    setActiveExam(null);
    setTimer(null);
  };

  const filtered = myExams.filter((e) => e.status === examTab);

  // ---------------- UI ----------------
  return (
    <div className={dark ? "bg-gray-900 text-white" : "bg-gray-100"}>
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside
          className={`w-64 p-6 border-r ${
            dark ? "bg-gray-900 border-gray-700" : "bg-white"
          }`}
        >
          <h1 className="text-xl font-bold mb-8">Student Panel</h1>

          <nav className="space-y-3">
            <button
              onClick={() => setPage("dashboard")}
              className={`w-full flex gap-3 p-2 rounded ${
                page === "dashboard" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>

            <button
              onClick={() => setPage("myexams")}
              className={`w-full flex gap-3 p-2 rounded ${
                page === "myexams" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
              }`}
            >
              <BookOpen size={18} /> My Exams
            </button>

            <button className="w-full flex gap-3 p-2 rounded hover:bg-gray-100">
              <LogOut size={18} /> Logout
            </button>
          </nav>

          <button
            onClick={() => setDark(!dark)}
            className="mt-10 flex gap-2 px-3 py-2 border rounded"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6">
          {/* DASHBOARD */}
          {page === "dashboard" && (
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Stat label="Total Exams" value="12" icon={<BarChart3 />} />
              <Stat label="Attempted" value="9" icon={<CheckCircle />} />
              <Stat label="Highest Score" value="92%" icon={<Trophy />} />
            </div>
          )}

          {/* MY EXAMS */}
          {page === "myexams" && (
            <>
              <h2 className="text-xl font-bold mb-4">My Exams</h2>

              {/* Tabs */}
              <div className="flex gap-3 mb-6">
                {["upcoming", "ongoing", "completed"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setExamTab(t)}
                    className={`px-4 py-2 rounded capitalize ${
                      examTab === t ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Exam List */}
              {filtered.map((exam) => (
                <div
                  key={exam.id}
                  className="border rounded p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
                >
                  <div>
                    <p className="font-semibold text-lg">{exam.title}</p>

                    {exam.status === "upcoming" && (
                      <p className="text-sm opacity-70">
                        📅 {exam.date} • ⏱ {exam.duration} mins
                      </p>
                    )}

                    {exam.status === "ongoing" && timer && activeExam === exam.id && (
                      <p className="text-orange-500 font-semibold">
                        ⏳ Remaining: {Math.floor(timer / 60)}:
                        {String(timer % 60).padStart(2, "0")}
                      </p>
                    )}

                    {exam.status === "completed" && (
                      <p className="text-green-600 font-semibold">
                        ✅ Score: {exam.score}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 w-full md:w-auto">
                    {exam.status === "upcoming" && (
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setActiveExam(exam);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Start Exam
                      </button>
                    )}

                    {exam.status === "ongoing" && (
                      <>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded">
                          Continue
                        </button>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-gray-300 rounded mt-1">
                          <div
                            className="h-full bg-orange-500 rounded"
                            style={{ width: `${exam.progress || 0}%` }}
                          />
                        </div>
                      </>
                    )}

                    {exam.status === "completed" && (
                      <button className="bg-green-600 text-white px-4 py-2 rounded">
                        View Result
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <p className="text-sm opacity-60">No exams found in this category.</p>
              )}
            </>
          )}
        </main>
      </div>

      {/* MODAL */}
      {showModal && activeExam && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded w-[400px] relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <h3 className="text-lg font-bold mb-3">Exam Instructions</h3>
            <ul className="text-sm mb-4 list-disc pl-4">
              <li>Duration: {activeExam.duration} mins</li>
              <li>No tab switching</li>
              <li>Auto submit on timeout</li>
            </ul>

            <button
              onClick={() => startExam(activeExam)}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Start Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- COMPONENTS ---------- */
function Stat({ label, value, icon }) {
  return (
    <div className="bg-white p-5 rounded shadow">
      <div className="flex justify-between">
        <p className="text-sm opacity-70">{label}</p>
        {icon}
      </div>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
