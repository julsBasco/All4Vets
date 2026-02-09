import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Lock, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { siteConfig, footerLinks } from '../mock';
import logo from './logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  const socialIcons = {
    Facebook: Facebook,
    Twitter: Twitter,
    LinkedIn: Linkedin,
    Instagram: Instagram
  };

  return (
    <footer className="bg-[#0B1D39] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={logo}
                alt="All4Vets Logo" 
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Empowering veterans through financial aid, scholarships, and emergency relief.
            </p>
            <div className="flex space-x-3">
              {siteConfig.social.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E64A38] transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="font-bold text-sm uppercase mb-6 tracking-wide text-[#BF9B30]">Programs</h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.url}
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-bold text-sm uppercase mb-6 tracking-wide text-[#BF9B30]">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.url}
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact Column */}
          <div>
            <h3 className="font-bold text-sm uppercase mb-6 tracking-wide text-[#BF9B30]">Stay Connected</h3>
            <p className="text-sm text-gray-300 mb-4">Get updates on our programs and impact.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3 mb-8">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#BF9B30] focus:ring-1 focus:ring-[#BF9B30]"
              />
              <Button
                type="submit"
                className="w-full bg-[#E64A38] hover:bg-[#d43e2e] text-white font-semibold rounded-full"
              >
                Subscribe
              </Button>
            </form>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-300">
                <Mail size={16} className="mr-3 text-[#BF9B30]" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="mr-3 text-[#BF9B30]" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Row */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {siteConfig.nonprofit} • EIN: {siteConfig.ein}
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <div className="flex items-center text-gray-400">
                <Lock size={14} className="mr-1" />
                <span className="text-xs">Secure Site</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
