import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/trainers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch trainers');
        }
        return response.json();
      })
      .then((data) => {
        setTrainers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getInitials = (name) => {
    if (!name) return 'FT';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getImageUrl = (storedUrl) => {
    if (!storedUrl) return '';
    // If it contains localhost:5000, dynamically map it to the active backend host
    if (storedUrl.includes('localhost:')) {
      const parts = storedUrl.split('/images/');
      if (parts.length > 1) {
        // Strip /api from API_BASE_URL to get the root backend host
        const baseBackendUrl = API_BASE_URL.replace('/api', '');
        return `${baseBackendUrl}/images/${parts[1]}`;
      }
    }
    return storedUrl;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mb-4"></div>
        <p className="text-slate-400 font-display uppercase tracking-widest text-sm">Loading our trainers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/20 text-red-200 p-6 rounded-2xl text-center my-12">
        <p className="font-display font-bold uppercase tracking-wider mb-2">Error Loading Trainers</p>
        <p className="text-sm text-red-300/80">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
          Meet Our <span className="text-accent">Trainers</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Work with Islamabad's elite, certified coaches dedicated to guiding your form, nutrition, and mental strength.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {trainers.map((trainer) => (
          <article 
            key={trainer._id || trainer.slug}
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
          >
            {/* Avatar & Fallback logic */}
            <div className="relative">
              {trainer.photoUrl && (
                <img 
                  src={getImageUrl(trainer.photoUrl)} 
                  alt={trainer.name} 
                  className="w-24 h-24 rounded-full object-cover mb-6 border-2 border-slate-800 group-hover:border-accent transition-all duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              )}
              <div 
                style={{ display: trainer.photoUrl ? 'none' : 'flex' }}
                className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 text-accent font-display font-black text-2xl tracking-wider mb-6 items-center justify-center shadow-lg group-hover:border-accent/40 group-hover:bg-slate-700 transition-all duration-300"
              >
                {getInitials(trainer.name)}
              </div>
            </div>

            <span className="text-xs font-display font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
              {trainer.specialty}
            </span>

            <h2 className="font-display font-bold text-xl text-white uppercase tracking-wide mb-3 group-hover:text-accent transition-colors">
              {trainer.name}
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed">
              {trainer.bio}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Trainers;
