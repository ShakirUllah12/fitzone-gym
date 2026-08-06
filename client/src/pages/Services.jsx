import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

function Services() {
  const [services, setServices] = useState([]);
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
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mb-4"></div>
        <p className="text-slate-400 font-display uppercase tracking-widest text-sm">Loading our services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/20 text-red-200 p-6 rounded-2xl text-center my-12">
        <p className="font-display font-bold uppercase tracking-wider mb-2">Error Loading Services</p>
        <p className="text-sm text-red-300/80">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
          Our <span className="text-accent">Services</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Transform your body and mind with our diverse range of fitness programs, led by certified elite professionals in Islamabad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <article 
            key={service._id || service.slug}
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
          >
            <div>
              {/* Card Header & Duration */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-accent text-3xl">
                  {service.icon === 'dumbbell' && '🏋️‍♂️'}
                  {service.icon === 'heartbeat' && '⚡'}
                  {service.icon === 'user-check' && '🤝'}
                  {service.icon === 'users' && '👥'}
                  {service.icon === 'spa' && '🧘'}
                  {service.icon === 'utensils' && '🥗'}
                  {!['dumbbell', 'heartbeat', 'user-check', 'users', 'spa', 'utensils'].includes(service.icon) && '🔥'}
                </span>
                <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-500 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 group-hover:border-accent/30 group-hover:text-accent transition-colors">
                  {service.duration}
                </span>
              </div>

              <h2 className="font-display font-bold text-xl text-white uppercase tracking-wide mb-4 group-hover:text-accent transition-colors">
                {service.name}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
              <span>Class Details</span>
              <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Services;
