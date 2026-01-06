'use client';

import React, { useState } from 'react';
import * as mammoth from 'mammoth';
import Papa from 'papaparse';
import dynamic from 'next/dynamic';

// PDF.js client-side only
const pdfjsLib = dynamic(
  () =>
    import('pdfjs-dist/build/pdf').then((mod) => {
      mod.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${mod.version}/pdf.worker.js`;
      return mod;
    }),
  { ssr: false }
);

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
  subject: string;
}

// Clean Word text
const cleanText = (text: string) => {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/\t/g, ' ')
    .trim();
};

export default function AddQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subject, setSubject] = useState('');
  const [fileName, setFileName] = useState('');

  // NEW robust parser for Word / TXT
  const parseTextQuestions = (text: string): Question[] => {
    const lines = text.replace(/\r\n/g, '\n').split('\n').map(l => l.trim()).filter(Boolean);
    const parsed: Question[] = [];

    let qText = '';
    let options: string[] = [];
    let answer = '';
    const subjectLine = subject;

    const pushQuestion = () => {
      if (qText && options.length && answer) {
        // Convert numeric answer to option text
        if (/^[1-4]$/.test(answer)) answer = options[parseInt(answer, 10) - 1] || '';
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

  // Handle file upload
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
        const text = cleanText(result.value);
        parsedQuestions = parseTextQuestions(text);
      } else if (ext === 'pdf') {
        const pdfModule = await pdfjsLib;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfModule.getDocument({ data: arrayBuffer }).promise;

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
        parsedQuestions = result.data.map((row: any) => ({
          questionText: row.questionText || '',
          options: [row.option1, row.option2, row.option3, row.option4].filter(Boolean),
          correctAnswer: row.correctAnswer || '',
          subject: row.subject || subject,
        })).filter(q => q.questionText && q.options.length && q.correctAnswer);
      } else if (ext === 'txt') {
        const text = await file.text();
        parsedQuestions = parseTextQuestions(text);
      } else {
        alert('Please upload Word (.docx), PDF (.pdf), CSV (.csv), or Text (.txt) files!');
        return;
      }

      if (!parsedQuestions.length) {
        alert('No questions found in the file. Check the format.');
        return;
      }

      setQuestions(parsedQuestions);
      alert(`${parsedQuestions.length} questions loaded successfully!`);
    } catch (err) {
      console.error(err);
      alert('Error reading file. Check file content.');
    }
  };

  // Save locally
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">MCQ Bulk Upload</h1>

      {/* Instructions */}
      <div className="bg-blue-50 p-4 rounded mb-6 border border-blue-100 text-sm">
        <p className="font-bold mb-2">Accepted Formats:</p>
        <pre className="bg-white p-2 rounded border text-xs">
1. Question text
1. Option1
2. Option2
3. Option3
4. Option4
Answer: 2
        </pre>
        <p className="mt-2 text-xs text-blue-600 italic">
          * Options can be A), B), C), D) or 1.,2.,3.,4.
        </p>
        <p className="mt-1 text-xs text-blue-600 italic">
          * Answer can be number, letter, or option text.
        </p>
      </div>

      {/* Subject */}
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Subject (optional if file has subject)"
      />

      {/* File input */}
      <input
        type="file"
        accept=".docx,.pdf,.csv,.txt"
        onChange={handleFileUpload}
        className="mb-2 block w-full text-sm"
      />
      {fileName && <p className="mb-2 text-gray-600">Selected file: <span className="font-medium">{fileName}</span></p>}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!questions.length}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded mb-6 disabled:opacity-50"
      >
        Save Questions Locally
      </button>

      {/* Preview */}
      {questions.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Preview Questions</h2>
          {questions.map((q, i) => (
            <div key={i} className="mb-4 p-4 bg-gray-50 rounded border">
              <p className="font-bold">{i + 1}. {q.questionText}</p>
              {q.subject && <p className="text-sm text-gray-500 mb-1">Subject: {q.subject}</p>}
              <ul className="ml-4 text-sm space-y-1">
                {q.options.map((opt, idx) => (
                  <li key={idx} className={q.correctAnswer === opt ? "text-green-600 font-semibold" : ""}>
                    {String.fromCharCode(65 + idx)}) {opt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
