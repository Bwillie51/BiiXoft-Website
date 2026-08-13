import React from 'react';
import { Button } from '@/components/ui/button';
import biixoftCover from '../../imgs/BiixoftCover.jpeg';

export default function Hero() {
  return (
    <section id="home" className="relative bg-[#f9f8f6] lg:bg-white w-full min-h-[85vh] flex flex-col lg:flex-row lg:items-center overflow-hidden border-b border-slate-100">
      
      {/* 🖼️ Mobile Top Image / Desktop Left Side Background Container */}
      <div className="relative w-full h-[45vh] sm:h-[55vh] lg:h-full lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 pointer-events-none z-0 overflow-hidden select-none shrink-0">
        <div 
          className="w-full h-full bg-cover bg-center lg:bg-[left_top_-30px] transition-all duration-300" 
          style={{ backgroundImage: `url(${biixoftCover})` }}
        />
        
        {/* 🏔️ Stylish Curved Pointer / Wave Overlay (Screenshot Match) */}
        <div className="absolute inset-x-0 bottom-[-1px] w-full flex justify-center lg:hidden">
          <svg 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://w3.org" 
            className="w-full h-[40px] drop-shadow-[0_-2px_3px_rgba(0,0,0,0.03)]"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,120 L1440,120 L1440,60 C1000,60 820,0 720,0 C620,0 440,60 0,60 Z" 
              fill="#f9f8f6" 
            />
          </svg>
        </div>

        {/* Desktop-only Masks (Hidden on Mobile) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white" />
        <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.0)_100%,rgba(255,255,255,0.8)_80%,#fff_100%)]" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>
      
      {/* 📊 Content Core Container */}
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-8 py-12 sm:py-16 lg:py-24 flex justify-end relative z-10 bg-[#f9f8f6] lg:bg-transparent">
        
        {/* Typography and Actions Frame */}
        <div className="w-full lg:w-1/2 text-left flex flex-col items-start lg:pl-8">
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-5 leading-[1.2] lg:leading-[1.15]">
            The Face of Your Business in <br className="hidden sm:block"/>
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent lg:text-inherit lg:bg-none lg:text-blue-600">
              Today's Digital World
            </span>
          </h1>
          
          {/* Enhanced readability paragraph treatment */}
          <div className="p-0 bg-transparent rounded-none border-none mb-8 max-w-xl">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal lg:font-semibold">
              At BiiXoft, we build modern, high-performing websites designed to help your brand grow, 
              engage customers, and stand out. Whether you need a sleek custom design or a site you 
              can easily manage yourself, we deliver tailored solutions built for results.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-blue-600/10 transition-all duration-200 border-none">
              <a href="#contact">Build Your New Website</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-slate-200 bg-white lg:bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold px-8 py-6 rounded-xl transition-all">
              <a href="#who-we-are">Explore Our Services</a>
            </Button>
          </div>

        </div>
      </div>

    </section>
  );
}
