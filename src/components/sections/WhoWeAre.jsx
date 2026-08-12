import React from 'react';

export default function WhoWeAre() {
  const capabilities = [
    { 
      icon: '🖥️', 
      title: "Custom & 'Liquid' Websites", 
      desc: "Fully responsive, fluid frameworks engineered to render brilliantly across all device aspect ratios." 
    },
    { 
      icon: '⚙️', 
      title: 'CMS Manageability', 
      desc: 'Seamless content abstraction allowing quick revisions without looking at code files.' 
    },
    { 
      icon: '🏗️', 
      title: 'Robust Architecture', 
      desc: 'Clean object modules designed to extend easily as operations expand.' 
    },
    { 
      icon: '⚡', 
      title: 'High Conversion Performance', 
      desc: 'Searing speed profiles and landing funnels mapped to capture active audience intent.' 
    }
  ];

  return (
    <section id="who-we-are" className="py-24 bg-slate-50 border-y border-slate-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block">
            Our Core Competencies
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mt-2 mb-4">
            Who We Are
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            We are a dedicated team of digital architects transforming conceptual business structures 
            into responsive, high-performing web platforms engineered for the modern web ecosystem.
          </p>
          <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-6" />
        </div>

        {/* Capabilities Grid Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((item, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200/60 p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:border-blue-600/40 hover:-translate-y-1 group shadow-sm hover:shadow-md"
            >
              {/* Electric Blue Circular Glow Wrapper */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white shadow-sm transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
