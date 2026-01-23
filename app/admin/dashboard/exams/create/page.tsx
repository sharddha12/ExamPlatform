// app/admin/dashboard/exams/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateExam() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('mock');
  const [activationTime, setActivationTime] = useState('');
  const [questions, setQuestions] = useState([]); // Placeholder for question IDs
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: Send to API
    const examData = { title, type, activationTime: type === 'entrance' ? activationTime : null, questions };
    // await fetch('/api/exams', { method: 'POST', body: JSON.stringify(examData) });
    console.log('Exam data:', examData);
    router.push('/admin/dashboard/exams');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Create New Exam</h1>
      </header>
      <main className="container mx-auto p-6">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6 max-w-lg mx-auto">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input 
              id="title" 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Type</label>
            <select 
              id="type" 
              value={type} 
              onChange={(e) => setType(e.target.value)} 
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mock">Mock Test</option>
              <option value="entrance">Entrance Exam</option>
            </select>
          </div>
          {type === 'entrance' && (
            <div>
              <label htmlFor="activationTime" className="block text-gray-700 font-medium mb-2">Activation Time</label>
              <input 
                id="activationTime" 
                type="datetime-local" 
                value={activationTime} 
                onChange={(e) => setActivationTime(e.target.value)} 
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>
          )}
          {/* Placeholder for question selection UI */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Questions</label>
            <p className="text-gray-500">Implement multi-select dropdown here from available questions.</p>
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded"
          >
            Create Exam
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">For mock tests, questions will be reshuffled on the student side.</p>
      </main>
    </div>
  );
}