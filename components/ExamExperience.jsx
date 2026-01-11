'use client';

import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto px-4 sm:px-6"
      >
        {/* Heading */}
        <motion.h2
          initial={{ y: -5 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-cyan-200 mb-4 leading-tight"
        >
          Ready to Transform Your Examination Experience?
        </motion.h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 leading-relaxed font-medium">
          Join thousands of students and educators who trust our platform for secure, smooth, and efficient online examinations.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-blue-700 font-bold text-base sm:text-lg rounded-full shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300"
          >
            Sign Up Now
          </a>

          <a
            href="/signin"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white font-bold text-base sm:text-lg rounded-full hover:bg-white/10 hover:scale-105 transition transform duration-300"
          >
            Sign In
          </a>
        </div>
      </motion.div>
    </section>
  );
}
