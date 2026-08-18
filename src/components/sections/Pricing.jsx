import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { sanityClient } from '@/lib/sanityClient'; // 🔗 Import your new connection instance

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState('development');
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 🚀 EXECUTE LIVE CMS FETCH REQUEST: Pulls your exact published Kina figures
    const fetchPricingData = async () => {
      try {
        const query = `*[_type == "pricingPlan"]`;
        const data = await sanityClient.fetch(query);
        
        // If data returns empty, fall back to our safe backup placeholder structures
        if (data && data.length > 0) {
          setPlans(data);
        } else {
          console.warn("No Sanity data found, make sure your schema matches exactly.");
          setPlans([]); // Fixed potential mapping error
        }
      } catch (error) {
        console.error("Sanity API connection failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricingData();
  }, []);

  // Filters the dynamic state collection based on the tab category
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

        {/* ========================================================================= */}
        {/* 📊 START OF NEW BIIXOFT ALL-IN-ONE COMBO PRICING TABLE ADDITION          */}
        {/* ========================================================================= */}
        <div className="mt-24 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm bg-slate-950 p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              BiiXoft All-in-One Combo <span className ="hover:text-blue-600"><i>25%</i> OFF!!!</span>
            </h3>
            <p className="text-s text-slate-400 mt-1">
              Maximize your savings by bundling your design workspace infrastructure together with active cloud hosting tools.
              
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider border-b border-slate-700">
                  <th className="py-4 px-6">Package Tier</th>
                  <th className="py-4 px-6">Web Dev Cost (One-Time)</th>
                  <th className="py-4 px-6">Monthly Ecosystem Cost</th>
                  <th className="py-4 px-6 text-slate-500">Standard Total (1st Month)</th>
                  <th className="py-4 px-6 text-blue-400">25% OFF Combo Price (Your First Invoice)</th>
                  <th className="py-4 px-6">Ongoing Monthly Renewal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-400 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-5 px-6 font-black text-white whitespace-nowrap">🥉 Bronze Combo</td>
                  <td className="py-5 px-6 font-medium text-slate-300">K575.00</td>
                  <td className="py-5 px-6 font-medium text-slate-300">K90.00</td>
                  <td className="py-5 px-6 line-through text-slate-500">K665.00</td>
                  <td className="py-5 px-6">
                    <span className="inline-block bg-blue-950 border border-blue-800 text-blue-400 font-extrabold px-3 py-1 rounded-lg">
                      K498.75
                    </span>
                  </td>
                  <td className="py-5 px-6 font-semibold text-emerald-400 whitespace-nowrap">K90.00 / month</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-5 px-6 font-black text-white whitespace-nowrap">🥈 Silver Combo</td>
                  <td className="py-5 px-6 font-medium text-slate-300">K1,350.00</td>
                  <td className="py-5 px-6 font-medium text-slate-300">K125.00</td>
                  <td className="py-5 px-6 line-through text-slate-500">K1,475.00</td>
                  <td className="py-5 px-6">
                    <span className="inline-block bg-blue-950 border border-blue-800 text-blue-400 font-extrabold px-3 py-1 rounded-lg">
                      K1,106.25
                    </span>
                  </td>
                  <td className="py-5 px-6 font-semibold text-emerald-400 whitespace-nowrap">K125.00 / month</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-5 px-6 font-black text-white whitespace-nowrap">🥇 Gold Combo</td>
                  <td className="py-5 px-6 font-medium text-slate-300">K3,500.00</td>
                  <td className="py-5 px-6 font-medium text-slate-300">K328.00</td>
                  <td className="py-5 px-6 line-through text-slate-500">K3,828.00</td>
                  <td className="py-5 px-6">
                    <span className="inline-block bg-blue-950 border border-blue-800 text-blue-400 font-extrabold px-3 py-1 rounded-lg">
                      K2,871.00
                    </span>
                  </td>
                  <td className="py-5 px-6 font-semibold text-emerald-400 whitespace-nowrap">K328.00 / month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        </div>
    </section>
  );
}