'use client';

import React, { useEffect, useState } from 'react';

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
  subject: string;
}

export default function QuestionListPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  // Load questions from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('questions') || '[]');
    setQuestions(stored);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          📋 Question List
        </h1>

        {questions.length === 0 ? (
          <p className="text-center text-gray-500">No questions found. Add some first!</p>
        ) : (
          <div className="space-y-4">
            {questions.map((q: Question, idx: number) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 rounded-xl border shadow-sm"
              >
                <p className="font-bold text-gray-800">
                  {idx + 1}. {q.questionText}
                </p>
                {q.subject && (
                  <p className="text-xs text-gray-500 mb-1">Subject: {q.subject}</p>
                )}
                <ul className="ml-4 text-sm space-y-1 mt-2">
                  {q.options.map((opt, i) => (
                    <li
                      key={i}
                      className={q.correctAnswer === opt ? 'text-green-600 font-semibold' : ''}
                    >
                      {String.fromCharCode(65 + i)}) {opt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
