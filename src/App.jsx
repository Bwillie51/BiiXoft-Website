import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import WhoWeAre from './components/sections/WhoWeAre';
import WhyUs from './components/sections/WhyUs';
import Projects from './components/sections/Projects';
import Pricing from './components/sections/Pricing';
import Reviews from './components/sections/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/layout/Footer';

// 1. Import your WhatsApp image from your src/imgs folder
import whatsappIcon from './imgs/WhatsappIcon.jpg';

export default function App() {
  // 2. Setup your WhatsApp details
  const phoneNumber = "67581862924"; 
  const message = encodeURIComponent("Hello! I visited your website and would like to know more about your services.");
  
  // FIXED LINE: Added the required forward slash and the dollar sign ($) for JavaScript evaluation
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white antialiased relative">
      <Navbar />

      <main>
        <Hero />
        <WhoWeAre />
        <WhyUs />
        <Projects />
        <Pricing />
        <Reviews />

        <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />

      {/* 3. Global Floating WhatsApp Button */}
      <a 
        href={whatsappUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-2xl"
        aria-label="Chat on WhatsApp"
      >
        <img 
          src={whatsappIcon} 
          alt="WhatsApp" 
          className="h-9 w-9 object-contain rounded-full" 
        />
      </a>
    </div>
  );
}
