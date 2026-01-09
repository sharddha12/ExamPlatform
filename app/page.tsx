'use client';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/WorksSection';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import ExamExperience from '../components/ExamExperience';
import AboutUs from '../components/AboutUs';


export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <ExamExperience />
      <AboutUs />
      
      <Footer />
    </div>
  );
}
