'use client';

import React from 'react';

export default function AdminDashboard() {
  const questions = JSON.parse(localStorage.getItem('questions') || '[]');
  const results = JSON.parse(localStorage.getItem('results') || '[]');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Total Questions</h2>
          <p className="text-3xl">{questions.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Total Exams</h2>
          <p className="text-3xl">1</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Total Results</h2>
          <p className="text-3xl">{results.length}</p>
        </div>
      </div>
    </div>
  );
}
