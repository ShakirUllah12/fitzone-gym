import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function Home() {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        return response.json();
      })
      .then((data) => {
        setFeaturedServices(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-12 sm:p-20 flex flex-col items-center text-center shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(249,115,22,0.15),transparent_60%)]"></div>
        <div className="relative z-10 max-w-3xl">
          <span className="text-accent font-display font-black text-xs sm:text-sm uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-full mb-6 inline-block border border-accent/20">
            Islamabad's Ultimate Fitness Center
          </span>
          <h1 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tight text-white mb-6 leading-none">
            Forge Your <span className="text-accent">Ultimate Self</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl mb-8 leading-relaxed">
            State-of-the-art strength training, group conditioning, and professional coaching tailored to your body. Break barriers and build lasting results in a community built on grit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/services" 
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider transition-all duration-300"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white mb-4">
            Why Choose <span className="text-accent">FitZone</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We deliver a premium training environment that focuses on safety, metrics, and consistent physical progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <div className="text-accent text-3xl mb-4">🏋️‍♀️</div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-3">Premium Gear</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Equipped with elite mechanical hardware, free weight arrays, and dedicated recovery spaces for top-tier training.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <div className="text-accent text-3xl mb-4">💪</div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-3">Elite Coaches</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Work with verified, certified trainers specializing in biomechanics, athletic conditioning, and injury prevention.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <div className="text-accent text-3xl mb-4">📈</div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-3">Goal Oriented</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Custom progress reporting, body composition diagnostics, and nutrition planning that align perfectly with your workouts.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Services Section */}
      <div className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white mb-2">
              Featured <span className="text-accent">Services</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A glimpse at our high-demand fitness programs designed to push your limits.
            </p>
          </div>
          <Link 
            to="/services" 
            className="text-accent hover:text-accent-hover font-display font-bold uppercase tracking-wider text-xs border border-accent/20 px-4 py-2.5 rounded-lg hover:bg-accent/5 transition-all duration-300 self-start sm:self-auto"
          >
            All Classes & Services
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-6 rounded-2xl text-center">
            Failed to load featured services.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <article 
                key={service._id || service.slug}
                className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-accent"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-accent text-2xl">
                      {service.icon === 'dumbbell' && '🏋️‍♂️'}
                      {service.icon === 'heartbeat' && '⚡'}
                      {service.icon === 'user-check' && '🤝'}
                      {service.icon === 'users' && '👥'}
                      {service.icon === 'spa' && '🧘'}
                      {service.icon === 'utensils' && '🥗'}
                      {!['dumbbell', 'heartbeat', 'user-check', 'users', 'spa', 'utensils'].includes(service.icon) && '🔥'}
                    </span>
                    <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-500 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                      {service.duration}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-3 group-hover:text-accent transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/40 text-xs font-display font-bold uppercase tracking-wider text-slate-500 group-hover:text-white transition-colors">
                  Learn More →
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
