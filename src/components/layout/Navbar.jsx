import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from '../../imgs/PlainLogo.jpeg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Who We Are', href: '#who-we-are', id: 'who-we-are' },
    { label: 'Why BiiXoft', href: '#why-us', id: 'why-us' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Ecosystem Pricing', href: '#pricing', id: 'pricing' },
    { label: 'Feedbacks', href: '#reviews', id: 'reviews' },
  ];

  // 🔄 Intersection Observer API to detect active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/50 w-full transition-all duration-300 shadow-sm shadow-slate-100/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-22 flex items-center justify-between relative">
        
        {/* 🚀 Left Side: Brand Logo Cluster */}
        <div 
          className="flex items-center space-x-2 sm:space-x-3.5 shrink-0 group cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden shadow-md shadow-blue-500/10 border-2 border-white bg-white group-hover:scale-105 group-hover:border-blue-500/20 transition-all duration-300">
            <img 
              src={Logo} 
              alt="BiiXoft Official Logo" 
              className="w-full h-full object-cover select-none"
            />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 select-none group-hover:opacity-90 transition-opacity">
            Bii<span className="text-blue-600 transition-colors group-hover:text-blue-500">X</span>oft
          </span>
        </div>

        {/* 🟢 Middle Space: Universal Pulsing Availability Status Bar Badge */}
        {/* Fully visible on mobile phones, tablets, and wide desktop screens */}
        <div className="flex items-center space-x-1.5 bg-blue-50/80 border border-blue-100/60 px-2.5 py-1 rounded-full shadow-inner select-none mx-2 sm:mx-auto animate-pulse z-20 shrink-0">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] sm:text-[11px] font-bold tracking-wider text-slate-700 uppercase whitespace-nowrap">
            <span className="inline sm:hidden">Accepting Projects</span>
            <span className="hidden sm:inline">Accepting New Projects</span>
          </span>
        </div>

        {/* 🖥️ Right Side: Desktop-Only Link Matrix (Hides below 1024px screen widths via lg:flex) */}
        <nav className="hidden lg:flex items-center space-x-2 text-sm font-bold text-slate-600 shrink-0">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={() => setActiveSection(link.id)}
                className={`relative px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 group ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50/60' 
                    : 'hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full transition-all duration-200 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100'
                }`} />
              </a>
            );
          })}
          
          <div className="h-5 w-px bg-slate-200 mx-4" />

          <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 py-5 font-bold shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 shrink-0 border-none">
            <a href="#contact">Contact Us</a>
          </Button>
        </nav>

        {/* 📱 Mobile & Tablet Hamburger Trigger (Hides on desktop screens via lg:hidden) */}
        <div className="flex items-center lg:hidden shrink-0">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`text-slate-500 hover:text-slate-900 p-2 sm:p-2.5 rounded-xl transition-all duration-200 focus:outline-none ${isOpen ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-50'}`}
            aria-label="Toggle Dynamic Navigation Menu"
          >
            <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 📱 Mobile & Tablet Dropdown Drawer Expansion Box */}
      <div className={`lg:hidden bg-white/95 backdrop-blur-lg overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[450px] opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 space-y-1.5 max-w-xl mx-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={() => {
                  setActiveSection(link.id);
                  setIsOpen(false);
                }}
                className={`block font-bold text-base px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50/60' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-2 px-2">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-6 font-bold shadow-md shadow-blue-600/10 border-none text-base">
              <a href="#contact" onClick={() => setIsOpen(false)}>Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
