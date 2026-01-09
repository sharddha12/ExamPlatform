'use client';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Register Account',
      description: 'Create your account as a student or staff member with secure credentials and profile information.',
      img: 'https://img.freepik.com/premium-vector/girl-fills-out-form-concept-woman-logs-website-internet-profile-account-protection-safety-character-with-website-security-system-cartoon-flat-vector-illustration_118813-16210.jpg',
    },
    {
      number: '2',
      title: 'Access Dashboard',
      description: 'Login to your personalized dashboard to view available exams, schedules, and important notifications.',
      img: 'https://thumbs.dreamstime.com/b/flat-cartoon-vector-illustration-girl-sitting-laptop-task-list-test-screen-student-taking-exam-woman-managing-393760730.jpg',
    },
    {
      number: '3',
      title: 'Take Examination',
      description: 'Start your exam with confidence using our user-friendly interface and real-time progress tracking.',
      img: 'https://static.vecteezy.com/system/resources/previews/047/751/207/non_2x/illustration-of-a-girl-student-taking-a-test-on-a-laptop-flat-cartoon-style-online-education-and-study-back-to-school-digital-exam-setting-in-a-school-or-university-remote-learning-vector.jpg',
    },
    {
      number: '4',
      title: 'View Results',
      description: 'Get instant results with detailed analysis, performance metrics, and areas for improvement.',
      img: 'https://thumbs.dreamstime.com/b/man-reviewing-test-results-laptop-assessment-evaluation-vector-design-generative-ai-illustration-checkmarks-393178749.jpg',
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-white via-indigo-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
          How It Works
        </h2>
        <p className="text-xl text-gray-700 mb-24 max-w-3xl mx-auto">
          Simple steps to get started with online examinations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connecting Arrows (visible on md+) */}
          <div className="hidden md:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-indigo-300 to-purple-300 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-12 h-12 rotate-45 bg-gradient-to-r from-indigo-300 to-purple-300 -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-12 h-12 rotate-45 bg-gradient-to-r from-indigo-300 to-purple-300 -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-12 h-12 rotate-45 bg-gradient-to-r from-indigo-300 to-purple-300 -translate-x-1/2"></div>
          </div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative flex flex-col items-center transform transition-all duration-500 hover:scale-110 hover:z-10"
            >
              {/* Illustration */}
              <div className="mb-10 overflow-hidden rounded-3xl shadow-2xl bg-white p-6 group-hover:shadow-3xl transition-shadow">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-64 object-contain rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Number Circle */}
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-xl opacity-60 group-hover:opacity-90 transition"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center text-white text-4xl font-extrabold shadow-2xl">
                  {step.number}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-indigo-600 transition">
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