import React from 'react';
import { Button } from '@/components/ui/button';
import biixoftCover from '../../imgs/BWillie.jpeg';

export default function Hero() {
  return (
    <section id="home" className="relative bg-white w-full min-h-[85vh] flex items-center overflow-hidden border-b border-slate-100">
      
      {/* 🖼️ Sharp, High-Contrast Left Side Background Image Container */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 pointer-events-none z-0 overflow-hidden select-none">
        <div 
          className="w-full h-full bg-cover bg-[left_top_-30px] sm:bg-[left_top_-50px] md:bg-center opacity-75 lg:opacity-100 transition-all duration-300" 
          style={{ backgroundImage: `url(${biixoftCover})` }}
        />
        {/* Horizontal Linear Mask: Clear on the far left, smoothly dropping to solid white before touching the text columns */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white lg:via-white/10 lg:to-white" />
        
        {/* Radial Overlay Mask: Hides busy top-left background details while keeping the graphic structure visible */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.0)_100%,rgba(255,255,255,0.8)_80%,#fff_100%)]" />
        
        {/* Bottom vertical feather blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>
      
      {/* 📊 Content Core Grid: Moves content to the right on large viewports */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex justify-end relative z-10">
        
        {/* Right Columns Container Frame */}
        <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start lg:pl-8">
          
          {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 mb-6 shadow-sm select-none">
            Get your Business Transformed!
          </span>
           */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.15]">
            The Face of Your Business in <br className="hidden sm:block"/>
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Today's Digital World
            </span>
          </h1>
          
          {/* Enhanced readability paragraph treatment */}
          <div className="bg-white/90 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-5 lg:p-0 rounded-2xl border border-slate-200/40 lg:border-none mb-10 max-w-xl shadow-sm lg:shadow-none">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
              At BiiXoft, we build modern, high-performing websites designed to help your brand grow, 
              engage customers, and stand out. Whether you need a sleek custom design or a site you 
              can easily manage yourself, we deliver tailored solutions built for results.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-blue-600/10 transition-all duration-200 hover:-translate-y-0.5 border-none">
              <a href="#contact">Build Your New Website</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold px-8 py-6 rounded-xl transition-all">
              <a href="#who-we-are">Explore Our Services</a>
            </Button>
          </div>

        </div>
      </div>

    </section>
  );
}
