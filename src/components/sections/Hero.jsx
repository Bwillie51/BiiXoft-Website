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
        // 🔄 FIXED: Added [0] to extract the first singular active content entry from the Sanity dataset list array
        const data = await sanityClient.fetch(`*[_type == "heroSection"][0]`);
        if (data) setCmsData(data);
      } catch (error) {
        console.warn("Sanity Hero fetch query unconfigured. Using defaults.", error);
      }
    };
    fetchHeroData();
  }, []);

  // ✅ SAFELY MAPS IMAGE ASSETS: Pulls your live published Sanity image asset token, slips to local backup if empty
  const activeBgImage = cmsData?.backgroundImage ? urlFor(cmsData.backgroundImage).url() : biixoftCover;

  return (
    <section id="home" className="relative bg-white w-full overflow-hidden border-b border-slate-100 min-h-none md:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[85vh] flex items-center">
      
      {/* 🖥️ WIDESCREEN DESKTOP ONLY: Full-bleed background with left-to-right fade mask */}
      <div className="hidden xl:block absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={activeBgImage} 
          alt="BiiXoft Widescreen Backdrop" 
          className="w-full h-full object-cover object-left-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4)_10%,rgba(255,255,255,0.7)_50%,#fff_95%)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
      </div>

      {/* 📊 CORE FLEX CONTROLLER FRAME */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row xl:justify-end items-center gap-8 md:gap-6 lg:gap-12 px-4 sm:px-6 lg:px-8 py-0 md:py-12 xl:py-24 relative z-10">
        
        {/* 📱 MOBILE, PORTRAIT TABLET & STANDARD LAPTOP CANVAS LAYER (Hidden on widescreen XL monitors) */}
        <div className="w-full md:w-1/2 xl:hidden block relative h-[260px] sm:h-[380px] md:h-[420px] lg:h-[480px] overflow-hidden select-none shrink-0 bg-white">
          <img 
            src={activeBgImage} 
            alt="BiiXoft Service Graphics" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent z-10" />

          {/* 🌊 The Original Wavy Curvy Bottom Divider Line (Mobile & Tablet viewports only) */}
          <div className="absolute inset-x-0 bottom-0 w-full flex justify-center z-20 pointer-events-none">
            <svg
              viewBox="0 0 1440 220"
              xmlns="http://w3.org"
              className="w-full h-auto text-white fill-current translate-y-1"
              preserveAspectRatio="none"
            >
              <path d="M 0,220 L1440,220 L1440,80 C1200,80 1260,20 1000,20 C 620,20 660,60 0,60 Z" />
            </svg>
          </div>
        </div>

        {/* 📝 CORE COPY TYPOGRAPHY SHELL */}
        <div className="w-full md:w-1/2 xl:w-1/2 text-center md:text-left flex flex-col items-center md:items-start xl:pl-12 pb-12 md:pb-0 bg-white xl:bg-transparent px-2 sm:px-4 md:px-0 rounded-3xl">
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50/90 text-blue-600 border border-blue-100 mb-6 select-none shadow-sm">
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

      {/* Corporate blueprint grid pattern background layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50 z-0 pointer-events-none" />
    </section>
  );
}
