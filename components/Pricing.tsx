import React from 'react';
import { Check } from 'lucide-react';
import { PricingPlan } from '../types';

const Pricing: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      name: "Starter",
      price: "$19",
      credits: "500 Credits/mo",
      features: [
        "Approx. 500 Images",
        "Standard Resolution",
        "Public Queue",
        "Community Support"
      ]
    },
    {
      name: "Pro",
      price: "$49",
      credits: "5,000 Credits/mo",
      isPopular: true,
      features: [
        "Approx. 5000 Images or 250 Videos",
        "HD Resolution (1K/4K)",
        "Video Ad Generation (Veo)",
        "Priority Queue",
        "Commercial License"
      ]
    },
    {
      name: "Agency",
      price: "$199",
      credits: "25,000 Credits/mo",
      features: [
        "Approx. 25k Images or 1.2k Videos",
        "Ultra HD + RAW Output",
        "API Access",
        "Team Seats (5)",
        "Dedicated Account Manager"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple, transparent <span className="text-brand-cyan">credit pricing</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            1 Image = 1 Credit. 1 Video = 20 Credits.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative flex flex-col rounded-2xl border p-8 shadow-sm transition-all hover:scale-105 ${
                plan.isPopular 
                  ? 'border-brand-cyan bg-brand-panel shadow-lg shadow-brand-cyan/20 z-10' 
                  : 'border-white/10 bg-brand-panel/50 hover:bg-brand-panel'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-brand-cyan py-1 text-center text-sm font-bold text-black uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-xl font-semibold text-gray-400">/mo</span>
                </div>
                <p className="mt-2 text-brand-cyan font-medium">{plan.credits}</p>
              </div>

              <ul className="mb-8 space-y-4 flex-1">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start">
                    <Check className="h-5 w-5 shrink-0 text-brand-cyan" />
                    <span className="ml-3 text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors ${
                  plan.isPopular 
                    ? 'bg-brand-cyan text-black hover:bg-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;