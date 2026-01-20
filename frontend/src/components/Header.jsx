import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { navLinks, siteConfig } from '../mock';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#F3F5F7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-8 space-x-4 text-xs text-[#3C4A5B]">
            <button className="hover:text-[#0B1D39] transition-colors">Accessibility</button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-[#0B1D39] transition-colors">Login</button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-[#0B1D39] transition-colors">Eng</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#0B1D39] rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#E64A38] rounded-sm"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0B1D39] tracking-tight">{siteConfig.siteName}</h1>
                <p className="text-[10px] text-[#3C4A5B] leading-none">{siteConfig.nonprofit}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  className="text-sm font-medium text-[#3C4A5B] hover:text-[#0B1D39] transition-colors relative pb-1 group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E64A38] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button
                className="bg-[#E64A38] hover:bg-[#d43e2e] text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Donate Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#0B1D39]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  className="block text-sm font-medium text-[#3C4A5B] hover:text-[#0B1D39] py-2"
                >
                  {link.title}
                </a>
              ))}
              <Button
                className="w-full bg-[#E64A38] hover:bg-[#d43e2e] text-white font-semibold py-2 rounded-full mt-4"
              >
                Donate Now
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;