'use client';

export default function AboutUs() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-12">
          About Us
        </h2>

        {/* Mission Statement */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto mb-16 leading-relaxed">
          Our mission is to revolutionize online assessments by providing a platform that is both powerful and easy to use. We bring together educators and students in a secure, real-time environment.
        </p>

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto text-left">
          {/* Left Column */}
          <div className="space-y-6">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Founded in 2026, Online Examination System has been at the forefront of e-assessment technology. With innovations in proctoring, instant analytics, and mobile compatibility, we have served thousands of institutions across the globe.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Our core values—security, reliability, and user-centric design—drive every feature we build. From seamless integration with existing databases to customizable exam workflows, we work closely with educational institutions to tailor the experience to their exact needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}