import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

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
          <Link to="/" className="flex items-center gap-2 group">
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

          {/* Simple Mobile Navigation Indicator or CTA */}
          <div className="md:hidden">
            <Link to="/contact" className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-full font-display font-bold text-xs uppercase tracking-wide transition-colors">
              Join Now
            </Link>
          </div>
        </div>
        
        {/* Simple Mobile Nav Links Bar */}
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-2">
          <ul className="flex justify-between text-[11px] font-display font-bold uppercase tracking-wider">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={isActive ? 'text-accent' : 'text-slate-400'}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
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
            <Link to="/" className="flex items-center gap-2 mb-4">
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
