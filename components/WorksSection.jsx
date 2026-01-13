'use client';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Register Account',
      description: 'Create your account as a student or staff member with secure credentials and profile information.',
      img: 'image1.jpg',
    },
    {
      number: '2',
      title: 'Access Dashboard',
      description: 'Login to your personalized dashboard to view available exams, schedules, and important notifications.',
      img: 'image2.jpg',
    },
    {
      number: '3',
      title: 'Take Examination',
      description: 'Start your exam with confidence using our user-friendly interface and real-time progress tracking.',
      img: 'image3.jpg',
    },
    {
      number: '4',
      title: 'View Results',
      description: 'Get instant results with detailed analysis, performance metrics, and areas for improvement.',
      img: 'image4.jpg ',
    },
  ];

  return (
    <section  id ="how-it-works" className="py-12 bg-gradient-to-b from-white via-indigo-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-xl text-gray-700 mb-24 max-w-3xl mx-auto">
          Simple steps to get started with online examinations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative flex flex-col items-center transform transition-all duration-500 hover:scale-110 hover:z-10"
            >
              
              <div className="absolute top-0 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 opacity-20 blur-3xl group-hover:opacity-40 transition-all duration-500"></div>

              
              <div className="mb-10 overflow-hidden rounded-3xl shadow-2xl bg-white p-6 group-hover:shadow-3xl transition-shadow transform group-hover:-translate-y-2 group-hover:scale-105 duration-500">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-64 object-contain rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-xl opacity-60 group-hover:opacity-90 transition duration-500"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center text-white text-4xl font-extrabold shadow-2xl">
                  {step.number}
                </div>
              </div>

              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-indigo-600 transition-colors duration-500">
                {step.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed max-w-sm px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
