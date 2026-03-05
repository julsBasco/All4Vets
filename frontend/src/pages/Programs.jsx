import React, { useState } from 'react';
import { FileText, GraduationCap, AlertCircle, CheckCircle, ArrowRight, Clock, DollarSign, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApplicationModal from '../components/ApplicationModal';
import { programs, guidingPrinciples, images } from '../mock';
import { openGivebutterWidget } from '../utils/givebutter';

const Programs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const iconMap = {
    fileText: FileText,
    graduationCap: GraduationCap,
    alertCircle: AlertCircle
  };

  const programTypeMap = {
    'va-disability-claims': 'vmeaf',
    'scholarships-education': 'scholarship',
    'emergency-relief': 'emergency'
  };

  const handleApplyClick = (programSlug) => {
    setSelectedProgram(programTypeMap[programSlug]);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-[#0B1D39] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={images.programs} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            Our Programs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real Support for Real Heroes — Empowering veterans to achieve stability and dignity through targeted financial assistance.
          </p>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-4">
              How We Help Veterans
            </h2>
            <p className="text-lg text-[#3C4A5B] max-w-3xl mx-auto">
              All4Vets provides targeted financial assistance through three core programs designed to remove financial barriers and help veterans thrive.
            </p>
          </div>

          {/* Program Cards */}
          <div className="space-y-16">
            {programs.map((program, index) => {
              const Icon = iconMap[program.icon];
              const isEven = index % 2 === 0;
              
              return (
                <div key={program.id} id={program.slug} className="scroll-mt-24">
                  <Card className="overflow-hidden border-2 hover:border-[#1E4F91] transition-all duration-300">
                    <CardContent className="p-0">
                      <div className={`grid grid-cols-1 lg:grid-cols-2 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                        {/* Content Side */}
                        <div className="p-8 md:p-12">
                          <div className="flex items-center mb-6">
                            <div className="w-14 h-14 bg-[#0B1D39] rounded-full flex items-center justify-center mr-4">
                              <Icon size={28} className="text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#0B1D39]">
                              {program.title}
                            </h3>
                          </div>
                          
                          <p className="text-lg text-[#3C4A5B] leading-relaxed mb-6">
                            {program.fullDescription}
                          </p>

                          {/* What It Covers/Supports */}
                          <div className="mb-6">
                            <h4 className="text-lg font-bold text-[#0B1D39] mb-3">
                              {program.whatItCovers ? 'What It Covers:' : program.whatItSupports ? 'What It Supports:' : 'Emergency Aid Covers:'}
                            </h4>
                            <ul className="space-y-2">
                              {(program.whatItCovers || program.whatItSupports || program.emergencyAidCovers)?.map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <CheckCircle size={20} className="text-[#E64A38] mr-3 flex-shrink-0 mt-0.5" />
                                  <span className="text-[#3C4A5B]">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* How It Works (if available) */}
                          {program.howItWorks && (
                            <div className="mb-6 p-4 bg-[#F3F5F7] rounded-lg">
                              <h4 className="text-lg font-bold text-[#0B1D39] mb-2">How It Works:</h4>
                              <p className="text-[#3C4A5B]">{program.howItWorks}</p>
                            </div>
                          )}

                          {/* Impact Goals (if available) */}
                          {program.impactGoals && (
                            <div className="mb-6">
                              <h4 className="text-lg font-bold text-[#0B1D39] mb-3">Impact Goals:</h4>
                              <ul className="space-y-2">
                                {program.impactGoals.map((goal, i) => (
                                  <li key={i} className="flex items-start">
                                    <ArrowRight size={20} className="text-[#BF9B30] mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="text-[#3C4A5B]">{goal}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Testimonial (if available) */}
                          {program.testimonial && (
                            <div className="mb-6 p-4 bg-[#0B1D39] text-white rounded-lg">
                              <p className="italic mb-2">"{program.testimonial.quote}"</p>
                              <p className="text-sm text-gray-300">— {program.testimonial.author}, {program.testimonial.branch}</p>
                            </div>
                          )}

                          {/* CTAs */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                              onClick={() => handleApplyClick(program.slug)}
                              className="bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold px-6 py-3 rounded-full"
                            >
                              {program.primaryCTA}
                            </Button>
                            <Button 
                              onClick={openGivebutterWidget}
                              variant="outline" 
                              className="border-2 border-[#0B1D39] text-[#0B1D39] hover:bg-[#0B1D39] hover:text-white font-bold px-6 py-3 rounded-full"
                            >
                              {program.secondaryCTA}
                            </Button>
                          </div>
                        </div>

                        {/* Image Side */}
                        <div className={`bg-[#F3F5F7] flex items-center justify-center p-8 ${!isEven ? 'lg:order-first' : ''}`}>
                          <div className="w-full h-full min-h-[300px] bg-[#0B1D39] rounded-lg flex items-center justify-center">
                            <Icon size={120} className="text-white/20" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-4">
              Our Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guidingPrinciples.map((principle, index) => {
              const icons = [Clock, DollarSign, Users];
              const Icon = icons[index];
              return (
                <Card key={principle.id} className="bg-white border-2 hover:border-[#BF9B30] transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#BF9B30] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1D39] mb-4">{principle.title}</h3>
                    <p className="text-[#3C4A5B] leading-relaxed">{principle.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#0B1D39] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            If you're a veteran in need of assistance, we're here to help. Apply today and take the first step toward the support you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleApplyClick('va-disability-claims')}
              className="bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold px-8 py-4 rounded-full text-lg"
            >
              Apply for Aid Now
            </Button>
            <Button 
              onClick={openGivebutterWidget}
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#0B1D39] font-bold px-8 py-4 rounded-full text-lg"
            >
              Donate Now
            </Button>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <ApplicationModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        programType={selectedProgram}
      />

      <Footer />
    </div>
  );
};

export default Programs;
