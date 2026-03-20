import React from "react";
import {
  Shield,
  Eye,
  Heart,
  CheckCircle,
  Users,
  Award,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteConfig, guidingPrinciples, images } from "../mock";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Honor",
      description:
        "We honor the service and sacrifice of every veteran by treating them with dignity and respect.",
    },
    {
      icon: Eye,
      title: "Transparency",
      description:
        "Every dollar is tracked and accounted for. We believe donors deserve to know exactly how their contributions help.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We approach every veteran's situation with empathy, understanding that each journey is unique.",
    },
    {
      icon: Target,
      title: "Impact",
      description:
        "We focus on creating measurable, meaningful change in the lives of veterans and their families.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-[#0B1D39] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={images.military}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            About All4Vets
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Serving Those Who've Served Our Nation
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-[#3C4A5B] leading-relaxed mb-6">
                All4Vets is a nonprofit organization devoted to helping U.S.
                veterans overcome financial hardships through donor-funded
                support. We understand that many veterans face significant
                barriers when pursuing the benefits they've rightfully earned.
              </p>
              <p className="text-lg text-[#3C4A5B] leading-relaxed mb-6">
                Whether it's assistance with VA disability claims, educational
                scholarships, or emergency relief, our mission is simple but
                profound—to ensure that no veteran is left behind due to
                financial struggle.
              </p>
              <p className="text-lg text-[#3C4A5B] leading-relaxed">
                Every contribution directly strengthens the lives of those who
                once defended ours. We believe in honoring service through
                support.
              </p>
            </div>
            <div className="relative">
              <img
                src={images.community}
                alt="Community support"
                className="rounded-lg shadow-xl w-full h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 md:py-20 bg-[#F3F5F7] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ">
            <Card className="bg-[#0B1D39] text-white border-none">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 bg-[#B31942] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Target size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To empower veterans through financial assistance, removing
                  barriers to the benefits and opportunities they've earned
                  through their service to our nation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1E4F91] text-white border-none">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 bg-[#BF9B30] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Eye size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  A world where every veteran has the financial resources needed
                  to secure their benefits, pursue education, and overcome
                  life's challenges with dignity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#B31942] text-white border-none">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Heart size={28} className="text-[#B31942]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Promise</h3>
                <p className="text-gray-200 leading-relaxed">
                  We promise to treat every veteran with respect, operate with
                  complete transparency, and ensure that every dollar donated
                  goes toward meaningful impact.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-4">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-2 hover:border-[#1E4F91] transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#0B1D39] rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#3C4A5B]">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-4">
              Our Guiding Principles
            </h2>
            <p className="text-lg text-[#3C4A5B] max-w-2xl mx-auto">
              These principles guide every decision we make and every action we
              take.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guidingPrinciples.map((principle) => (
              <div
                key={principle.id}
                className="text-center p-8 bg-[#F3F5F7] rounded-lg"
              >
                <div className="w-16 h-16 bg-[#BF9B30] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">
                    {principle.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0B1D39] mb-4">
                  {principle.title}
                </h3>
                <p className="text-[#3C4A5B] leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-16 md:py-20 bg-[#0B1D39] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Commitment to Transparency
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We believe that donors deserve to know exactly where their money
                goes. That's why we maintain complete transparency in all our
                operations.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle
                    size={24}
                    className="text-[#BF9B30] mr-3 flex-shrink-0 mt-1"
                  />
                  <span>
                    90% of all contributions go directly to veteran aid programs
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    size={24}
                    className="text-[#BF9B30] mr-3 flex-shrink-0 mt-1"
                  />
                  <span>
                    Every grant is tracked and audited for full accountability
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    size={24}
                    className="text-[#BF9B30] mr-3 flex-shrink-0 mt-1"
                  />
                  <span>
                    Annual reports available to all donors and stakeholders
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    size={24}
                    className="text-[#BF9B30] mr-3 flex-shrink-0 mt-1"
                  />
                  <span>Regular impact updates shared with our community</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <div className="text-center">
                <Award size={64} className="mx-auto mb-6 text-[#BF9B30]" />
                <h3 className="text-2xl font-bold mb-4">501(c)(3) Status</h3>
                <p className="text-gray-300 mb-4">
                  All4Vets is a registered 501(c)(3) nonprofit organization. All
                  donations are tax-deductible to the fullest extent allowed by
                  law.
                </p>
                <p className="text-sm text-gray-400">EIN: {siteConfig.ein}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg text-[#3C4A5B] mb-8 max-w-2xl mx-auto">
            Whether you're a veteran seeking assistance or someone who wants to
            support our mission, we welcome you to the All4Vets family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/programs">
              <Button className="bg-[#0B1D39] hover:bg-[#1E4F91] text-white font-bold px-8 py-4 rounded-full">
                Explore Our Programs
              </Button>
            </Link>
            <Link to="/donate">
              <Button className="bg-[#B31942] hover:bg-[#d43e2e] text-white font-bold px-8 py-4 rounded-full">
                Support Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
