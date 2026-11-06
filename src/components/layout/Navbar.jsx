import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import logo from '../../imgs/PlainLogo.jpeg';

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

  // Intersection Observer API to detect active section on scroll
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
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/5 shadow-xl transition-all duration-300 bg-[#060a17]/95 backdrop-blur-md bg-gradient-to-l from-white/[0.04] via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-22 flex items-center justify-between relative">

        
        {/* Left Side: Brand Logo Cluster */}
        <div 
          className="flex items-center space-x-2 sm:space-x-3 shrink-0 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl overflow-hidden shadow-md shadow-primary/10 border border-border bg-card group-hover:scale-105 group-hover:border-primary transition-all duration-300">
            <img 
              src={logo} 
              alt="BiiXoft Official Logo" 
              className="w-full h-full object-cover select-none"
            />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground select-none group-hover:opacity-90 transition-opacity">
            Bii<span className="text-primary group-hover:text-primary/90 transition-colors">X</span>oft
          </span>
          {/* Vertical Spacer Bar Layer */}
          <div className="h-5 w-px bg-border mx-4 hidden lg:block" />
        </div>

        {/* Middle Space: Universal Pulsing Availability Status Bar Badge */}
        <div className="flex items-center space-x-1.5 bg-card border border-border px-2.5 py-1 rounded-full shadow-inner select-none mx-2 sm:mx-auto animate-pulse-slow">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[9px] sm:text-[11px] font-bold tracking-wider text-muted-foreground uppercase whitespace-nowrap">
            <span className="inline sm:hidden">Accepting Projects</span>
            <span className="hidden sm:inline">Accepting New Projects</span>
          </span>
        </div>

        {/* Right Side: Desktop-Only Link Matrix (Hides below 1024px screen widths via lg:flex) */}
        <div className="hidden lg:flex items-center space-x-2 text-sm font-bold text-muted-foreground shrink-0">
          <div className="h-5 w-px bg-border mx-4">
            {/* I Just need a light to appear here */}
            <div className="w-2 h-2 bg-primary rounded-full" />
            <logo className="w-2 h-2 bg-primary rounded-full" />
          </div>
          </div>
        {/* Right Side: Desktop-Only Link Matrix (Hides below 1024px screen widths via lg:flex) */}
        <nav className="hidden lg:flex items-center space-x-2 text-sm font-bold text-muted-foreground shrink-0">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={`relative px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 group ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'hover:text-foreground hover:bg-card'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full transition-all duration-200 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100'
                }`} />
              </a>
            );
          })}

          <div className="h-5 w-px bg-border mx-4" />

          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold rounded-xl px-6 py-5 shadow-lg shadow-primary/10 border-none transition-all duration-200 hover:-translate-y-0.5">
            <a href="#contact">Contact Us</a>
          </Button>
        </nav>

        {/* Mobile & Tablet Hamburger Trigger (Hides on desktop screens via lg:hidden) */}
        <div className="flex items-center lg:hidden shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-muted-foreground hover:text-foreground p-2.5 rounded-xl transition-all duration-200 focus:outline-none hover:bg-card"
            aria-label="Toggle Dynamic Navigation Menu"
          >
            <svg className="w-6 h-6 transition-transform duration-300 fill-none stroke-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile & Tablet Dropdown Drawer Expansion Box */}
      <div className={`lg:hidden bg-card/95 backdrop-blur-lg overflow-hidden transition-all duration-300 ease-in-out border-b border-border ${
        isOpen ? 'max-h-[480px] opacity-100 border-t' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
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
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          
          <div className="pt-2 px-2">
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl py-6 shadow-md shadow-primary/10 border-none text-base">
              <a href="#contact" onClick={() => setIsOpen(false)}>Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
