'use client';

export default function ResultPage() {
  const result =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('examResult') || '{}')
      : {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Exam Result</h1>
        <p className="text-lg">
          Score: <span className="font-semibold">{result.score}</span> /{' '}
          {result.total}
        </p>
      </div>
    </div>
  );
}
