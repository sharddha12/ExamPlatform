'use client';

import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export default function MockTestResult({ result }) {
  // Default data if no props passed
  const data = result || {
    studentName: 'John Doe',
    score: 78,
    totalQuestions: 100,
    correct: 78,
    incorrect: 22,
    timeTaken: '1h 30m',
  };

  const percentage = Math.round((data.score / data.totalQuestions) * 100);

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 text-center bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Mock Test Result
        </h2>

        {/* Score */}
        <p className="text-indigo-600 text-4xl sm:text-5xl font-bold mb-4">
          {data.score}/{data.totalQuestions} ({percentage}%)
        </p>

        {/* Correct / Incorrect */}
        <div className="flex justify-center gap-10 mb-6">
          <div className="flex flex-col items-center">
            <CheckCircle className="w-10 h-10 text-green-500 mb-1" />
            <span className="font-semibold text-gray-700">{data.correct} Correct</span>
          </div>
          <div className="flex flex-col items-center">
            <XCircle className="w-10 h-10 text-red-500 mb-1" />
            <span className="font-semibold text-gray-700">{data.incorrect} Incorrect</span>
          </div>
        </div>

        {/* Time Taken */}
        <p className="text-gray-500 mb-6">
          Time Taken: <span className="font-medium text-gray-900">{data.timeTaken}</span>
        </p>

        {/* Button */}
        <a
          href="/student/mocktest/report"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
        >
          View Detailed Report
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
