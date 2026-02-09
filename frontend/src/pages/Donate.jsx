import React, { useState } from 'react';
import { Heart, CheckCircle, Building, Mail, CreditCard, DollarSign, Users, Shield, Award, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { donationTiers, whyGive, siteConfig, images } from '../mock';

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [donationType, setDonationType] = useState('one-time');

  const handleDonation = (e) => {
    e.preventDefault();
    const amount = showCustomInput ? customAmount : selectedAmount;
    console.log('Donation:', { amount, type: donationType });
    alert(`Thank you for your ${donationType} donation of $${amount}! This will make a real difference in veterans' lives.`);
  };

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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your Support Restores Hope, Stability, and Dignity.
          </p>
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

      {/* Main Donation Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <div>
              <Card className="shadow-xl border-2">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#0B1D39] mb-2">Choose Your Impact</h2>
                  <p className="text-[#3C4A5B] mb-6">Select an amount to see how your gift helps veterans.</p>

                  {/* Donation Type Toggle */}
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => setDonationType('one-time')}
                      className={`flex-1 py-3 px-4 rounded-full font-semibold transition-all duration-200 ${
                        donationType === 'one-time'
                          ? 'bg-[#0B1D39] text-white'
                          : 'bg-gray-100 text-[#3C4A5B] hover:bg-gray-200'
                      }`}
                    >
                      One-Time Gift
                    </button>
                    <button
                      onClick={() => setDonationType('monthly')}
                      className={`flex-1 py-3 px-4 rounded-full font-semibold transition-all duration-200 ${
                        donationType === 'monthly'
                          ? 'bg-[#0B1D39] text-white'
                          : 'bg-gray-100 text-[#3C4A5B] hover:bg-gray-200'
                      }`}
                    >
                      Monthly Giving
                    </button>
                  </div>

                  <form onSubmit={handleDonation}>
                    <RadioGroup value={selectedAmount} onValueChange={setSelectedAmount} className="mb-6">
                      <div className="space-y-3">
                        {donationTiers.map((tier) => (
                          <div key={tier.value}>
                            <RadioGroupItem
                              value={tier.value.toString()}
                              id={`amount-${tier.value}`}
                              className="peer sr-only"
                              onClick={() => setShowCustomInput(false)}
                            />
                            <Label
                              htmlFor={`amount-${tier.value}`}
                              className="flex items-center justify-between rounded-lg border-2 border-gray-200 p-4 cursor-pointer hover:border-[#1E4F91] peer-data-[state=checked]:border-[#0B1D39] peer-data-[state=checked]:bg-[#0B1D39]/5 transition-all duration-200"
                            >
                              <div className="flex items-center">
                                <span className="text-2xl font-bold text-[#0B1D39] mr-4">{tier.label}</span>
                                <span className="text-[#E64A38] font-semibold">{tier.impact}</span>
                              </div>
                              <CheckCircle className={`w-6 h-6 ${selectedAmount === tier.value.toString() && !showCustomInput ? 'text-[#0B1D39]' : 'text-gray-300'}`} />
                            </Label>
                            {selectedAmount === tier.value.toString() && !showCustomInput && (
                              <p className="text-sm text-[#3C4A5B] mt-2 ml-4">{tier.description}</p>
                            )}
                          </div>
                        ))}

                        {/* Custom Amount */}
                        <div>
                          <RadioGroupItem
                            value="custom"
                            id="amount-custom"
                            className="peer sr-only"
                            onClick={() => setShowCustomInput(true)}
                          />
                          <Label
                            htmlFor="amount-custom"
                            className="flex items-center justify-between rounded-lg border-2 border-gray-200 p-4 cursor-pointer hover:border-[#1E4F91] peer-data-[state=checked]:border-[#0B1D39] peer-data-[state=checked]:bg-[#0B1D39]/5 transition-all duration-200"
                          >
                            <div className="flex items-center">
                              <span className="text-lg font-bold text-[#3C4A5B] mr-4">Other Amount</span>
                              <span className="text-[#3C4A5B]">Custom support</span>
                            </div>
                            <CheckCircle className={`w-6 h-6 ${showCustomInput ? 'text-[#0B1D39]' : 'text-gray-300'}`} />
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    {showCustomInput && (
                      <div className="mb-6">
                        <Label htmlFor="custom-amount" className="block text-sm font-semibold text-[#0B1D39] mb-2">
                          Enter Amount
                        </Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3C4A5B] font-semibold text-lg">$</span>
                          <Input
                            id="custom-amount"
                            type="number"
                            min="1"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="pl-10 py-4 text-lg border-2 border-gray-300 focus:border-[#1E4F91]"
                            required={showCustomInput}
                          />
                        </div>
                        <p className="text-sm text-[#3C4A5B] mt-2">Every contribution matters, no matter the size—each dollar brings relief and respect to those who served.</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold py-4 text-lg rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <Heart size={20} className="mr-2" />
                      {donationType === 'monthly' ? 'Become a Monthly Donor' : 'Donate Now'}
                    </Button>

                    <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center text-sm text-[#3C4A5B]">
                      <Shield size={16} className="mr-2 text-green-600" />
                      <span>100% Secure Payment Processing</span>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Why Give Section */}
            <div>
              <h2 className="text-2xl font-bold text-[#0B1D39] mb-6">Why Give to All4Vets?</h2>
              <div className="space-y-6">
                {whyGive.map((reason) => {
                  const icons = [DollarSign, CheckCircle, Users, Award];
                  const Icon = icons[reason.id - 1];
                  return (
                    <Card key={reason.id} className="border-2 hover:border-[#1E4F91] transition-all duration-300">
                      <CardContent className="p-6 flex items-start">
                        <div className="w-12 h-12 bg-[#0B1D39] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                          <Icon size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#0B1D39] mb-1">{reason.title}</h3>
                          <p className="text-[#3C4A5B]">{reason.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustaining Donor Section */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
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
                onClick={() => setDonationType('monthly')}
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
      <section className="py-16 md:py-20 bg-white">
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
              Contact us at <a href={`mailto:${siteConfig.contact.partnershipsEmail}`} className="text-[#1E4F91] font-semibold hover:underline">{siteConfig.contact.partnershipsEmail}</a> to explore partnership opportunities.
            </p>
            <Button className="bg-[#0B1D39] hover:bg-[#1E4F91] text-white font-bold px-8 py-4 rounded-full">
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
          <p className="text-xl font-semibold">
            However you choose to give — thank you for standing behind those who stood for all of us.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
