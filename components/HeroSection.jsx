'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-700 to-purple-600 overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-indigo-500 rounded-full opacity-30 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-36 h-36 bg-purple-500 rounded-full opacity-20 animate-pulse blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-blue-400 opacity-15 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-14 z-10">
        {/* Text Content */}
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-left max-w-xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6">
            Revolutionize <br />
            <span className="text-yellow-400">Your Exams</span> <br />
            Online
          </h1>

          <p className="text-white/90 text-lg sm:text-xl mb-8">
            Secure, fast, and interactive online exams at your fingertips. 
            Take tests, track performance, and excel with ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/student/login"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-yellow-400 text-purple-900 font-semibold rounded-full shadow-xl hover:shadow-yellow-500/50 transition"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.a>

           
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="lg:w-1/2 flex justify-center"
        >
          <div
            className="
              relative
              w-[24rem] h-[18rem]
              sm:w-[30rem] sm:h-[22rem]
              lg:w-[38rem] lg:h-[28rem]
              xl:w-[44rem] xl:h-[32rem]
              rounded-[2.5rem]
              overflow-hidden
              shadow-[0_30px_80px_rgba(0,0,0,0.45)]
              bg-white/10
              backdrop-blur-md
            "
          >
            <img
              src="/space.jpg"
              alt="Online Exam Platform"
              className="w-full h-full object-cover"
            />

            <div className="absolute top-6 right-6 bg-purple-600/90 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce shadow-lg">
              New Exam Available
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
