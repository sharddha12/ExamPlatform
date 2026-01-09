'use client';

import React, { useState } from 'react';
import * as mammoth from 'mammoth';
import Papa from 'papaparse';
import dynamic from 'next/dynamic';



interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
  subject: string;
}

const cleanText = (text: string) =>
  text.replace(/\r\n/g, '\n').replace(/\u00a0/g, ' ').replace(/\t/g, ' ').trim();

export default function AddQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subject, setSubject] = useState('');
  const [fileName, setFileName] = useState('');

  const parseTextQuestions = (text: string): Question[] => {
    const lines = text
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const parsed: Question[] = [];
    let qText = '';
    let options: string[] = [];
    let answer = '';
    const subjectLine = subject;

    const pushQuestion = () => {
      if (qText && options.length && answer) {
        if (/^[1-4]$/.test(answer)) {
          answer = options[parseInt(answer, 10) - 1] || '';
        }
        parsed.push({ questionText: qText, options, correctAnswer: answer, subject: subjectLine });
      }
      qText = '';
      options = [];
      answer = '';
    };

    lines.forEach((line) => {
      if (/^Answer:/i.test(line)) {
        answer = line.replace(/^Answer:/i, '').trim();
        pushQuestion();
      } else if (/^[1-4]\./.test(line)) {
        options.push(line.replace(/^[1-4]\.\s*/, '').trim());
      } else {
        qText = line;
      }
    });

    return parsed;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase();
    let parsedQuestions: Question[] = [];

    try {
      if (ext === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        parsedQuestions = parseTextQuestions(cleanText(result.value));
      } else if (ext === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();

        let textContent = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          text.items.forEach((item: any) => (textContent += item.str + '\n'));
          textContent += '\n';
        }

        parsedQuestions = parseTextQuestions(textContent);
      } else if (ext === 'csv') {
        const text = await file.text();
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });

        parsedQuestions = result.data
          .map((row: any) => ({
            questionText: row.questionText || '',
            options: [row.option1, row.option2, row.option3, row.option4].filter(Boolean),
            correctAnswer: row.correctAnswer || '',
            subject: row.subject || subject,
          }))
          .filter((q) => q.questionText && q.options.length && q.correctAnswer);
      } else if (ext === 'txt') {
        const text = await file.text();
        parsedQuestions = parseTextQuestions(text);
      } else {
        alert('Please upload DOCX, or TXT files!');
        return;
      }

      if (!parsedQuestions.length) {
        alert('No questions found. Please check file format.');
        return;
      }

      setQuestions(parsedQuestions);
      alert(`${parsedQuestions.length} questions loaded successfully!`);
    } catch (err) {
      console.error(err);
      alert('Error reading file. Please check the file content.');
    }
  };

  const handleSave = () => {
    if (!questions.length) return;

    const existing = JSON.parse(localStorage.getItem('questions') || '[]');
    localStorage.setItem('questions', JSON.stringify([...existing, ...questions]));

    alert(`${questions.length} questions saved locally!`);

    setQuestions([]);
    setFileName('');
    setSubject('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          MCQ Bulk Upload
        </h1>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <p className="font-semibold text-blue-800 mb-3">
            📂 Supported files: DOCX • TXT
          </p>

          <p className="font-semibold text-gray-700 mb-2">
            👉 Format example:
          </p>

          <div className="bg-white rounded-lg border p-3 text-sm">
            What is JavaScript? <br />
            1. Programming Language <br />
            2. Database <br />
            3. Browser <br />
            4. OS <br />
            Answer: Programming Language
          </div>

          <p className="mt-3 text-xs text-blue-600 italic">
            ✔ Options can be 1,2,3,4 OR A,B,C,D
          </p>
          <p className="text-xs text-blue-600 italic">
            ✔ Answer can be number, letter, or full text
          </p>
        </div>

 
       

        {/* File Upload */}
        <label className="font-semibold text-gray-700 text-sm mb-1 block">
          Upload File
        </label>

        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition mb-3">
          <span className="text-sm text-gray-600">
            Click here or drag & drop file
          </span>

          <input
            type="file"
            accept=".docx,.pdf,.csv,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {fileName && (
          <p className="mb-3 text-gray-600 text-sm">
            📄 Selected: <span className="font-semibold">{fileName}</span>
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={!questions.length}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          Save Questions 
        </button>

        {questions.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              👀 Preview Questions ({questions.length})
            </h2>

            {questions.map((q, i) => (
              <div
                key={i}
                className="mb-4 p-4 bg-gray-50 rounded-xl border shadow-sm"
              >
                <p className="font-bold text-gray-800">
                  {i + 1}. {q.questionText}
                </p>

                {q.subject && (
                  <p className="text-xs text-gray-500 mb-1">
                    Subject: {q.subject}
                  </p>
                )}

                <ul className="ml-4 text-sm space-y-1 mt-2">
                  {q.options.map((opt, idx) => (
                    <li
                      key={idx}
                      className={
                        q.correctAnswer === opt
                          ? 'text-green-600 font-semibold'
                          : ''
                      }
                    >
                      {String.fromCharCode(65 + idx)}) {opt}
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
