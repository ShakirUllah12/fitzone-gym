import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function About() {
  return (
    <>
      <Helmet>
        <title>About Us | FitZone Gym Islamabad</title>
        <meta name="description" content="Learn about FitZone Gym's mission, facilities, and expert trainers. A modern, community-focused fitness center in Islamabad." />
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-16">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
          About <span className="text-accent">FitZone Gym</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Islamabad's premier fitness center, established with a single vision: to elevate local physical training standards and foster a strong, supportive fitness community.
        </p>
      </div>

      {/* Narrative Section 1 */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-12 space-y-6">
        <h2 className="font-display font-bold text-2xl text-white uppercase tracking-wide border-b border-slate-850 pb-4">
          Our Story & Mission
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Founded in Sector G-11, Islamabad, FitZone Gym was born from a desire to move away from generic, crowded gym formulas. We recognized that individuals looking to improve their health needed more than just rows of treadmills—they needed structure, science-based coaching, and high-performance equipment that was well-maintained.
        </p>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Our mission is to empower the residents of Islamabad to live healthier, stronger, and more capable lives. We accomplish this by matching you with certified personal trainers, developing custom-tailored nutritional guidelines, and maintaining a welcoming, judgment-free environment where every rep counts.
        </p>
      </section>

      {/* Narrative Section 2: Facility */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-12 space-y-6">
        <h2 className="font-display font-bold text-2xl text-white uppercase tracking-wide border-b border-slate-850 pb-4">
          Our Premium Facility
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Spanning across a spacious, custom-designed layout in G-11 Markaz, our gym is split into specialized zones to optimize your workouts. We feature an expansive free-weight arena with heavy-duty power racks, a dedicated cardio zone with premium treadmills, and a functional training zone complete with turf, battle ropes, and sleds.
        </p>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          We also host a private studio space for high-energy group fitness classes, including yoga flow, core conditioning, and high-intensity interval training. Our facility is fully air-conditioned, features clean and modern locker rooms, and provides complete backup power support to ensure your training never stops.
        </p>
      </section>

      {/* CTA Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
        <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
          Ready to experience the difference?
        </h3>
        <p className="text-slate-400 text-sm">
          Come visit our facility or book a consultation with one of our certified trainers. We are located in G-11 Markaz, Islamabad.
        </p>
        <div>
          <Link 
            to="/contact" 
            className="inline-block bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-xl font-display font-bold text-sm uppercase tracking-wider transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  </>
  );
}

export default About;
