// app/admin/dashboard/questions/[facultyId]/upload/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function UploadQuestions() {
  const [file, setFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const facultyId = params.facultyId as string;

  const MAX_PREVIEW_ROWS = 8;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
    setError(null);
    setPreviewRows([]);
    setHeaders([]);

    if (!selectedFile) return;

    // Basic file type check
    if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
      setError('Please select a .csv file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
      if (lines.length === 0) {
        setError('File is empty');
        return;
      }

      // Parse CSV (simple split — handles basic quoted fields)
      const parsedRows: string[][] = lines.map(line => {
        // Split by comma, but respect quoted fields
        const row: string[] = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"' && line[i - 1] !== '\\') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            row.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        row.push(current.trim()); // last field
        return row;
      });

      if (parsedRows.length > 0) {
        setHeaders(parsedRows[0]);
        const preview = parsedRows.slice(1, MAX_PREVIEW_ROWS + 1);
        setPreviewRows(preview);
      }
    };

    reader.readAsText(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('facultyId', facultyId);

    // Placeholder: real upload
    console.log('Uploading file for', facultyId);
    // const response = await fetch('/api/questions/upload', { method: 'POST', body: formData });

    alert('Questions uploaded successfully!');
    router.push('/admin/dashboard/questions');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-2xl font-bold">
          Upload Questions for {facultyId.toUpperCase()}
        </h1>
      </header>

      <main className="container mx-auto p-6 max-w-5xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="file"
                className="block text-gray-700 font-medium mb-2"
              >
                Select CSV File
              </label>
              <input
                id="file"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2.5 file:px-5
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Expected columns: question, optionA, optionB, optionC, optionD, correctAnswer, marks, difficulty
              </p>
            </div>

            <button
              type="submit"
              disabled={!file}
              className={`w-full py-3 px-6 rounded-lg font-medium text-white transition
                ${file 
                  ? 'bg-green-600 hover:bg-green-700 shadow-md' 
                  : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Upload Questions
            </button>
          </form>

          {/* Preview Section */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {previewRows.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Preview (first {previewRows.length} rows)
              </h2>

              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {headers.map((header, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewRows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-gray-50">
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className="px-4 py-3 text-sm text-gray-900 whitespace-pre-wrap"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {previewRows.length >= MAX_PREVIEW_ROWS && (
                <p className="mt-3 text-sm text-gray-500 text-center">
                  Showing first {MAX_PREVIEW_ROWS} rows — more rows exist in the file
                </p>
              )}
            </div>
          )}

          {!file && !error && (
            <div className="mt-10 text-center text-gray-500 italic">
              Select a CSV file to see preview
            </div>
          )}
        </div>
      </main>
    </div>
  );
}