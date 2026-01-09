'use client';

export default function CallToAction() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Beautiful Purple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 md:mb-6 leading-tight drop-shadow-2xl">
          Ready to Transform Your Examination Experience?
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 md:mb-12 max-w-4xl mx-auto">
          Join thousands of students and educators who trust our platform for secure, efficient online examinations.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Sign Up Now Button */}
          <a
            href="/signup"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-700 font-bold text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition transform duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v1z" />
            </svg>
            Sign Up Now
          </a>

          {/* Sign In Button */}
          <a
            href="/signin"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Sign In
          </a>
        </div>
      </div>
    </section>
  );
}