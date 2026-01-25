'use client'; 

import StudentSidebar from '../components/StudentSidebar';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trophy, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

type ExamResult = {
  examId: number | string;
  title: string;
  type: 'mock' | 'entrance';
  date: string; 
  score: number; 
  totalQuestions: number;
  correct: number;
  timeTaken: string; 
};

export default function MyResults() {
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedResults = localStorage.getItem('studentResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    } else {
      const dummyResults: ExamResult[] = [
        {
          examId: 1,
          title: 'Mock Test - Thermodynamics & Heat Transfer',
          type: 'mock',
          date: '2025-12-20',
          score: 78,
          totalQuestions: 40,
          correct: 31,
          timeTaken: '52 min',
        },
        {
          examId: 3,
          title: 'Civil Engineering Mock - Structural Analysis',
          type: 'mock',
          date: '2025-12-18',
          score: 85,
          totalQuestions: 35,
          correct: 30,
          timeTaken: '38 min',
        },
        {
          examId: 5,
          title: 'Computer Engineering Mock - Programming Basics',
          type: 'mock',
          date: '2025-12-15',
          score: 62,
          totalQuestions: 50,
          correct: 31,
          timeTaken: '65 min',
        },
      ];
      setResults(dummyResults);
      localStorage.setItem('studentResults', JSON.stringify(dummyResults));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-lg">Loading results...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No results yet
        </h2>
        <p className="text-gray-600 mb-6">
          Complete your first mock test to see your results here.
        </p>
        <Link
          href="/student/exams"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Start a Mock Test
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <StudentSidebar />

      
      <div className="flex-1 ml-64 p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Results</h1>
        <p className="text-gray-600 mb-8">
          Your performance in mock tests and entrance exams
        </p>

        <div className="space-y-6">
          {results.map((result) => (
            <div
              key={result.examId}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {result.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {result.type === 'mock' ? 'Mock Test' : 'Entrance Exam'} •{' '}
                    {result.date}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-indigo-600">
                    {result.score}%
                  </div>
                  <p className="text-sm text-gray-500">
                    {result.correct}/{result.totalQuestions} correct
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-gray-700">{result.timeTaken}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Correct</p>
                    <p className="text-gray-700">{result.correct}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium">Wrong</p>
                    <p className="text-gray-700">
                      {result.totalQuestions - result.correct}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium">Score</p>
                    <p className="text-gray-700 font-medium">{result.score}%</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
