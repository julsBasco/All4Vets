import React, { useEffect } from 'react';
import { Heart, CheckCircle, Building, Mail, DollarSign, Users, Shield, Award, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { whyGive, siteConfig, images } from '../mock';
import { openGivebutterWidget, GIVEBUTTER_CAMPAIGN_URL } from '../utils/givebutter';

const Donate = () => {
  // Auto-open Givebutter widget when page loads (optional - uncomment if desired)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     openGivebutterWidget();
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  const impactTiers = [
    { 
      amount: '$25', 
      impact: 'Covers essential expenses',
      description: 'Helps a veteran afford transportation, food, or document fees during the VA claim process.'
    },
    { 
      amount: '$50', 
      impact: 'Provides immediate relief',
      description: 'Supports emergency needs such as utilities, prescriptions, or short-term living costs.'
    },
    { 
      amount: '$100', 
      impact: 'Funds growth opportunities',
      description: 'Contributes to education grants and certification scholarships.'
    },
    { 
      amount: '$250', 
      impact: 'Sustains long-term stability',
      description: 'Offers assistance for rental payments, family emergencies, or extended financial hardships.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-[#0B1D39] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={images.flag} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            Donate — Help Change a Veteran's Story
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Your Support Restores Hope, Stability, and Dignity.
          </p>
          <Button 
            onClick={openGivebutterWidget}
            className="bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold px-10 py-6 text-xl rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Heart size={24} className="mr-3" />
            Donate Now
          </Button>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 bg-[#F3F5F7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-[#3C4A5B] leading-relaxed">
            Every day, veterans across the country struggle to make ends meet while waiting for VA support. Your donation helps them bridge that gap — offering immediate financial relief, assistance with disability claims, and scholarships for brighter futures. Together, we ensure that no veteran who served our nation ever has to face hardship alone.
          </p>
        </div>
      </section>

      {/* Impact Tiers Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-4">
              Choose Your Impact
            </h2>
            <p className="text-lg text-[#3C4A5B]">
              See how your gift helps veterans in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {impactTiers.map((tier, index) => (
              <Card key={index} className="border-2 hover:border-[#E64A38] transition-all duration-300 cursor-pointer" onClick={openGivebutterWidget}>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-black text-[#0B1D39] mb-2">{tier.amount}</p>
                  <p className="text-[#E64A38] font-semibold mb-3">{tier.impact}</p>
                  <p className="text-sm text-[#3C4A5B]">{tier.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={openGivebutterWidget}
              className="bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold px-10 py-4 text-lg rounded-full"
            >
              <Heart size={20} className="mr-2" />
              Make a Donation
            </Button>
            <p className="mt-4 text-sm text-[#3C4A5B]">
              Or donate directly at{' '}
              <a href={GIVEBUTTER_CAMPAIGN_URL} target="_blank" rel="noopener noreferrer" className="text-[#1E4F91] hover:underline">
                givebutter.com/All4Vets-Fundraising-Campaign
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Why Give Section */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-4">
              Why Give to All4Vets?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyGive.map((reason) => {
              const icons = [DollarSign, CheckCircle, Users, Award];
              const Icon = icons[reason.id - 1];
              return (
                <Card key={reason.id} className="border-2 hover:border-[#1E4F91] transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[#0B1D39] rounded-full flex items-center justify-center mb-4">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1D39] mb-2">{reason.title}</h3>
                    <p className="text-sm text-[#3C4A5B]">{reason.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Monthly Giving Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-6">
                Become a Sustaining Donor
              </h2>
              <p className="text-lg text-[#3C4A5B] leading-relaxed mb-6">
                Make an even greater impact by joining our "Sustain a Hero" monthly giving program. Your recurring contribution ensures consistent support for veterans waiting on their VA benefits.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle size={24} className="text-[#E64A38] mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-[#3C4A5B]">Predictable funding helps us plan and serve more veterans</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={24} className="text-[#E64A38] mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-[#3C4A5B]">Receive exclusive updates on the impact of your giving</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={24} className="text-[#E64A38] mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-[#3C4A5B]">Easy to manage — cancel or modify anytime</span>
                </li>
              </ul>
              <Button 
                onClick={openGivebutterWidget}
                className="bg-[#0B1D39] hover:bg-[#1E4F91] text-white font-bold px-8 py-4 rounded-full"
              >
                Become a Monthly Donor
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
            <div className="bg-[#0B1D39] p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-6">Your Monthly Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                  <span>$25/month</span>
                  <span className="text-[#BF9B30]">Covers essential expenses for 1 veteran</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                  <span>$50/month</span>
                  <span className="text-[#BF9B30]">Emergency relief for 2 veterans</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                  <span>$100/month</span>
                  <span className="text-[#BF9B30]">Fund education grant each quarter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate & Matching Gifts */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Building size={48} className="mx-auto mb-4 text-[#0B1D39]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-4">
              Corporate & Matching Gifts
            </h2>
            <p className="text-lg text-[#3C4A5B] max-w-2xl mx-auto">
              Businesses and organizations can create dedicated sponsorships, fund specific programs, or match employee donations.
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg text-[#3C4A5B] mb-6">
              Contact us at <a href={`mailto:${siteConfig.contact.email}`} className="text-[#1E4F91] font-semibold hover:underline">{siteConfig.contact.email}</a> to explore partnership opportunities.
            </p>
            <Button 
              onClick={openGivebutterWidget}
              className="bg-[#0B1D39] hover:bg-[#1E4F91] text-white font-bold px-8 py-4 rounded-full"
            >
              Explore Corporate Partnerships
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Accountability */}
      <section className="py-16 md:py-20 bg-[#0B1D39] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award size={64} className="mx-auto mb-6 text-[#BF9B30]" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Trust & Accountability</h2>
          <p className="text-xl text-gray-300 mb-8">
            All4Vets is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            EIN: {siteConfig.ein}
          </p>
          
          {/* Mail-in Donation */}
          <div className="bg-white/10 p-6 rounded-lg inline-block">
            <Mail size={32} className="mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Prefer to Send a Check?</h3>
            <p className="text-gray-300">
              Make checks payable to: <strong>All4Vets, Inc.</strong><br />
              {siteConfig.contact.address}<br />
              {siteConfig.contact.city}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-[#E64A38] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl font-semibold mb-6">
            However you choose to give — thank you for standing behind those who stood for all of us.
          </p>
          <Button 
            onClick={openGivebutterWidget}
            className="bg-white text-[#E64A38] hover:bg-gray-100 font-bold px-8 py-4 rounded-full"
          >
            <Heart size={20} className="mr-2" />
            Donate Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
