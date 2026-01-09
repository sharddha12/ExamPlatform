'use client';

export default function StatsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-pink-600 via-pink-700 to-pink-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          
          {/* Students Registered */}
          <div>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
              8
            </h3>
            <p className="text-lg md:text-xl text-white/90 font-medium">
              Students Registered
            </p>
          </div>

          {/* Faculty Members */}
          <div>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
              3
            </h3>
            <p className="text-lg md:text-xl text-white/90 font-medium">
              Faculty Members
            </p>
          </div>

          {/* Exams Conducted */}
          <div>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
              8
            </h3>
            <p className="text-lg md:text-xl text-white/90 font-medium">
              Exams Conducted
            </p>
          </div>

          {/* Success Rate */}
          <div>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
              99
            </h3>
            <p className="text-lg md:text-xl text-white/90 font-medium">
              Success Rate %
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
