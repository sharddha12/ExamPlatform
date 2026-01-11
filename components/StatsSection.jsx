'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Users, FileText, CheckCircle2 } from 'lucide-react';

export default function StatsSection() {
  const statsData = [
    { value: 8, label: 'Students Registered', icon: <Users className="w-10 h-10 text-white" /> },
    { value: 3, label: 'Faculty Members', icon: <User className="w-10 h-10 text-white" /> },
    { value: 8, label: 'Exams Conducted', icon: <FileText className="w-10 h-10 text-white" /> },
    { value: 99, label: 'Success Rate %', icon: <CheckCircle2 className="w-10 h-10 text-white" /> },
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const intervals = statsData.map((stat, idx) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const stepTime = Math.max(Math.floor(duration / end), 20);

      return setInterval(() => {
        start += 1;
        if (start > end) start = end;
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[idx] = start;
          return newCounts;
        });
      }, stepTime);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105 duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, type: 'spring', stiffness: 120 }}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-white/20 shadow-md">
                {stat.icon}
              </div>

              <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2">
                {counts[idx]}
              </h3>

              <p className="text-lg md:text-xl text-white/90 font-medium tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
