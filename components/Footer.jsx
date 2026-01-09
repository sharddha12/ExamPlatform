'use client';

import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#14212b] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div className="space-y-6">
          <h2 className="text-white text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">🎓</span> Exam Platform 
          </h2>
          <p className="text-sm leading-relaxed">
            Empowering education through secure, reliable, and user-friendly online examination solutions.
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="bg-sky-500 p-3 rounded-full hover:bg-sky-600 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="bg-blue-700 p-3 rounded-full hover:bg-blue-800 transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Features</a></li>
            <li><a href="#" className="hover:text-white transition">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-6">Support</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-6">Contact Info</h3>
          <div className="space-y-5 text-sm">
            <p className="flex items-start gap-3">
              <MapPin size={20} className="mt-0.5 flex-shrink-0" />
              <span>123 Main Street, City, Country</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone size={20} />
              <span>+91 123 456 789</span>
            </p>
            <p className="flex items-center gap-3">
              <Mail size={20} />
              <span>support@onlinexam.com</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}