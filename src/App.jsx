import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import WhoWeAre from './components/sections/WhoWeAre';
import WhyUs from './components/sections/WhyUs';
import Projects from './components/sections/Projects';
import Pricing from './components/sections/Pricing';
import Reviews from './components/sections/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/layout/Footer'; // <-- 1. Import your premium new file!

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white antialiased">
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

      {/* 2. Swapped out the old code line layout with the comprehensive footer block */}
      <Footer />
    </div>
  );
}
