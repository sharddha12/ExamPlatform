
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ExamAttempt() {
  const { examId } = useParams();
  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes example → change as needed
  const [loading, setLoading] = useState(true);

  const QUESTIONS_PER_PAGE = 20;

  
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  useEffect(() => {
    
    const mockQuestions = Array.from({ length: 65 }, (_, i) => ({
      id: i + 1,
      text: `Question ${i + 1}: This is sample question number ${i + 1} from CSV upload. What is the correct answer?`,
      options: [
        `Option A for Q${i + 1}`,
        `Option B for Q${i + 1}`,
        `Option C for Q${i + 1}`,
        `Option D for Q${i + 1}`,
      ],
      correctAnswer: `Option A for Q${i + 1}`, // just for demo
    }));

    setQuestions(mockQuestions);
    setLoading(false);
  }, [examId]);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const handleOptionChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitExam = () => {
    if (confirm('Are you sure you want to submit the exam?')) {
      // In real app → send answers to backend
      console.log('Submitted answers:', answers);

      // Redirect to result page
      router.push(`/student/exams/${examId}/result`);
      // or show success message + score
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-medium text-gray-700">Loading exam questions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-10">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Header with timer & progress */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 border border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Exam ID: {examId}
            </h1>
            <p className="text-gray-600">
              Total Questions: {questions.length} • Page {currentPage + 1} of {totalPages}
            </p>
          </div>

          <div className="text-xl font-bold text-red-600 flex items-center gap-2">
            <span>Time Left:</span>
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Questions - 20 per page */}
        <div className="space-y-8">
          {currentQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                  {q.id}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-gray-800 mb-5 leading-relaxed">
                    {q.text}
                  </p>

                  <div className="space-y-3">
                    {q.options.map((option: string, idx: number) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                          answers[q.id] === option
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={option}
                          checked={answers[q.id] === option}
                          onChange={() => handleOptionChange(q.id, option)}
                          className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-gray-800">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination + Submit */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Page navigation */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-5 py-2.5 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
            >
              Previous Page
            </button>

            <div className="text-sm font-medium text-gray-700">
              Page {currentPage + 1} of {totalPages}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="px-5 py-2.5 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
            >
              Next Page
            </button>
          </div>

          {/* Submit button - always visible */}
          <button
            onClick={handleSubmitExam}
            className="px-10 py-3.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-colors w-full sm:w-auto"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}