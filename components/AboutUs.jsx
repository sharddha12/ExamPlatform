'use client';

import Image from 'next/image';

export default function AboutUs() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Side - Image */}
          <div className="relative w-full h-80 sm:h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/close.jpg"
              alt="About Us"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
              About Us
            </h2>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-justify">
              We are transforming online learning in Nepal with a secure, interactive, and easy-to-use platform that connects students and educators seamlessly.
            </p>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-justify">
              Our platform provides innovative e-assessment solutions that empower students and educators to achieve their academic goals efficiently. By leveraging modern technology, we ensure a smooth, reliable, and secure online learning experience.
            </p>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-justify">
              Since 2026, we have supported thousands of students across Nepal, helping them excel in examinations and build confidence in their learning journey. Our mission is to continuously innovate and provide tools that enhance both teaching and learning outcomes.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
