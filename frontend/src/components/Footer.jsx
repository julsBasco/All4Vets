import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { siteConfig, footerLinks } from '../mock';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="All4Vets Logo" 
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm text-gray-300 mb-4">
              We empower veterans with resources, one‑on‑one support, and a trusted network to navigate benefits and life transitions.
            </p>
            <div className="flex space-x-3">
              {siteConfig.social.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-9 h-9 rounded-full bg-[#1E4F91] flex items-center justify-center hover:bg-[#2a5fa5] transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* About Us Column */}
          <div>
            <h3 className="font-bold text-sm uppercase mb-4 tracking-wide">About Us</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.url}
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-block"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-bold text-sm uppercase mb-4 tracking-wide">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.url}
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-block"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-bold text-sm uppercase mb-4 tracking-wide">Stay Connected</h3>
            <p className="text-sm text-gray-300 mb-4">Get updates on our programs and impact.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white focus:ring-1 focus:ring-white"
              />
              <Button
                type="submit"
                className="w-full bg-[#E64A38] hover:bg-[#d43e2e] text-white font-semibold rounded-full"
              >
                Subscribe
              </Button>
            </form>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400 mb-1">Contact Us</p>
              <p className="text-sm text-gray-300">{siteConfig.contact.email}</p>
              <p className="text-sm text-gray-300">{siteConfig.contact.phone}</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <div className="flex items-center text-gray-400">
                <Lock size={12} className="mr-1" />
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