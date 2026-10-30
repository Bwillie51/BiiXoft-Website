import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { sanityClient } from '@/lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Hero() {
  const [cmsData, setCmsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "heroSection"][0]`);
        setCmsData(data);
      } catch (error) {
        console.error("Sanity Hero fetch query unconfigured. Using defaults.", error);
      }
    };
    fetchData();
  }, []);

  const activeImage = cmsData?.backgroundImage 
    ? urlFor(cmsData.backgroundImage).url() 
    : '';

  return (
    <section id="home" className="relative bg-white w-full overflow-hidden border-b border-slate-100 min-h-screen admin-h-[70vh] xl:min-h-[85vh] flex items-center">
      
      {/* CMS WIDESCREEN DISPLAY ONLY: Full-bleed background with left-to-right fade mask */}
      <div className="hidden xl:block absolute inset-0 z-0 select-none pointer-events-none">
        {activeImage && (
          <img
            src={activeImage}
            alt="BiiXoft Widescreen Background"
            className="w-full h-full object-cover object-left-top"
            loading="eager"
          />
        )}
        {/* Inverted asymmetry veil: Left side clear, right side fades to blurred white for text */}
        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/5 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4)_70%,rgba(255,255,255,0.7)_90%,#fff_99%)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
      </div>

      {/* CORE FLEX CONTROLLER FRAME */}
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row xl:justify-end items-center gap-8 md:gap-5 lg:gap-12 px-4 sm:px-6 lg:px-8 py-8 md:py-12 xl:py-24 relative z-10">
        
        {/* MOBILE, PORTRAIT TABLET & STANDARD LAPTOP CANVAS LAYER (Hidden on widescreen XL monitors) */}
        <div className="w-full md:w-1/2 xl:hidden black relative h-[250px] sm:h-[350px] md:h-[420px] lg:h-[480px] overflow-hidden select-none shrink-0 bg-white">
          {activeImage && (
            <img
              src={activeImage}
              alt="BiiXoft Service Graphics"
              className="w-full h-full object-cover object-center"
            />
          )}
          {/* Mobile Bottom Smooth Feather Edge Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/10 to-transparent z-10" />
          
          {/* The Original Wavy Curvy Bottom Divider Line (Mobile & tablet viewports only) */}
          <div className="absolute inset-x-0 bottom-0 w-full flex justify-center z-20 pointer-events-none">
            <svg
              viewBox="0 0 1440 220"
              className="w-full h-auto text-white fill-current translate-y-1"
              preserveAspectRatio="none"
            >
              <path d="M 0,220 L 1440,220 L 1440,50 C 1200,80 960,110 720,110 C 480,110 240,60 0,10 Z" />
            </svg>
          </div>
        </div>

        {/* CORE TYPOGRAPHY SHELL */}
        {/* Paired gracefully onto pure solid white on smaller devices, and glides perfectly onto the right on big monitors */}
        <div className="w-full md:w-1/2 xl:max-w-2xl flex flex-col items-start center md:items-start text-start xl:xl-12 pd-12 px-0 bg-white xl:bg-transparent px-2 sm:px-4 md:px-0 rounded-3xl">
          <span className="inline-flex item-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50/80 text-blue-600/90 border border-blue-100/40 select-none shadow-sm">
            Transform Your Online Presence
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mt-6 leading-[1.15]">
            Empowering Your Business in a <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Digital World
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 mt-6 max-w-2xl leading-relaxed font-semibold">
            At BiiXoft, we build modern, high-performing websites designed to help your brand grow, engage customers, and stand out. Whether you need a sleek custom design or a site you can easily manage yourself, we deliver tailored solutions built for results.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full mt-10">
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 text-white bold px-8 py-6 rounded-xl shadow-lg shadow-blue-600/10 transition-all duration-200 hover:-translate-y-0.5 border-none text-md">
              Build Your New Website
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-100 text-md px-8 py-6 rounded-xl transition-all test-sm">
              Explore Our Services
            </Button>
          </div>
        </div>

      </div>

      {/* Corporate blueprint grid pattern background layer */}
      <div className="absolute inset-0 -z-10 linear-gradient(to_right,#fbfbfb_1px,transparent_1px),linear-gradient(to_bottom,#fbfbfb_1px,transparent_1px) bg-[size:3rem_3rem] opacity-50 z-0 pointer-events-none" />

    </section>
  );
}
