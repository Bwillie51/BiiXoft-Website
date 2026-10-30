import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import WhoWeAre from './components/sections/WhoWeAre';
import WhyUs from './components/sections/WhyUs';
import Projects from './components/sections/Projects';
import Pricing from './components/sections/Pricing';
import Reviews from './components/sections/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';
import whatsappIcon from './imgs/WhatsappIcon.jpg';

// Import the Animation on Scroll library and its core stylesheet
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  const phoneNumber = "67531862924";
  const message = encodeURIComponent("Hello! I visited your website and would like to know more about your services.");
  const whatsappUrl = `https://wa.me{phoneNumber}?text=${message}`;

  // Initialize snappy and optimized transition parameters on mount
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 80, // Lowered offset to trigger animations smoothly without layout lag
      easing: 'ease-out-cubic',
    });
    
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white antialiased relative overflow-x-hidden scroll-smooth">
      <Navbar />

      {/* 📊 CLEAN INTEGRATED CONTENT FEED MATRIX */}
      {/* Removed "py-28 md:py-36" wrapper layout blocks entirely to close the huge spacing gaps */}
      <main className="space-y-0 px-0">
        
        <div data-aos="fade-zoom-in" data-aos-duration="1000">
          <Hero />
        </div>

        <div data-aos="fade-up">
          <WhoWeAre />
        </div>

        <div data-aos="fade-up">
          <WhyUs />
        </div>

        <div data-aos="fade-up">
          <Projects />
        </div>

        <div data-aos="fade-up">
          <Pricing />
        </div>

        <div data-aos="fade-up">
          <Reviews />
        </div>

        <div data-aos="fade-up">
          <section id="contact" className="bg-slate-50 border-t border-slate-200/60 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ContactForm />
            </div>
          </section>
        </div>
        
      </main>

      <Footer />
      <Analytics />

      {/* Global Floating WhatsApp Quick Connect Button Option */}
      <div className="fixed bottom-6 right-6 z-50 flex">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group relative"
          aria-label="Chat with BiiXoft on WhatsApp"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none pointer-events-none" />
          <img
            src={whatsappIcon}
            alt="WhatsApp Connect"
            className="h-9 w-9 object-contain rounded-full relative z-10"
          />
        </a>
      </div>
    </div>
  );
}
