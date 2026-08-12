import React from 'react';

export default function WhyUs() {
  const metrics = [
    {
      value: "99.9%",
      label: "Infrastructure Uptime",
      description: "Bulletproof managed hosting setups keeping your operations live around the clock."
    },
    {
      value: "< 1.2s",
      label: "Lighthouse Load Speed",
      description: "Blistering fast React foundations optimized to prevent bounce rates completely."
    },
    {
      value: "100%",
      label: "Fluid Responsiveness",
      description: "Liquid architectures precisely engineered to render flawlessly across all viewports."
    },
    {
      value: "24/7",
      label: "Operational SLA Support",
      description: "Dedicated architecture monitoring to maintain your brand's digital integrity."
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-white border-t border-slate-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid Structure: Text on left, Metrics on right on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 📝 Left text breakdown */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-2">
              Core Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-6">
              Why Choose BiiXoft?
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto lg:mx-0 rounded-full mb-6" />
            <p className="text-slate-600 leading-relaxed font-medium text-base sm:text-lg">
              We deliver state-of-the-art architectures using leading-edge development tools. By creating 
              clean design abstractions, we lock down raw loading speed, fluid screen scaling, and robust 
              data integrity long before your build ever goes live into production.
            </p>
          </div>

          {/* 📊 Right Metrics layout boxes */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md mx-auto sm:max-w-none">
            {metrics.map((item, index) => (
              <div 
                key={index} 
                className="bg-slate-50 border border-slate-200/60 p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:border-blue-600/40 hover:bg-white shadow-sm hover:shadow-md group text-center sm:text-left"
              >
                {/* Vibrant Brand Highlight Number */}
                <div className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight mb-2 transition-transform duration-300 group-hover:scale-105">
                  {item.value}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {item.label}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
