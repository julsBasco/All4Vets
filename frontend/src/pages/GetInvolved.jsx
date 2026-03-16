import React, { useState } from 'react';
import { Users, Building, Calendar, Share2, Heart, Mail, CheckCircle, ArrowRight, Megaphone, Handshake, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { siteConfig, images } from '../mock';

const GetInvolved = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest in getting involved! We\'ll be in touch soon.');
    setFormData({ name: '', email: '', interest: '', message: '' });
  };

  const involvementOptions = [
    {
      icon: Users,
      title: 'Volunteer Opportunities',
      description: 'Give your time and skills to help veterans in your community.',
      details: [
        'Administrative support and office assistance',
        'Event planning and coordination',
        'Outreach and community engagement',
        'Professional services (legal, medical, financial advice)'
      ]
    },
    {
      icon: Building,
      title: 'Corporate Partnerships',
      description: 'Partner with All4Vets to make a greater impact together.',
      details: [
        'Sponsor specific programs or events',
        'Match employee donations',
        'Provide in-kind services or products',
        'Host workplace giving campaigns'
      ]
    },
    {
      icon: Calendar,
      title: 'Fundraising Events',
      description: 'Host or participate in events that support our mission.',
      details: [
        'Community fundraisers',
        'Athletic events and challenges',
        'Workplace campaigns',
        'Memorial and tribute events'
      ]
    },
    {
      icon: Share2,
      title: 'Spread the Word',
      description: 'Help us reach more veterans and supporters.',
      details: [
        'Share our mission on social media',
        'Tell friends and family about All4Vets',
        'Write reviews and testimonials',
        'Connect us with potential partners'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-[#0B1D39] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={images.community} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            Get Involved
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your Support Changes Lives — Join us in serving those who served our nation.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 bg-[#F3F5F7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-[#3C4A5B] leading-relaxed">
            Whether you're an individual donor, a corporate partner, or a volunteer, you can make a direct difference in the lives of those who served. There are many ways to support All4Vets and help veterans achieve stability and dignity.
          </p>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-4">
              Ways to Make a Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {involvementOptions.map((option, index) => (
              <Card key={index} className="border-2 hover:border-[#1E4F91] transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-[#0B1D39] rounded-full flex items-center justify-center mr-4">
                      <option.icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0B1D39]">{option.title}</h3>
                  </div>
                  <p className="text-lg text-[#3C4A5B] mb-6">{option.description}</p>
                  <ul className="space-y-3">
                    {option.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle size={20} className="text-[#E64A38] mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-[#3C4A5B]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-4">
              Quick Ways to Help
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/donate">
              <Card className="h-full bg-[#E64A38] text-white border-none hover:scale-105 transition-transform duration-300 cursor-pointer">
                <CardContent className="p-8 text-center">
                  <Heart size={48} className="mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Donate Now</h3>
                  <p className="text-white/90 mb-6">Make a one-time or recurring gift to support veterans in need.</p>
                  <Button className="bg-white text-[#E64A38] hover:bg-gray-100 font-bold px-6 py-3 rounded-full">
                    Give Today <ArrowRight size={18} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Card className="h-full bg-[#0B1D39] text-white border-none">
              <CardContent className="p-8 text-center">
                <Megaphone size={48} className="mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Share Our Mission</h3>
                <p className="text-white/90 mb-6">Follow us on social media and help spread the word about All4Vets.</p>
                <div className="flex justify-center space-x-4">
                  {siteConfig.social.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm font-bold">{social.name[0]}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="h-full bg-[#1E4F91] text-white border-none">
              <CardContent className="p-8 text-center">
                <Gift size={48} className="mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Matching Gifts</h3>
                <p className="text-white/90 mb-6">Double your impact! Check if your employer matches charitable donations.</p>
                <Button className="bg-white text-[#1E4F91] hover:bg-gray-100 font-bold px-6 py-3 rounded-full">
                  Learn More <ArrowRight size={18} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-[#3C4A5B]">
              Fill out the form below and we'll connect you with the right opportunities.
            </p>
          </div>

          <Card className="border-2">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1D39] mb-2">Your Name *</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="border-2 border-gray-300 focus:border-[#1E4F91]"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1D39] mb-2">Email Address *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="border-2 border-gray-300 focus:border-[#1E4F91]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-2">I'm Interested In *</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                  >
                    <option value="">Select an option</option>
                    <option value="volunteer">Volunteering</option>
                    <option value="corporate">Corporate Partnership</option>
                    <option value="fundraising">Hosting a Fundraiser</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-2">Message (Optional)</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[120px]"
                    placeholder="Tell us more about how you'd like to help..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold py-4 text-lg rounded-full"
                >
                  Submit Interest
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Corporate CTA */}
      <section className="py-16 md:py-20 bg-[#0B1D39] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Handshake size={64} className="mx-auto mb-6 text-[#BF9B30]" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Corporate Partnership Opportunities
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Partner with All4Vets to create meaningful impact for veterans while demonstrating your organization's commitment to those who served.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Contact us at <a href={`mailto:${siteConfig.contact.partnershipsEmail}`} className="text-[#BF9B30] hover:underline">{siteConfig.contact.partnershipsEmail}</a>
          </p>
          <Link to="/contact">
            <Button className="bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold px-8 py-4 rounded-full text-lg">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetInvolved;
