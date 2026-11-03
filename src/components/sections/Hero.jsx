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
        // 🔄 FIXED: Added [0] to extract the first singular published document from your Sanity array list cleanly
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
    // Swapped light backgrounds and borders to use your brand theme tokens
    <section id="home" className="relative bg-background w-full overflow-hidden border-b border-border flex items-center min-h-none lg:min-h-[85vh]">
      
      {/* 🖼️ INTEGRATED BACKGROUND GRAPHIC LAYER */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={activeBgImage} 
          alt="BiiXoft Service Banner Backdrop" 
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        
        {/* Swapped white overlays to your deep dark background tokens */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/10 to-transparent" />
        <div className="absolute inset-19 bg-[radial-gradient(circle_at_top_right,rgba(20,24,33,0.4)_100%,rgba(20,24,33,0.7)_40%,var(--background)_90%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* 🌊 The Original Wavy Curvy Bottom Divider Line (Hidden on Desktop) */}
      <div className="absolute inset-x-0 bottom-1.5 lg:w-full flex justify-center lg:hidden z-10">
        <svg
          viewBox="0 0 1440 220"
          xmlns="http://w3.org"
          className="w-full h-auto text-background fill-current translate-y-2 relative drop-shadow-sm"
          preserveAspectRatio="none"
        >
          <path d="M 0,220 L1440,220 L1440,80 C1200,80 1260,20 1000,20 C 620,20 660,60 0,60 Z" />
        </svg>
      </div>

      {/* 📊 ORIGINAL CONTENT CONTAINER - STRUCTURE 100% UNTOUCHED */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-24 flex justify-end relative z-10 bg-transparent">
        
        {/* Typography and Actions Frame */}
        <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start lg:pl-8">
          
          <span className="text-2xl font-bold tracking-tight text-foreground mb-3 leading-[1.15]">
            The Face of Your Business in {'\u00A0\u00A0'}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent lg:text-inherit lg:opacity-60 lg:text-primary">
              Today's Digital World
            </span>
          </span>

          <div className="bg-card/5 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-1 lg:p-0 rounded-2xl border border-border mb-10 max-w-xl shadow-sm lg:shadow-none font-semibold">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-semibold">
              At BiiXoft, we build modern, high-performing websites designed to help your brand grow, engage customers, and stand out. Whether you need a sleek custom design or a site you can easily manage yourself, we deliver tailored solutions built for results.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-xl shadow-lg shadow-primary/10 transition-all duration-200 hover:-translate-y-0.5 border-none text-sm">
              <a href="#contact">Build Your New Website</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-border bg-secondary text-foreground hover:bg-secondary/80 font-bold px-8 py-6 rounded-xl transition-all text-sm">
              <a href="#who-we-are">Explore Our Services</a>
            </Button>
          </div>

        </div>
      </div>

    </section>
  );
}
