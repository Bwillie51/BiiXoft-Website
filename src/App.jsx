import React, { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import WhoWeAre from './components/sections/WhoWeAre';
import WhyUs from './components/sections/WhyUs';
import Projects from './components/sections/Projects';
import Pricing from './components/sections/Pricing';
import Reviews from './components/sections/Reviews';
import ContactForm from './components/ContactForm';
import LeaveReview from './components/LeaveReview'; // Imported your review form component
import Footer from './components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';
import whatsappIcon from './imgs/WhatsappIcon.jpg';

// Import the Animation on Scroll library and its core stylesheet
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  const [showReviewModal, setShowReviewModal] = useState(false); // Modal control state
  const phone = "6753102924";
  const message = encodeURIComponent("Hello! I visited your website and would like to know more about your services.");
  const whatsappUrl = `https://wa.me{phone}?text=${message}`;

  // Initialize animate and optimized transition parameters on mount
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: true,
      offset: 80,
      easing: 'ease-out-cubic',
    });
    AOS.refresh();
  }, []);

  // Structural window overflow hook to block dual scrollbars when form modal overlay sits active
  useEffect(() => {
    if (showReviewModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showReviewModal]);

  // src/App.jsx - Update the top-level wrapper div inside return()
// src/App.jsx - Replace the top wrapper return div with this high-contrast matrix
return (
  <div 
    className="min-h-screen text-foreground font-sans selection:bg-blue-500 selection:text-white antialiased relative overflow-x-hidden scroll-smooth"
    style={{
      backgroundColor: '#050b18', // Richer deep navy-obsidian base tone
      backgroundImage: `
        radial-gradient(circle at 95% 15%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 5% 45%, rgba(29, 78, 216, 0.22) 0%, transparent 55%),
        radial-gradient(circle at 85% 85%, rgba(255, 255, 255, 0.06) 0%, transparent 45%)
      `,
      backgroundAttachment: 'fixed'
    }}
  >
    <Navbar />
    
    <main className="space-y-0 px-0 bg-transparent pt-22">


  
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

        {/* Updated Reviews component callback handler triggers state inversion */}
        <div data-aos="fade-up">
          <Reviews onLeaveReviewClick={() => setShowReviewModal(true)} />
        </div>

        {/* FIXED: Converted background to your true corporate brand obsidian variables */}
        <div data-aos="fade-up" className="bg-background border-t border-border">
          <section id="contact" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ContactForm />
            </div>
          </section>
        </div>

      </main>

      <Footer />
      
      <Analytics />

      {/* OVERLAY MODAL SHEET INTERFACE FOR REVIEWS SUBMISSION */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-2xl border border-border/80">
            {/* Safe Structural Escape X Anchor Layout Button */}
            <button 
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border text-muted-foreground hover:text-foreground font-black text-lg transition-colors z-10"
              aria-label="Close form view"
            >
              ✕
            </button>
            
            {/* Embedded Form Component */}
            <LeaveReview onSuccessClose={() => setTimeout(() => setShowReviewModal(false), 2000)} />
          </div>
        </div>
      )}

      {/* Global Floating WhatsApp Quick Connect Button */}
      <div className="fixed bottom-6 right-6 z-50 flex">
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group relative"
          aria-label="Chat with Biixoft on WhatsApp"
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
