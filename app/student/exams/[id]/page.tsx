'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EXAM_CONFIG = {
  duration: 10 * 60, // 10 minutes
  negativeMarking: true,
  negativeValue: 0.25,
};

const QUESTIONS = [
  {
    id: 1,
    subject: 'Math',
    question: 'What is 5 + 3?',
    options: ['5', '8', '10', '12'],
    correct: '8',
    marks: 1,
  },
  {
    id: 2,
    subject: 'Physics',
    question: 'Unit of Force?',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correct: 'Newton',
    marks: 1,
  },
  {
    id: 3,
    subject: 'Biology',
    question: 'Human heart has how many chambers?',
    options: ['2', '3', '4', '5'],
    correct: '4',
    marks: 1,
  },
];

export default function ExamAttemptPage() {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(EXAM_CONFIG.duration);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  /* TIMER */
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (qid: number, option: string) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);

    let score = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.id]) {
        if (answers[q.id] === q.correct) {
          score += q.marks;
        } else if (EXAM_CONFIG.negativeMarking) {
          score -= EXAM_CONFIG.negativeValue;
        }
      }
    });

    localStorage.setItem(
      'examResult',
      JSON.stringify({
        score,
        total: QUESTIONS.length,
      })
    );

    router.push('/student/results');
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const q = QUESTIONS[current];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Entrance Examination</h2>
          <div className="text-red-600 font-semibold">
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        {/* QUESTION */}
        <div>
          <p className="text-gray-500 mb-1">
            Question {current + 1} / {QUESTIONS.length}
          </p>
          <h3 className="text-lg font-semibold mb-4">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${
                  answers[q.id] === opt
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={answers[q.id] === opt}
                  onChange={() => handleAnswer(q.id, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-between mt-8">
          <button
            disabled={current === 0}
            onClick={() => setCurrent((c) => c - 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {current === QUESTIONS.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Submit Exam
            </button>
          ) : (
            <button
              onClick={() => setCurrent((c) => c + 1)}
              className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save & Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
