'use client';

import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto"
      >
        <div className="rounded-[3rem] bg-gradient-to-r from-blue-500 to-blue-500 p-[6px]">
          <div
            className="
              rounded-[2.7rem]
              bg-gradient-to-r from-blue-500 to-blue-600
              px-10 py-12
              sm:px-14 sm:py-16
              flex flex-col lg:flex-row
              items-start lg:items-center
              justify-between
              gap-10
            "
          >
            <div className="max-w-4xl">
              <h2 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
                Experience the Future of Online Examinations
              </h2>

              <p className="text-white/90 text-lg sm:text-xl font-medium leading-relaxed">
                Join thousands of educators and students who trust our platform
                for secure, efficient, and engaging online exams.
              </p>
            </div>

            <div className="flex-shrink-0">
              {/* Take Exam → Login */}
              <a
                href="/student/login"
                className="
                  inline-flex items-center justify-center
                  bg-pink-50
                  text-pink-600
                  font-bold
                  text-lg
                  px-10 py-5
                  rounded-2xl
                  shadow-lg
                  hover:shadow-xl
                  hover:scale-105
                  transition-all duration-300
                "
              >
                Take Exam
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
