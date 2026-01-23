'use client';

import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Saru Sapkota',
    position: 'Student',
    photo: 'image5.jpg',
    feedback: 'This platform made my entrance exam preparation so much easier and efficient!',
  },
  {
    id: 2,
    name: 'Ram Thapa',
    position: 'CSIT Faculty',
    photo: 'image5.jpg',
    feedback: 'A modern and intuitive interface. I love how easy it is for students to attempt exams online.',
  },
  {
    id: 3,
    name: 'Mina Sharma',
    position: 'Student',
    photo: 'image5.jpg',
    feedback: 'Instant results and detailed feedback helped me improve a lot in a short time.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-2 border-indigo-500 object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{t.name}</h3>
                  <p className="text-indigo-500 text-sm">{t.position}</p>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed relative">
                <FaQuoteLeft className="inline text-indigo-300 mr-2" />
                {t.feedback}
                <FaQuoteRight className="inline text-indigo-300 ml-2" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
