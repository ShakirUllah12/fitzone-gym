import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group" aria-label="FitZone Gym logo">
            <span className="w-3 h-8 bg-accent skew-x-[-15deg] block shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-transform group-hover:scale-110"></span>
            <span className="font-display font-extrabold text-2xl uppercase tracking-wider text-white">
              FitZone <span className="text-accent">Gym</span>
            </span>
          </Link>
          
          <nav className="hidden md:block" aria-label="Main Navigation">
            <ul className="flex space-x-8">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`font-display font-semibold text-sm uppercase tracking-wider transition-colors duration-200 relative py-2 ${
                        isActive ? 'text-accent' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <svg 
              className="w-6 h-6 transition-transform duration-300"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Hamburger Mobile Menu Dropdown */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-800 bg-slate-900/95 backdrop-blur-lg ${
            isMenuOpen ? 'max-h-[450px] opacity-100 py-6 border-b' : 'max-h-0 opacity-0 py-0 border-b-0'
          }`}
        >
          <ul className="flex flex-col space-y-4 px-6">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-display font-semibold text-sm uppercase tracking-wider transition-colors duration-200 py-2 ${
                      isActive ? 'text-accent' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            <li className="pt-4 border-t border-slate-800/80">
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-center bg-accent hover:bg-accent-hover text-white py-3 rounded-xl font-display font-bold text-sm uppercase tracking-wider transition-colors shadow-lg shadow-accent/15"
              >
                Join Now
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: About Blurb */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="FitZone Gym logo">
              <span className="w-2.5 h-6 bg-accent skew-x-[-15deg] block"></span>
              <span className="font-display font-extrabold text-xl uppercase tracking-wider text-white">
                FitZone <span className="text-accent">Gym</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Islamabad's premier fitness destination. We combine state-of-the-art training equipment with certified elite personal trainers to create a results-driven environment that inspires change.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display font-bold text-white uppercase tracking-wider text-sm mb-4 border-l-2 border-accent pl-3">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (NAP) */}
          <div>
            <h3 className="font-display font-bold text-white uppercase tracking-wider text-sm mb-4 border-l-2 border-accent pl-3">
              Our Location
            </h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li className="text-white font-semibold">FitZone Gym Islamabad</li>
              <li>Plot 14, Sector G-11 Markaz, Islamabad, Pakistan</li>
              <li>
                <span className="text-white">Phone:</span> +92 (51) 555-3489
              </li>
              <li>
                <span className="text-white">Email:</span> info@fitzonegym.pk
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} FitZone Gym. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Layout;
