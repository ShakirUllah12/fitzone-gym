import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { API_BASE_URL } from '../config';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(errData.error || 'Failed to submit message');
          });
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage('Thank you! Your message has been submitted successfully.');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message || 'Something went wrong. Please try again.');
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | FitZone Gym Islamabad</title>
        <meta name="description" content="Get in touch with FitZone Gym in Islamabad. Visit us, call, or send a message to start your fitness journey today." />
      </Helmet>
      <div>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
          Contact <span className="text-accent">Us</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Have questions? Get in touch with our front desk team. We'll get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
          <h2 className="font-display font-bold text-2xl text-white uppercase tracking-wide mb-6">
            Send a Message
          </h2>

          {successMessage && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 p-4 rounded-xl text-sm mb-6">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl text-sm mb-6">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-xs font-display font-bold uppercase tracking-wider text-slate-400 mb-2">
                Full Name *
              </label>
              <input 
                type="text" 
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ali Khan"
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-3 text-slate-200 text-sm outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-xs font-display font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-3 text-slate-200 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-display font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-3 text-slate-200 text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-display font-bold uppercase tracking-wider text-slate-400 mb-2">
                Your Message *
              </label>
              <textarea 
                id="message"
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you on your fitness journey?"
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-3 text-slate-200 text-sm outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-hover disabled:bg-slate-800 disabled:text-slate-600 text-white py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider shadow-lg shadow-accent/15 transition-all duration-300"
            >
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>

        {/* Location & Info */}
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <h2 className="font-display font-bold text-2xl text-white uppercase tracking-wide mb-6">
              Branch Details
            </h2>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-4">
                <span className="text-accent text-lg">📍</span>
                <div>
                  <h3 className="font-bold text-white uppercase text-xs tracking-wider mb-1">Address</h3>
                  <p>Plot 14, Sector G-11 Markaz, Islamabad, Pakistan</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-accent text-lg">📞</span>
                <div>
                  <h3 className="font-bold text-white uppercase text-xs tracking-wider mb-1">Phone</h3>
                  <p>+92 (51) 555-3489</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-accent text-lg">✉️</span>
                <div>
                  <h3 className="font-bold text-white uppercase text-xs tracking-wider mb-1">Email</h3>
                  <p>info@fitzonegym.pk</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-accent text-lg">🕒</span>
                <div>
                  <h3 className="font-bold text-white uppercase text-xs tracking-wider mb-1">Hours</h3>
                  <p>Monday - Saturday: 06:00 AM - 10:00 PM</p>
                  <p className="text-slate-500">Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Embedded Google Maps iframe placeholder */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-2 h-72 shadow-xl">
            <iframe 
              title="FitZone Gym Islamabad Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.4674751433297!2d72.9972372!3d33.6709322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbe339d2c2069%3A0xe54d92eeeb37452d!2sG-11%20Markaz%20G%2011%20Markaz%20Islamabad!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk" 
              className="w-full h-full rounded-2xl border-0"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Contact;
