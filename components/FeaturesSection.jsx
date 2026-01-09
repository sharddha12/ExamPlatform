'use client'
import { motion } from 'framer-motion'
import { Lock, Clock, TrendingUp, Users, Smartphone, Settings } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      title: 'Secure & Reliable',
      desc: 'Advanced security measures ensure exam integrity with encrypted data transmission and secure user authentication.',
      icon: <Lock className="w-8 h-8 text-white" />,
      bg: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    },
    {
      title: 'Real-time Monitoring',
      desc: 'Live exam monitoring with automatic time tracking, progress indicators, and instant submission capabilities.',
      icon: <Clock className="w-8 h-8 text-white" />,
      bg: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    },
    {
      title: 'Instant Results',
      desc: 'Get immediate feedback with automated grading, detailed analytics, and comprehensive performance reports.',
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      bg: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    },
    {
      title: 'Multi-User Support',
      desc: 'Separate dashboards for students and staff with role-based access control and personalized experiences.',
      icon: <Users className="w-8 h-8 text-white" />,
      bg: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    },
    {
      title: 'Mobile Friendly',
      desc: 'Responsive design ensures seamless exam experience across all devices - desktop, tablet, and mobile.',
      icon: <Smartphone className="w-8 h-8 text-white" />,
      bg: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    },
    {
      title: 'Easy Management',
      desc: 'Intuitive admin panel for creating exams, managing questions, and analyzing student performance effortlessly.',
      icon: <Settings className="w-8 h-8 text-white" />,
      bg: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    },
  ]

  return (
    <section className="py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6 sm:mb-10">Why Choose Our Platform?</h2>
      <p className="text-gray-600 text-center text-lg sm:text-xl mb-16 max-w-2xl mx-auto">
        Discover the powerful features that make online examinations seamless and secure
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="p-10 sm:p-12 bg-white rounded-3xl shadow-md border hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, type: 'spring', stiffness: 100 }}
          >
            {/* Icon */}
            <div className={`w-20 h-20 mb-6 mx-auto flex items-center justify-center rounded-full ${feature.bg}`}>
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-center mb-4">{feature.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-center text-base sm:text-lg leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
