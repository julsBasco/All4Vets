import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { navLinks, siteConfig } from "../mock";
import logo from "./logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (url) => {
    if (url === "/") {
      return location.pathname === "/" || location.pathname === "";
    }
    return location.pathname.startsWith(url);
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#0B1D39] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-xs">
            <div className="hidden sm:flex items-center space-x-4">
              <span>
                <a href={`tel:${siteConfig.contact.phone}`}>
                  {siteConfig.contact.phone}
                </a>
              </span>
              <span className="text-gray-400">|</span>
              <span>
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </span>
            </div>
            <div className="flex items-center space-x-4 ml-auto">
              <span className="text-[#BF9B30] font-medium">
                {siteConfig.nonprofit}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="All4Vets Logo" className="h-14 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.url}
                  className={`px-4 py-2 text-sm font-semibold transition-colors relative group ${
                    isActive(link.url)
                      ? "text-[#B31942]"
                      : "text-[#0B1D39] hover:text-[#1E4F91]"
                  }`}
                >
                  {link.title}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#B31942] transition-all duration-300 ${
                      isActive(link.url) ? "w-3/4" : "w-0 group-hover:w-3/4"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link to="/donate">
                <Button className="bg-[#B31942] hover:bg-[#d43e2e] text-white font-bold px-6 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg">
                  Donate Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#0B1D39] hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                    isActive(link.url)
                      ? "text-[#B31942] bg-red-50"
                      : "text-[#0B1D39] hover:bg-gray-100"
                  }`}
                >
                  {link.title}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#B31942] hover:bg-[#d43e2e] text-white font-bold py-3 rounded-full">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
