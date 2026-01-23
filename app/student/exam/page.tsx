'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
}

export default function ExamPage() {
  const router = useRouter();

  const [exam, setExam] = useState({
    title: 'Math Mock Test',
    duration: 30, 
    instructions: ['Duration: 30 mins', 'No tab switching', 'Auto submit on timeout'],
    questions: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      question: `Question ${i + 1}: Sample math question?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
    })) as Question[],
  });

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timer, setTimer] = useState(exam.duration * 60); // seconds

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    console.log('Exam submitted!', answers);
    alert('Exam submitted!');
    router.push('/student/dashboard');
  };

  const minutes = Math   .floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{exam.title}</h1>
          <button
            onClick={() => router.push('/student/dashboard')}
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Timer */}
        <p className="font-semibold text-orange-600 mb-4">
          Time Remaining: {minutes}:{seconds.toString().padStart(2, '0')}
        </p>

        {/* Instructions */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-6">
          <h2 className="font-semibold mb-2">Instructions:</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {exam.instructions.map((inst, idx) => (
              <li key={idx}>{inst}</li>
            ))}
          </ul>
        </div>

        {/* Questions */}
        {exam.questions.map((q) => (
          <div key={q.id} className="p-4 border rounded mb-4">
            <p className="font-medium mb-2">
              Q{q.id}. {q.question}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt) => (
                <label
                  key={opt}
                  className={`p-2 border rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    answers[q.id] === opt
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleAnswer(q.id, opt)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
}
