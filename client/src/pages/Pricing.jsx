import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Pricing() {
  const tiers = [
    {
      name: 'Basic Strength',
      price: '6,000',
      period: 'month',
      description: 'Ideal for self-driven individuals looking for basic gym floor and weight access.',
      features: [
        'Full gym floor access',
        'Standard free weights area',
        'Locker & shower facilities',
        '1 complimentary guest pass / month',
        'General floor trainer guidance'
      ],
      isPopular: false,
      ctaText: 'Get Basic Pass'
    },
    {
      name: 'Standard Conditioning',
      price: '10,000',
      period: 'month',
      description: 'Our most popular plan. Perfect for general conditioning and group class access.',
      features: [
        'All Basic plan features',
        'Access to Functional Fitness zone',
        '2 Group Fitness classes per week',
        '1 Personal Trainer evaluation / month',
        '10% supplement & cafe discount',
        'Free Wi-Fi & juice bar access'
      ],
      isPopular: true,
      ctaText: 'Join Standard'
    },
    {
      name: 'Premium Elite',
      price: '18,000',
      period: 'month',
      description: 'The VIP experience. Full-access coaching and personalized metrics tracking.',
      features: [
        'Unlimited Group Fitness classes',
        '2 One-on-One personal coaching sessions / week',
        'Personalized diet & macro nutrition planning',
        'Bi-weekly InBody composition diagnostics',
        'Priority workout locker reservation',
        '24/7 support & accountability chat'
      ],
      isPopular: false,
      ctaText: 'Go Premium'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Membership Pricing | FitZone Gym Islamabad</title>
        <meta name="description" content="Affordable gym membership plans in Islamabad. Compare FitZone Gym's Basic, Standard, and Premium pricing tiers today." />
      </Helmet>
      <div>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
          Membership <span className="text-accent">Pricing</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Choose the membership tier that matches your dedication level. No hidden fees, cancel or freeze anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`flex flex-col justify-between bg-slate-900 border rounded-3xl p-8 relative transition-all duration-300 hover:-translate-y-2 ${
              tier.isPopular 
                ? 'border-accent shadow-[0_0_30px_rgba(249,115,22,0.15)] md:scale-105 z-10' 
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {tier.isPopular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-display font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Most Popular
              </span>
            )}

            <div>
              <div className="mb-6">
                <h2 className="font-display font-black text-xl text-white uppercase tracking-wide mb-2">
                  {tier.name}
                </h2>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1 text-white mb-8 border-b border-slate-800/60 pb-6">
                <span className="text-xl font-display font-bold">PKR</span>
                <span className="text-5xl font-display font-black tracking-tight">{tier.price}</span>
                <span className="text-slate-500 text-sm">/{tier.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="text-accent text-base mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              to="/contact" 
              className={`w-full block text-center py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                tier.isPopular 
                  ? 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/15' 
                  : 'bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {tier.ctaText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}

export default Pricing;
