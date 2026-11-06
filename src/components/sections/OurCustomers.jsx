import React, { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanityClient';


// Function to fetch and display customer logos dynamically from Sanity CMS - which will display in a responsive grid layout with hover effects and smooth transitions
export default function OurCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Option 1 update applied here to make sure your images load!
        const query = '*[_type == "customer"]{ name, "logo": logo.asset->url }';
        const data = await sanityClient.fetch(query);
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);


 
  return (
    <section id="our-customers" className="py-16 bg-[#0a0f2c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl font-extrabold text-white text-center">
          Our Customers
        </h2>
      </div>

      {/* Infinite Scroll Wrapper Container */}
      <div className="relative flex w-full overflow-x-hidden mask-gradient">
        <div className="flex gap-12 whitespace-nowrap animate-scroll-right">
          
          {/* First loop of items */}
          {customers.map((customer, index) => (
            <div 
              key={`loop1-${index}`} 
              className="inline-flex flex-col items-center justify-center p-4  rounded-xl shadow-md min-w-[140px] max-w-[140px]"
            >
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-2 overflow-hidden border border-slate-700">
                <img 
                  src={customer.logo} 
                  alt={customer.name} 
                  className="w-full h-full rounded-full object-cover" 
                />
              </div>
              <span className="text-xs font-medium text-slate-300 mt-2 text-center truncate w-full">
                {customer.name}
              </span>
            </div>
          ))}

          {/* Second identical loop for perfect infinite continuity */}
          {customers.map((customer, index) => (
            <div 
              key={`loop2-${index}`} 
              className="inline-flex flex-col items-center justify-center p-4  rounded-xl shadow-md min-w-[140px] max-w-[140px]"
            >
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-2 overflow-hidden border border-slate-700">
                <img 
                  src={customer.logo} 
                  alt={customer.name} 
                  className="w-full h-full rounded-full object-cover" 
                />
              </div>
              <span className="text-xs font-medium text-slate-300 mt-2 text-center truncate w-full">
                {customer.name}
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* 
        Injecting custom continuous keyframes directly into the file 
        so you do not have to touch tailwind.config.js files!
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-scroll-right {
          animation: scrollRight 25s linear infinite;
        }
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
        }
      `}} />
    </section>
  );
}
