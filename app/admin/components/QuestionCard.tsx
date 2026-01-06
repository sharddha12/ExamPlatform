"use client";

import React from "react";

interface QuestionCardProps {
  question: {
    _id: string;
    questionText: string;
    options: string[];
  };
  selectedAnswer: string;
  handleAnswerChange: (questionId: string, answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedAnswer, handleAnswerChange }) => {
  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      <h3 className="font-semibold mb-2">{question.questionText}</h3>
      <div className="flex flex-col space-y-2">
        {question.options.map((opt, idx) => (
          <label key={idx} className="flex items-center space-x-2">
            <input
              type="radio"
              name={question._id}
              value={opt}
              checked={selectedAnswer === opt}
              onChange={() => handleAnswerChange(question._id, opt)}
              className="accent-blue-600"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
