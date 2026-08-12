import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState('development');
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 📝 Placeholder Static Blueprint: Keeps the UI working perfectly until Sanity is connected
  const localBackupData = [
    {
      name: "Starter Business Site",
      category: "development",
      description: "Perfect for local companies looking to secure a premium online face.",
      priceText: "K1,070",
      priceLabel: "One-Time Development Fee",
      features: ["Custom UI Layout Design", "Fluid Responsive Coding (Mobile + Desktop)", "Up to 5 Core Navigational Pages", "Formik & Formspree Contact Integration", "Basic SEO Structure Setup", "1 Month Complementary Support"],
      cta: "Launch My Business Site",
      popular: false
    },
    {
      name: "Dynamic Agency Platform",
      category: "development",
      description: "Optimized for scaling operations requiring dynamic content management.",
      priceText: "K2,140",
      priceLabel: "One-Time Development Fee",
      features: ["Premium Bespoke Web Design", "Fluid 'Liquid' Framework Architecture", "Full Content Management (Sanity CMS)", "Unlimited Dynamic Portfolio/Service Pages", "Advanced Interactive Components", "Speed Optimization (90+ Lighthouse)", "3 Months Dedicated Support"],
      cta: "Build My Agency Platform",
      popular: true
    },
    {
      name: "Enterprise Custom Matrix",
      category: "development",
      description: "For high-performance systems requiring database integrations.",
      priceText: "K5,136",
      priceLabel: "One-Time Development Fee",
      features: ["Full-Stack Web Application Infrastructure", "Supabase Secure Database Layer", "User Authentication & Client Dashboards", "Bespoke System Architecture Design", "Advanced Form & Automation Flows", "Priority 24/7 Operations SLA Support"],
      cta: "Architect Your Enterprise",
      popular: false
    },
    {
      name: "Domain Registration",
      category: "hosting",
      description: "Secure your brand's unique identity across global domain registries (.com, .net).",
      priceText: "K47",
      priceLabel: "billed annually",
      features: ["Domain Wholesaling (.com, .net, .org)", "Full DNS Management Control Panel", "Free Domain Privacy Protection", "Seamless Pointing to React/Vercel Hosts", "Automated Annual Renewal Alerts"],
      cta: "Register My Domain",
      popular: false
    },
    {
      name: "Managed Cloud Hosting",
      category: "hosting",
      description: "Blistering fast, secure production hosting optimized for modern projects.",
      priceText: "K85",
      priceLabel: "per month",
      features: ["High-Speed Premium SSD Storage", "99.9% Uptime Operational SLA", "Free Let's Encrypt SSL Certificates", "Automated Daily Infrastructure Backups", "DDoS Protection & Traffic Threat Mitigation", "Standard Operational Server Support"],
      cta: "Deploy Hosting Server",
      popular: true
    }
  ];

  useEffect(() => {
    // 🔗 FUTURE SANITY CMS API FETCH:
    // Once Sanity is live, you will replace this with:
    // sanityClient.fetch(`*[_type == "pricingPlan"]`).then((data) => { setPlans(data); setIsLoading(false); })
    
    // Simulating API loading using our blueprint layout array parameters
    const fetchTimeout = setTimeout(() => {
      setPlans(localBackupData);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(fetchTimeout);
  }, []);

  // 🔍 Filters the unified array state object dynamically based on the category string toggle keys
  const filteredPlans = plans.filter(plan => plan.category === activeCategory);

  return (
    <section id="pricing" className="py-24 bg-white border-t border-slate-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block">BiiXoft Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-4">Packages & Pricing</h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            All prices are calculated directly in PNG Kina (PGK) inclusive of verified infrastructure provider costs and wholesale markup fees.
          </p>
        </div>

        {/* Tab Selection Row Controls */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-50 border border-slate-200/80 p-1.5 rounded-2xl flex flex-col sm:flex-row w-full sm:w-auto max-w-md sm:max-w-none gap-1 sm:gap-0 shadow-inner">
            <button
              onClick={() => setActiveCategory('development')}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === 'development' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🖥️ Design & Custom Development
            </button>
            <button
              onClick={() => setActiveCategory('hosting')}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === 'hosting' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🌐 Domains & Hosting Resale
            </button>
          </div>
        </div>

        {/* Loading Matrix / Card Render Loop */}
        {isLoading ? (
          <div className="text-center py-20 text-slate-400 font-bold tracking-wide animate-pulse">
            Syncing Ecosystem Data...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-md mx-auto md:max-w-none">
            {filteredPlans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-slate-50 rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular ? 'border-blue-600 shadow-xl shadow-blue-600/5 lg:-translate-y-2 bg-white' : 'border-slate-200/60 hover:border-blue-600/40'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-black tracking-widest uppercase px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    Highly Recommended
                  </span>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline flex-wrap gap-1 mb-6">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">
                      {plan.priceText}
                    </span>
                    <span className="text-slate-400 text-xs font-semibold block mt-1 ml-1">
                      ({plan.priceLabel})
                    </span>
                  </div>

                  <div className="w-full h-px bg-slate-200 mb-6" />

                  <ul className="space-y-3.5">
                    {plan.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-sm">
                        <span className="text-blue-600 font-bold select-none text-base leading-none">✓</span>
                        <span className="text-slate-600 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  asChild
                  className={`w-full py-6 font-bold rounded-xl transition-all duration-200 text-sm border-none ${
                    plan.popular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/10' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <a href="#contact">{plan.cta}</a>
                </Button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
