import React, { useState, useEffect } from "react";
import {
  FileText,
  GraduationCap,
  Heart,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Users,
  Building,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  hero,
  aboutSection,
  missionPillars,
  processSteps,
  testimonials,
  impactStats,
  getInvolved,
  ctaBanner,
  images,
} from "../mock";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const iconMap = {
    fileText: FileText,
    graduationCap: GraduationCap,
    heart: Heart,
    users: Users,
    building: Building,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${images.hero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D39]/95 via-[#0B1D39]/80 to-[#0B1D39]/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 leading-tight text-white text-center">
                {hero.headline}
              </h1>
              <div className="flex justify-center items-center mb-6">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#BF9B30]">
                  <CheckCircle size={16} className="mr-2 text-[#BF9B30]" />
                  <span className="text-sm font-medium text-white">
                    501(c)(3) Nonprofit Organization
                  </span>
                </div>
              </div>
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed text-center">
                {hero.subtext}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex justify-center items-center">
              <Link to="/programs">
                <Button className="bg-[#B31942] hover:bg-[#d43e2e] text-white font-bold px-8 py-6 text-lg rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                  {hero.secondaryCTA}
                </Button>
              </Link>
              <Link to="/donate">
                <Button className="bg-white text-[#0B1D39] hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">
                  {hero.primaryCTA}
                </Button>
              </Link>
              <Link to="/get-involved">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#0B1D39] font-bold px-8 py-6 text-lg rounded-full transition-all duration-200"
                >
                  {hero.tertiaryCTA}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-6">
                {aboutSection.headline}
              </h2>
              <p className="text-lg text-[#3C4A5B] leading-relaxed mb-8">
                {aboutSection.content}
              </p>
              <Link to="/about">
                <Button className="bg-[#0B1D39] hover:bg-[#1E4F91] text-white font-semibold px-6 py-3 rounded-full transition-all duration-200">
                  {aboutSection.cta}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src={images.military}
                alt="Veterans being honored"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#B31942] text-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm">Committed to Veterans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] uppercase tracking-tight mb-4">
              Real Support for Real Heroes
            </h2>
            <p className="text-lg text-[#3C4A5B] max-w-2xl mx-auto">
              We provide targeted financial assistance through three core
              programs designed to meet veterans where they are.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionPillars.map((pillar) => {
              const Icon = iconMap[pillar.icon];
              return (
                <Card
                  key={pillar.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#1E4F91] bg-white"
                >
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0B1D39] rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1D39] mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-[#3C4A5B] leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/programs">
              <Button className="bg-[#0B1D39] hover:bg-[#1E4F91] text-white font-semibold px-8 py-4 rounded-full transition-all duration-200">
                Explore Our Programs
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-20 bg-[#0B1D39] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
              Impact That Matters
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Your generosity makes a real difference in the lives of veterans
              and their families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-8 bg-white/5 rounded-lg backdrop-blur-sm"
              >
                <div className="flex justify-center mb-4">
                  <TrendingUp size={32} className="text-[#BF9B30]" />
                </div>
                <p className="text-4xl md:text-5xl font-black text-[#BF9B30] mb-2">
                  {stat.value}
                </p>
                <p className="text-xl font-semibold mb-2">{stat.label}</p>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] uppercase tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[#3C4A5B]">
              Getting support is simple and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <Card
                key={step.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-[#1E4F91] text-center inline-flex items-center justify-center"
              >
                <CardContent className="p-8 ">
                  <div className="flex items-start mb-4 inline-flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#0B1D39] group-hover:bg-[#1E4F91] flex items-center justify-center text-white font-bold text-lg transition-colors duration-300">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1D39] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#3C4A5B] leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] uppercase tracking-tight mb-4">
              Veterans' Testimonials
            </h2>
          </div>

          <div className="bg-[#0B1D39] text-white p-8 md:p-12 rounded-2xl relative">
            <div className="text-center">
              <p className="text-xl md:text-2xl italic mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <p className="font-semibold text-lg">
                {testimonials[currentTestimonial].author}
              </p>
              <p className="text-gray-300">
                {testimonials[currentTestimonial].branch}
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <button
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentTestimonial ? "bg-[#B31942] w-6" : "bg-white/30"}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] uppercase tracking-tight mb-4">
              {getInvolved.headline}
            </h2>
            <p className="text-lg text-[#3C4A5B] max-w-2xl mx-auto">
              {getInvolved.subtext}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getInvolved.options.map((option, index) => {
              const Icon = iconMap[option.icon];
              return (
                <Link key={index} to={option.url}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#B31942] h-full cursor-pointer">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#B31942] rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={28} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#0B1D39] mb-3">
                        {option.title}
                      </h3>
                      <p className="text-[#3C4A5B]">{option.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="relative py-20 md:py-28 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${images.flag})` }}
      >
        <div className="absolute inset-0 bg-[#0B1D39]/90"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-6">
            {ctaBanner.headline}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {ctaBanner.subtext}
          </p>
          <Link to="/donate">
            <Button className="bg-[#B31942] hover:bg-[#d43e2e] text-white font-bold px-10 py-6 text-lg rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
              {ctaBanner.cta}
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
