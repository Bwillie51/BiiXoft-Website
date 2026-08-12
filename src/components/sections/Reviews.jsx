import React from 'react';

export default function Reviews() {
  const feedbackList = [
    {
      client: "Sarah Jenkins",
      role: "Operations Director",
      comment: "BiiXoft completely overhauled our online presence. The custom design is perfectly fluid and manages updates cleanly through the CMS.",
      rating: 5
    },
    {
      client: "Marcus Chen",
      role: "Tech Founder",
      comment: "The architecture built by BiiXoft is incredibly robust. Our performance conversion rate skyrocketed right after deploying to production.",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-slate-50 border-y border-slate-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mt-2 mb-4">
            Feedbacks & Reviews
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Feedback Layout Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {feedbackList.map((item, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200/60 p-6 sm:p-8 rounded-3xl relative shadow-sm hover:shadow-md hover:border-blue-600/30 transition-all duration-300"
            >
              {/* Star Rating Indicator Grid using your brand blue */}
              <div className="flex space-x-1 mb-4 text-blue-600 text-lg select-none">
                {"★".repeat(item.rating)}
              </div>
              
              <p className="text-slate-700 text-sm sm:text-base font-medium italic leading-relaxed mb-6">
                "{item.comment}"
              </p>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-slate-900 font-black text-sm sm:text-base">
                  {item.client}
                </h4>
                <p className="text-slate-400 text-xs font-semibold mt-0.5 uppercase tracking-wider">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
