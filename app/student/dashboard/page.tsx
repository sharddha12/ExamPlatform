"use client";

import {
  BarChart3,
  CheckCircle,
  Trophy,
  Bell,
  ArrowRight,
  Clock,
  User,
  Search,
  Moon,
  Sun,
  LayoutDashboard,
  BookOpen,
  LogOut,
} from "lucide-react";

import { useState } from "react";

export default function StudentDashboard() {
  const [dark, setDark] = useState(false);

  const [notifications] = useState([
    "Your Math exam result is published.",
    "New exam added: Web Fundamentals.",
  ]);

  const [search, setSearch] = useState("");

  const upcomingExams = [
    { title: "English Grammar", date: "Jan 12, 2026", time: "10:00 AM" },
    { title: "Web Fundamentals", date: "Jan 16, 2026", time: "1:00 PM" },
    { title: "Networking Basics", date: "Jan 22, 2026", time: "9:00 AM" },
  ];

  const filtered = upcomingExams.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={dark ? "bg-gray-900 text-white" : "bg-gray-100"}>
      <div className="flex min-h-screen">
        {/* 🌙 SIDEBAR */}
        <aside
          className={`w-64 p-6 border-r ${
            dark ? "border-gray-700 bg-gray-900" : "bg-white"
          }`}
        >
          <h1 className="text-xl font-bold mb-8">Student Panel</h1>

          <nav className="space-y-3">
            <button className="w-full flex items-center gap-3 p-2 rounded bg-blue-600 text-white">
              <LayoutDashboard size={18} /> Dashboard
            </button>

            <button
              className={`w-full flex items-center gap-3 p-2 rounded ${
                dark ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <BookOpen size={18} /> My Exams
            </button>

            <button
              className={`w-full flex items-center gap-3 p-2 rounded ${
                dark ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <LogOut size={18} /> Logout
            </button>
          </nav>

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className={`mt-10 flex items-center gap-2 px-3 py-2 rounded border ${
              dark
                ? "border-gray-700 hover:bg-gray-800"
                : "hover:bg-gray-100"
            }`}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </aside>

        {/* MAIN AREA */}
        <main className="flex-1 p-6 space-y-6">
          {/* 🔔 NOTIFICATIONS */}
          <div
            className={`p-4 rounded-xl flex gap-3 items-start ${
              dark ? "bg-gray-800 border border-gray-700" : "bg-blue-50"
            }`}
          >
            <Bell className={dark ? "text-blue-400" : "text-blue-700"} />
            <div>
              <p className="font-semibold">Notifications</p>
              <ul className="text-sm mt-1 list-disc pl-4">
                {notifications.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Total Exams"
              value="12"
              icon={<BarChart3 className="text-blue-500" />}
              dark={dark}
            />

            <StatCard
              label="Attempted"
              value="9"
              icon={<CheckCircle className="text-green-500" />}
              dark={dark}
            />

            <StatCard
              label="Highest Score"
              value="92%"
              icon={<Trophy className="text-yellow-500" />}
              dark={dark}
            />
          </div>

          {/* SEARCH + UPCOMING */}
          <div
            className={`rounded-xl shadow p-5 ${
              dark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Upcoming Exams</h2>

              <div
                className={`flex items-center gap-2 px-3 py-2 rounded border ${
                  dark ? "border-gray-600 bg-gray-900" : ""
                }`}
              >
                <Search size={16} />
                <input
                  placeholder="Search exam..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`bg-transparent outline-none text-sm ${
                    dark ? "placeholder-gray-400" : ""
                  }`}
                />
              </div>
            </div>

            {filtered.length === 0 && (
              <p className="text-sm opacity-70">No exams found…</p>
            )}

            {filtered.map((exam, i) => (
              <div
                key={i}
                className={`border rounded-lg p-3 mb-2 flex justify-between ${
                  dark ? "border-gray-600" : ""
                }`}
              >
                <div>
                  <p className="font-semibold">{exam.title}</p>
                  <p className="text-sm flex items-center gap-1 opacity-70">
                    <Clock size={14} /> {exam.date} | {exam.time}
                  </p>
                </div>

                <button className="text-blue-600 text-sm flex items-center gap-1">
                  Start <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, dark }) {
  return (
    <div
      className={`p-5 rounded-xl shadow transition ${
        dark ? "bg-gray-800 border border-gray-700" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-70">{label}</p>
        {icon}
      </div>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
