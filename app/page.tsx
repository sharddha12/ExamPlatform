'use client';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import EntranceList from '../components/EntranceList';
import HowItWorksSection from '../components/WorksSection';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import ExamExperience from '../components/ExamExperience';

import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';



export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <EntranceList />  
      <HowItWorksSection />
      <FeaturesSection />

      <StatsSection />
      <ExamExperience />
      <Testimonials />
      <AboutUs />
      
      <Footer />
    </div>
  );
}
