'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  Clock,
  Monitor,
  Wifi,
  ShieldCheck,
} from 'lucide-react';

export default function StudentRulesPage() {
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // 🔒 Check login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('studentLoggedIn');
    if (!isLoggedIn) router.replace('/student/rules');
  }, [router]);

  // 🚫 Tab switch alert
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        alert(
          '⚠️ Tab switching detected. Repeated violations may lead to exam submission.'
        );
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // ▶️ Start Exam
  const handleStartExam = async () => {
    if (!agree) return;

    
    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }


    setCountdown(3);
  };


  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      router.push('/student/Exam'); // Navigate to exam page
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white max-w-3xl w-full p-6 md:p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-2">
          📜 Exam Rules & Regulations
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Please read all instructions carefully before starting the exam.
        </p>

        {/* RULES BOX */}
        <div className="max-h-72 overflow-y-auto border rounded-xl p-5 space-y-5 text-sm text-gray-700 bg-gray-50">
          <Section
            icon={<AlertTriangle className="text-red-500" size={20} />}
            title="Important Instructions"
            items={[
              'Do not refresh, reload, or use the back button once the exam starts.',
              'Any form of cheating or unfair practice will result in exam cancellation.',
            ]}
          />
          <Section
            icon={<Clock className="text-blue-600" size={20} />}
            title="Time Rules"
            items={[
              'The exam will be automatically submitted once the time is over.',
              'Late submissions are not allowed under any circumstances.',
            ]}
          />
          <Section
            icon={<Monitor className="text-purple-600" size={20} />}
            title="System Rules"
            items={[
              'Switching tabs or minimizing the window may trigger warnings or auto-submission.',
              'You are strongly advised to take the exam in fullscreen mode.',
            ]}
          />
          <Section
            icon={<Wifi className="text-green-600" size={20} />}
            title="Technical Requirements"
            items={[
              'A stable internet connection is required throughout the exam.',
              'The system is not responsible for internet or power failures.',
            ]}
          />
          <Section
            icon={<ShieldCheck className="text-emerald-600" size={20} />}
            title="Academic Integrity"
            items={[
              'This exam is monitored electronically.',
              'Violation of exam policies may lead to disqualification.',
            ]}
          />
        </div>

        {/* AGREE CHECKBOX */}
        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="w-5 h-5 accent-green-600 cursor-pointer"
          />
          <label htmlFor="agree" className="text-sm text-gray-800 cursor-pointer">
            I have read and agree to all the rules and regulations
          </label>
        </div>

    
        <div className="mt-6">
          <button
            onClick={handleStartExam}
            disabled={!agree || countdown !== null} 
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 transform ${
              agree && countdown === null
                ? 'bg-gradient-to-r from-green-500 to-green-700 hover:scale-105 shadow-xl'
                : 'bg-gray-400 cursor-not-allowed opacity-70'
            }`}
          >
            {countdown !== null ? `🚀 Starting in ${countdown}...` : 'Start Exam'}
          </button>
        </div>

        
        {countdown !== null && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Stay focused. Your exam is about to begin.
          </p>
        )}
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2 font-semibold mb-2 text-gray-900">
        {icon}
        {title}
      </div>
      <ul className="list-disc pl-6 space-y-1 text-gray-700">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
