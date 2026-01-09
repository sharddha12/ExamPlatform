"use client";

import { useState, useMemo } from "react";

export default function ExamAttemptPageClient({ examId }) {
  const questions = [
    { q: "What is 2 + 2?", options: ["1", "2", "3", "4"] },
    { q: "Capital of Nepal?", options: ["Pokhara", "Kathmandu", "Butwal", "Biratnagar"] },
    { q: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "None", "Hyper Tool Modern Language"] },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [review, setReview] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const total = questions.length;

  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers]
  );

  const allAnswered = answeredCount === total;

  // 👉 Submit exam
  const handleSubmit = () => {
    setConfirm(false);
    setSubmitted(true);
  };

  // 👉 After submit — show summary
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-green-700">
          ✅ Exam Submitted
        </h1>

        <div className="bg-white p-6 rounded-xl shadow max-w-2xl w-full">
          <p className="mb-4 font-semibold">
            Exam ID: <span className="text-blue-600">{examId}</span>
          </p>

          <p className="mb-4">
            You answered <strong>{answeredCount}</strong> out of{" "}
            <strong>{total}</strong> questions.
          </p>

          <p className="text-gray-600">
            (Later we can show score when backend connects 👍)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex gap-6">
      {/* ---------- LEFT SIDEBAR (Question Navigator) ---------- */}
      <div className="bg-white shadow rounded-xl p-4 w-40 h-fit">
        <h3 className="font-semibold mb-3 text-sm">Questions</h3>

        <div className="grid grid-cols-4 gap-2">
          {questions.map((_, i) => {
            const isAnswered = answers[i];
            const isReview = review[i];

            return (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-9 w-9 rounded text-sm border 
                  ${current === i ? "border-blue-600" : "border-gray-300"}
                  ${
                    isAnswered
                      ? "bg-green-100"
                      : isReview
                      ? "bg-yellow-100"
                      : "bg-gray-50"
                  }
                `}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-xs space-y-1">
          <p>🟩 = Answered</p>
          <p>🟨 = Marked</p>
          <p>⬜ = Not answered</p>
        </div>
      </div>

      {/* ---------- MAIN EXAM CARD ---------- */}
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-3xl">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h1 className="font-bold">
            Exam: <span className="text-blue-600">{examId}</span>
          </h1>

          <div className="text-sm bg-gray-100 px-3 py-2 rounded">
            ⏳ Time Left: <span className="text-red-600 font-semibold">30:00</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <p>Progress</p>
            <p>
              {answeredCount}/{total} answered
            </p>
          </div>

          <div className="w-full h-2 bg-gray-300 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${(answeredCount / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <p className="font-semibold mb-2">
          Question {current + 1} of {total}
        </p>

        <p className="mb-4">{questions[current].q}</p>

        {/* Options */}
        <div className="space-y-2">
          {questions[current].options.map((o) => (
            <label
              key={o}
              className={`flex items-center gap-2 p-3 border rounded cursor-pointer transition
                ${
                  answers[current] === o
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-gray-100"
                }
              `}
            >
              <input
                type="radio"
                name={`q-${current}`}
                value={o}
                checked={answers[current] === o}
                onChange={() => setAnswers({ ...answers, [current]: o })}
                className="accent-blue-600"
              />
              {o}
            </label>
          ))}
        </div>

        {/* Review Checkbox */}
        <div className="mt-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={review[current] || false}
              onChange={() =>
                setReview({ ...review, [current]: !review[current] })
              }
            />
            Mark this question for review
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrent((v) => v - 1)}
            disabled={current === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-60"
          >
            Previous
          </button>

          {current < total - 1 ? (
            <button
              onClick={() => setCurrent((v) => v + 1)}
              disabled={!answers[current]}
              className={`px-4 py-2 rounded text-white transition
                ${
                  answers[current]
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
            >
              Next
            </button>
          ) : (
            <button
              disabled={!allAnswered}
              onClick={() => setConfirm(true)}
              className={`px-4 py-2 rounded text-white
                ${
                  allAnswered
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>

      {/* ---------- SUBMIT CONFIRM MODAL ---------- */}
      {confirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow max-w-md w-full">
            <h2 className="font-bold text-lg mb-2">Submit exam?</h2>
            <p className="mb-4 text-sm text-gray-600">
              You cannot change answers after submitting.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
