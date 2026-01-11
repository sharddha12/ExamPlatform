'use client'
import { motion } from 'framer-motion'
import { Lock, Clock, TrendingUp, Users, Smartphone, Settings } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      title: 'Secure & Reliable',
      desc: 'Advanced security measures ensure exam integrity with encrypted data transmission and secure user authentication.',
      icon: <Lock className="w-10 h-10 text-purple-600" />,
    },
    {
      title: 'Real-time Monitoring',
      desc: 'Live exam monitoring with automatic time tracking, progress indicators, and instant submission capabilities.',
      icon: <Clock className="w-10 h-10 text-purple-600" />,
    },
    {
      title: 'Instant Results',
      desc: 'Get immediate feedback with automated grading, detailed analytics, and comprehensive performance reports.',
      icon: <TrendingUp className="w-10 h-10 text-purple-600" />,
    },
    {
      title: 'Multi-User Support',
      desc: 'Separate dashboards for students and staff with role-based access control and personalized experiences.',
      icon: <Users className="w-10 h-10 text-indigo-600" />,
    },
    {
      title: 'Mobile Friendly',
      desc: 'Responsive design ensures seamless exam experience across all devices - desktop, tablet, and mobile.',
      icon: <Smartphone className="w-10 h-10 text-indigo-600" />,
    },
    {
      title: 'Easy Management',
      desc: 'Intuitive admin panel for creating exams, managing questions, and analyzing student performance effortlessly.',
      icon: <Settings className="w-10 h-10 text-indigo-600" />,
    },
  ]

  return (
    <section id ="features" className="py-24 bg-gradient-to-b from-white via-indigo-50 to-purple-50">
        {/* Heading */}
             <div className="max-w-7xl mx-auto px-6 text-center">
 

<h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Why Choose Our Platform?
        </h2>

        <p className="text-gray-500 text-center text-lg sm:text-xl mb-16 max-w-2xl mx-auto">
          Discover the powerful features that make online examinations seamless and secure
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative p-8 sm:p-10 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, type: 'spring', stiffness: 120 }}
            >
              {/* Icon with gradient hover */}
              <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-gray-100 shadow-md group-hover:bg-gradient-to-br group-hover:from-indigo-100 group-hover:via-purple-100 group-hover:to-indigo-200 transition-all duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-2xl font-semibold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {feature.desc}
              </p>

              {/* Decorative gradient blur circle */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-30 blur-3xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
