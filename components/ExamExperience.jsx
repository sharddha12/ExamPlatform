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
        {/* Outer Border */}
        <div className="rounded-[3rem] bg-gradient-to-r from-blue-500  to-blue-500 p-[6px]">
          
          {/* Inner Container */}
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
            {/* Text Content */}
            <div className="max-w-4xl">
              <h2 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
                Ready to upgrade your online assessments?
              </h2>

              <p className="text-white/90 text-lg sm:text-xl font-medium leading-relaxed">
                Arrange a demo and enjoy a 14-day free trial to discover how
                Synap can streamline your online exams and courses.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <a
                href="/demo"
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
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
