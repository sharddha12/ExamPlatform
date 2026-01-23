'use client';

import { BookOpen, Code, Cpu, UserSquare, ArrowRight } from 'lucide-react';

const subjects = [
  {
    id: 1,
    name: 'Computer Engineering',
    icon: Code,
    bgGradient: 'from-indigo-500 to-blue-500',
    studentsCount: 1200,
  },
  {
    id: 2,
    name: 'Electrical Engineering',
    icon: Cpu,
    bgGradient: 'from-purple-500 to-indigo-500',
    studentsCount: 950,
  },
  {
    id: 3,
    name: 'Civil Engineering',
    icon: UserSquare,
    bgGradient: 'from-emerald-500 to-teal-500',
    studentsCount: 800,
  },
  {
    id: 4,
    name: 'BIT',
    icon: BookOpen,
    bgGradient: 'from-pink-500 to-rose-500',
    studentsCount: 650,
  },
];

export default function EntranceList() {
  return (
    <section className="py-10 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Entrance Exams
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-14">
          Choose your faculty and start preparing for your entrance examination.
        </p>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {subjects.map((sub) => {
            const Icon = sub.icon;

            return (
              <div
                key={sub.id}
                className="relative rounded-3xl p-6 bg-white 
                           shadow-lg transition-all duration-300
                           hover:-translate-y-2 hover:shadow-2xl"
              >
                
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center 
                              bg-gradient-to-br ${sub.bgGradient} text-white mb-5`}
                >
                  <Icon className="w-7 h-7" />
                </div>

              
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {sub.name}
                </h3>

                
                <span className="text-sm text-gray-500 mb-6 block">
                  {sub.studentsCount}+ students enrolled
                </span>

                
                <div className="mt-auto flex items-center justify-between text-sm font-semibold text-indigo-600">
                  <span>View Exam</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
