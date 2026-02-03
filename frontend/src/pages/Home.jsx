import React, { useState, useEffect } from 'react';
import { Users, Heart, Link as LinkIcon, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { hero, missionPillars, processSteps, testimonials, donationAmounts, quickLinks } from '../mock';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handleDonation = (e) => {
    e.preventDefault();
    const amount = showCustomInput ? customAmount : selectedAmount;
    console.log('Donation amount:', amount);
    alert(`Thank you for your donation of $${amount}!`);
  };

  const iconMap = {
    users: Users,
    heart: Heart,
    link: LinkIcon
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1D39] via-[#1a2f4d] to-[#0B1D39] text-white overflow-hidden">
        {/* Subtle patriotic background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(230, 74, 56, 0.3) 40px, rgba(230, 74, 56, 0.3) 80px)',
            transform: 'skewY(-12deg)',
            transformOrigin: '0'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-[#BF9B30]">
              <CheckCircle size={16} className="mr-2 text-[#BF9B30]" />
              <span className="text-sm font-medium">501(c)(3) Nonprofit Organization</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 leading-tight">
              {hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {hero.subtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold px-8 py-6 text-lg rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                {hero.primaryCTA}
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0B1D39] font-bold px-8 py-6 text-lg rounded-full transition-all duration-200"
              >
                {hero.secondaryCTA}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Impact Section */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] uppercase tracking-tight mb-4">
              Our Mission & Impact
            </h2>
            <p className="text-lg text-[#3C4A5B] max-w-2xl mx-auto">
              We empower veterans with resources, one‑on‑one support, and a trusted network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {missionPillars.map((pillar) => {
              const Icon = iconMap[pillar.icon];
              return (
                <div key={pillar.id} className="text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0B1D39] rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1D39] mb-3 uppercase tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-[#3C4A5B] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] uppercase tracking-tight mb-4">
              3‑Step Process
            </h2>
            <p className="text-lg text-[#3C4A5B]">
              Getting support is simple and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <Card
                key={step.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-[#1E4F91]"
              >
                <CardContent className="p-8">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#0B1D39] group-hover:bg-[#1E4F91] flex items-center justify-center text-white font-bold text-lg transition-colors duration-300">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1D39] mb-3">{step.title}</h3>
                  <p className="text-[#3C4A5B] leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation & Testimonial Section */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Testimonial Card */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#0B1D39] mb-6 uppercase tracking-tight">
                  Support Our Cause
                </h3>
                <p className="text-[#3C4A5B] mb-8 leading-relaxed">
                  Be part of the change. Your voice—and your gift—matters. Every contribution helps us provide life-changing support to veterans in need.
                </p>

                {/* Testimonial Carousel */}
                <div className="bg-[#0B1D39] text-white p-6 rounded-lg relative min-h-[200px]">
                  <div className="mb-4">
                    <p className="text-lg italic mb-4 leading-relaxed">
                      "{testimonials[currentTestimonial].quote}"
                    </p>
                    <p className="font-semibold">{testimonials[currentTestimonial].author}</p>
                    <p className="text-sm text-gray-300">{testimonials[currentTestimonial].branch}</p>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center justify-between mt-6">
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
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentTestimonial ? 'bg-[#E64A38] w-6' : 'bg-white/30'
                          }`}
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
              </CardContent>
            </Card>

            {/* Donation Card */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#0B1D39] mb-2 uppercase tracking-tight">
                  Make a Difference Today
                </h3>
                <p className="text-sm text-[#3C4A5B] mb-6">
                  Your gift funds direct services. 100% secure payment processing.
                </p>

                <form onSubmit={handleDonation}>
                  <RadioGroup value={selectedAmount} onValueChange={setSelectedAmount} className="mb-6">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {donationAmounts.map((amount) => (
                        <div key={amount.value}>
                          <RadioGroupItem
                            value={amount.value.toString()}
                            id={`amount-${amount.value}`}
                            className="peer sr-only"
                            onClick={() => setShowCustomInput(false)}
                          />
                          <Label
                            htmlFor={`amount-${amount.value}`}
                            className="flex items-center justify-center rounded-full border-2 border-[#0B1D39] py-3 px-6 font-bold text-[#0B1D39] cursor-pointer hover:bg-[#0B1D39] hover:text-white peer-data-[state=checked]:bg-[#0B1D39] peer-data-[state=checked]:text-white transition-all duration-200"
                          >
                            {amount.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div>
                      <RadioGroupItem
                        value="custom"
                        id="amount-custom"
                        className="peer sr-only"
                        onClick={() => setShowCustomInput(true)}
                      />
                      <Label
                        htmlFor="amount-custom"
                        className="flex items-center justify-center rounded-full border-2 border-[#3C4A5B] py-3 px-6 font-bold text-[#3C4A5B] cursor-pointer hover:bg-[#3C4A5B] hover:text-white peer-data-[state=checked]:bg-[#3C4A5B] peer-data-[state=checked]:text-white transition-all duration-200"
                      >
                        Other Amount
                      </Label>
                    </div>
                  </RadioGroup>

                  {showCustomInput && (
                    <div className="mb-6">
                      <Label htmlFor="custom-amount" className="block text-sm font-semibold text-[#0B1D39] mb-2">
                        Enter Amount
                      </Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3C4A5B] font-semibold">$</span>
                        <Input
                          id="custom-amount"
                          type="number"
                          min="1"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="pl-8 py-3 border-2 border-gray-300 focus:border-[#1E4F91] focus:ring-2 focus:ring-[#1E4F91]/20"
                          required={showCustomInput}
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold py-4 text-lg rounded-full transition-all duration-200 shadow-md hover:shadow-lg mb-3"
                  >
                    Contribute Now
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-2 border-[#0B1D39] text-[#0B1D39] hover:bg-[#0B1D39] hover:text-white font-semibold py-3 rounded-full transition-all duration-200"
                  >
                    Learn More About Our Impact
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center text-sm text-[#3C4A5B]">
                  <CheckCircle size={16} className="mr-2 text-green-600" />
                  <span>Secure payment processing</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Band */}
      <section className="bg-[#0B1D39] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.url}
                className="text-white hover:text-[#E64A38] font-semibold text-sm md:text-base transition-colors duration-200"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;