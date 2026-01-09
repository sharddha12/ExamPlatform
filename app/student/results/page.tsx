"use client";

import { useState } from "react";

export default function StudentResultsPage() {
  const allResults = [
    { exam: "Math Exam", score: 40, total: 50 },
    { exam: "Science Exam", score: 48, total: 60 },
    { exam: "English Exam", score: 22, total: 50 },
    { exam: "Computer Basics", score: 35, total: 50 },
    { exam: "Nepali Exam", score: 45, total: 50 },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all / passed / failed

  const filteredResults = allResults
    .filter((r) => r.exam.toLowerCase().includes(search.toLowerCase()))
    .filter((r) => {
      const percent = (r.score / r.total) * 100;
      if (filter === "passed") return percent >= 40;
      if (filter === "failed") return percent < 40;
      return true; // all
    });

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">

      <h1 className="text-2xl font-bold">📊 My Results</h1>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <input
          type="text"
          placeholder="Search exam..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg border w-full md:w-1/2"
        />

        <div className="flex gap-2">
          <button
            className={`px-3 py-2 rounded-lg border ${
              filter === "all" ? "bg-blue-600 text-white" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`px-3 py-2 rounded-lg border ${
              filter === "passed" ? "bg-green-600 text-white" : ""
            }`}
            onClick={() => setFilter("passed")}
          >
            Passed
          </button>

          <button
            className={`px-3 py-2 rounded-lg border ${
              filter === "failed" ? "bg-red-600 text-white" : ""
            }`}
            onClick={() => setFilter("failed")}
          >
            Failed
          </button>
        </div>
      </div>

      {/* RESULTS */}
      {filteredResults.length === 0 && (
        <p className="text-gray-500 mt-4">No results found…</p>
      )}

      {filteredResults.map((r, i) => {
        const percent = Math.round((r.score / r.total) * 100);
        const passed = percent >= 40;

        return (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow space-y-3"
          >
            <div className="flex justify-between">
              <p className="font-semibold text-lg">{r.exam}</p>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  passed
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {passed ? "Passed" : "Failed"}
              </span>
            </div>

            <p className="text-gray-600">
              Score: <b>{r.score}</b> / {r.total}
            </p>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-200 rounded">
              <div
                className={`h-3 rounded ${
                  passed ? "bg-green-500" : "bg-red-500"
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>

            <p className="text-sm text-gray-500">
              Percentage: <b>{percent}%</b>
            </p>
          </div>
        );
      })}
    </div>
  );
}
