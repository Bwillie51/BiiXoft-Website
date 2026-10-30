import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import biixoftCover from '../../imgs/BiixoftCover.jpeg';
import { sanityClient } from '@/lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Hero() {
  const [cmsData, setCmsData] = useState(null);

    useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // ✅ CHANGED: Added [0] to extract the first singular document directly from the dataset list
        const data = await sanityClient.fetch(`*[_type == "heroSection"][0]`);
        if (data) setCmsData(data);
      } catch (error) {
        console.warn("Sanity Hero fetch query unconfigured. Using defaults.", error);
      }
    };
    fetchHeroData();
  }, []);


  const activeBgImage = cmsData?.backgroundImage ? urlFor(cmsData.backgroundImage).url() : biixoftCover;

  return (
    <section id="home" className="relative bg-white w-full overflow-hidden border-b border-slate-100 min-h-none lg:min-h-[85vh] flex lg:items-center">
      
      {/* 🖼️ INTEGRATED BACKGROUND GRAPHIC LAYER */}
      {/* Mobile/Tablet: Anchored as a standalone banner. Desktop: Full-bleed background */}
      <div className="absolute top-0 inset-x-0 h-[40vh] sm:h-[45vh] lg:h-full lg:inset-0 z-0 select-none pointer-events-none">
        <img 
          src={activeBgImage} 
          alt="BiiXoft Service Banner Backdrop" 
          className="w-full h-full object-cover object-center lg:object-left-top"
          loading="eager"
        />
        
        {/* 📱 Mobile-Only Smooth Bottom Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent lg:hidden block" />
        
        {/* 🖥️ DESKTOP ONLY: High-Contrast Layout Mask (Left side clear, right side fades to white for text) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-white" />
        <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4)_78%,rgba(255,255,255,0.7)_50%,#fff_90%)]" />
        {/* <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" /> */}
      </div>

      {/* 🌊 RESTORED: The Original Wavy Curvy Bottom Divider Line (Hidden on Desktop) */}
      <div className="absolute top-[36vh] sm:top-[41vh] inset-x-0 w-full flex justify-center lg:hidden z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 220"
          xmlns="http://w3.org"
          className="w-full h-auto text-white fill-current translate-y-px"
          preserveAspectRatio="none"
        >
          <path d="M 0,220 L1440,220 L1440,80 C1200,80 1260,20 1000,20 C 620,20 660,60 0,60 Z" />
        </svg>
      </div>

      {/* 📊 MAIN CONTENT GRID PLATFORM */}
      {/* Uses pt-[38vh] on mobile to prevent clipping the image, and justify-end on desktop to slide text to the right */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-[38vh] sm:pt-[43vh] lg:py-24 pb-16 relative z-10 flex justify-center lg:justify-end">
        
        {/* Typography Content Wrapper */}
        <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start lg:pl-12 bg-white lg:bg-transparent px-2 sm:px-6 lg:px-0 rounded-3xl">
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 mb-6 select-none shadow-sm animate-pulse">
            ✨ Transform Your Online Presence
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.15]">
            The Face of Your Business in <br className="hidden sm:block"/>
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Today's Digital World
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mb-10 leading-relaxed font-semibold">
            At BiiXoft, we build modern, high-performing websites designed to help your brand grow, engage customers, and stand out. Whether you need a sleek custom design or a site you can easily manage yourself, we deliver tailored solutions built for results.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-blue-600/10 transition-all duration-200 hover:-translate-y-0.5 border-none text-sm">
              <a href="#contact">Build Your New Website</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold px-8 py-6 rounded-xl transition-all text-sm">
              <a href="#who-we-are">Explore Our Services</a>
            </Button>
          </div>

        </div>
      </div>

    </section>
  );
}
