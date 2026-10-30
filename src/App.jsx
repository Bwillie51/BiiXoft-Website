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

// 🔮 Import the Animation on Scroll library and its core stylesheet
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  const phoneNumber = "67531862924";
  const message = encodeURIComponent("Hello! I visited your website and would like to know more about your services.");
  const whatsappUrl = `https://wa.me{phoneNumber}?text=${message}`;

  // 🔄 Initialize high-visibility animation parameters on layout mount
  useEffect(() => {
    AOS.init({
      duration: 1400,            // Takes 1.4 seconds for an ultra-smooth, slow-dissolve entrance
      once: false,               // Re-animates continuously when scrolling up or down
      mirror: true,              // Forces identical transitions on reverse scrolling
      offset: 250,               // Triggers the dissolve 250px early to stay blurry/faded near screen edges
      easing: 'ease-out-quint',  // Smooth cinematic deceleration motion curve
    });
    
    // Explicit refresh to force recalculation of layout nodes across varying aspect ratios
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white antialiased relative overflow-x-hidden scroll-smooth">
      <Navbar />

      {/* 📊 DUAL-DIRECTIONAL HIGH-VISIBILITY SCROLL ANCHORS */}
      {/* Added substantial responsive padding clusters (py-28) to give each section clear breathing room to fade */}
      <main className="space-y-0 px-0">
        
        {/* Hero section renders instantly on top-level initialization */}
        <div data-aos="fade-zoom-in" data-aos-duration="1000">
          <Hero />
        </div>

        {/* Following sections fade from deep blur to crisp clarity on all devices */}
        <div className="py-28 md:py-36 w-full" data-aos="fade-zoom-in" data-aos-anchor-placement="top-bottom">
          <WhoWeAre />
        </div>

        <div className="py-28 md:py-36 w-full" data-aos="fade-zoom-in" data-aos-anchor-placement="top-bottom">
          <WhyUs />
        </div>

        <div className="py-28 md:py-36 w-full" data-aos="fade-zoom-in" data-aos-anchor-placement="top-bottom">
          <Projects />
        </div>

        <div className="py-28 md:py-36 w-full" data-aos="fade-zoom-in" data-aos-anchor-placement="top-bottom">
          <Pricing />
        </div>

        <div className="py-28 md:py-36 w-full" data-aos="fade-zoom-in" data-aos-anchor-placement="top-bottom">
          <Reviews />
        </div>

        <div className="py-28 md:py-36 w-full" data-aos="fade-zoom-in" data-aos-anchor-placement="top-bottom">
          <section id="contact" className="bg-slate-50 border-t border-slate-200/60 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ContactForm />
            </div>
          </section>
        </div>
        
      </main>

      <Footer />
      <Analytics />

      {/* 💬 Global Floating WhatsApp Button Container */}
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
