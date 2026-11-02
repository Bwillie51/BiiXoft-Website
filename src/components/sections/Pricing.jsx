import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { sanityClient } from '@/lib/sanityClient';

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
        
        if (data && data.length > 0) {
          setPlans(data);
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
    <section id="pricing" className="py-24 bg-background border-t border-border w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block">BiiXoft Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-4">Packages & Pricing</h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            All prices are calculated directly in PNG Kina (PGK) inclusive of verified infrastructure provider costs and wholesale markup fees.
          </p>
        </div>

        {/* Tab Selection Row Controls */}
        <div className="flex justify-center mb-16">
          <div className="bg-card border border-border p-1.5 rounded-2xl flex flex-col sm:flex-row w-full sm:w-auto max-w-md sm:max-w-none gap-1 sm:gap-0 shadow-inner">
            <button
              onClick={() => setActiveCategory('development')}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeCategory === 'development' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              🖥️ Design & Custom Development
            </button>
            <button
              onClick={() => setActiveCategory('hosting')}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeCategory === 'hosting' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              🌐 Domains & Hosting Resale
            </button>
          </div>
        </div>

        {/* Loading Matrix / Card Render Loop */}
        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground font-bold tracking-wide animate-pulse">
            Syncing Ecosystem Data...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-md mx-auto md:max-w-none">
            {filteredPlans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-card rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular ? 'border-primary shadow-xl shadow-primary/5 lg:-translate-y-2' : 'border-border hover:border-primary/40'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-black tracking-widest uppercase px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    Highly Recommended
                  </span>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline flex-wrap gap-1 mb-6">
                    <span className="text-4xl font-black text-foreground tracking-tight">
                      {plan.priceText}
                    </span>
                    <span className="text-muted-foreground text-xs font-semibold block mt-1 ml-1">
                      ({plan.priceLabel})
                    </span>
                  </div>

                  <div className="w-full h-px bg-border mb-6" />

                  <ul className="space-y-3.5">
                    {plan.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-sm">
                        <span className="text-primary font-bold select-none text-base leading-none">✓</span>
                        <span className="text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  asChild
                  className={`w-full py-6 font-bold rounded-xl transition-all duration-200 text-sm border-none ${
                    plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg' : 'bg-secondary hover:bg-secondary/80 text-foreground border border-border'
                  }`}
                >
                  <a href="#contact">{plan.cta || 'Get Started'}</a>
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* 📊 START OF NEW BIIXOFT ALL-IN-ONE COMBO PRICING TABLE ADDITION */}
        <div className="mt-24 border border-border rounded-3xl overflow-hidden shadow-xl bg-card p-6 sm:p-8">
          <div className="className=mb-6">
            <h3 className="text-lg font-black text-foreground flex items-center gap-2">
              BiiXoft All-in-One Combo <span className="text-primary hover:text-primary/90 transition-colors">🎁 25% OFF!!!</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Maximize your savings by bundling your premium workspace infrastructure together with active cloud hosting tools.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-background mt-6">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-card text-muted-foreground text-xs font-bold uppercase tracking-wider border-b border-border">
                  <th className="py-4 px-6">Package Tier</th>
                  <th className="py-4 px-6">Web Dev Cost (One-Time)</th>
                  <th className="py-4 px-6">Monthly Ecosystem Cost</th>
                  <th className="py-4 px-6 text-slate-400">Standard Total (1st Month)</th>
                  <th className="py-4 px-6 text-primary">25% OFF Combo Price (Your First Invoice)</th>
                  <th className="py-4 px-6">Ongoing Monthly Renewal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm text-foreground">
                
                {/* Bronze Combo Row */}
                <tr className="hover:bg-card/40 transition-colors">
                  <td className="py-5 px-6 font-black text-foreground whitespace-nowrap">🥉 Bronze Combo</td>
                  <td className="py-5 px-6 font-medium text-muted-foreground">K500.00</td>
                  <td className="py-5 px-6 font-medium text-muted-foreground">K65.00</td>
                  <td className="py-5 px-6 line-through text-muted-foreground/60">K565.00</td>
                  <td className="py-5 px-6">
                    <span className="inline-block bg-primary/10 border border-primary/20 text-primary font-extrabold px-3 py-1 rounded-lg">
                      K423.75
                    </span>
                  </td>
                  <td className="py-5 px-6 font-semibold text-emerald-500 whitespace-nowrap">K65.00 / month</td>
                </tr>

                {/* Silver Combo Row */}
                <tr className="hover:bg-card/40 transition-colors">
                  <td className="py-5 px-6 font-black text-foreground whitespace-nowrap">🥈 Silver Combo</td>
                  <td className="py-5 px-6 font-medium text-muted-foreground">K1,350.00</td>
                  <td className="py-5 px-6 font-medium text-muted-foreground">K125.00</td>
                  <td className="py-5 px-6 line-through text-muted-foreground/60">K1,475.00</td>
                  <td className="py-5 px-6">
                    <span className="inline-block bg-primary/10 border border-primary/20 text-primary font-extrabold px-3 py-1 rounded-lg">
                      K1,106.25
                    </span>
                  </td>
                  <td className="py-5 px-6 font-semibold text-emerald-500 whitespace-nowrap">K125.00 / month</td>
                </tr>

                                {/* Gold Combo Row */}
                <tr className="hover:bg-card/40 transition-colors">
                  <td className="py-5 px-6 font-black text-foreground whitespace-nowrap">🥇 Gold Combo</td>
                  <td className="py-5 px-6 font-medium text-muted-foreground">K3,500.00</td>
                  <td className="py-5 px-6 font-medium text-muted-foreground">K320.00</td>
                  <td className="py-5 px-6 line-through text-muted-foreground/60">K3,820.00</td>
                  <td className="py-5 px-6">
                    <span className="inline-block bg-primary/10 border border-primary/20 text-primary font-extrabold px-3 py-1 rounded-lg">
                      K2,865.00
                    </span>
                  </td>
                  <td className="py-5 px-6 font-semibold text-emerald-500 whitespace-nowrap">K320.00 / month</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
