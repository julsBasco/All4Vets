import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  X,
  Building2,
  Award,
  Briefcase,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { impactStats, siteConfig } from "../mock";

const Sponsorship = () => {
  const [visibleTiers, setVisibleTiers] = useState([]);

  useEffect(() => {
    // Animate tiers on load
    const timers = [0, 1, 2].map((index) =>
      setTimeout(
        () => {
          setVisibleTiers((prev) => [...prev, index]);
        },
        200 * (index + 1),
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const sponsorshipTiers = [
    {
      id: "platinum",
      name: "Platinum Sponsor",
      badge: "Premier Partner",
      amount: "$25,000+",
      period: "Annual Commitment",
      description:
        "Our highest level of partnership, providing maximum visibility and impact. Platinum sponsors receive exclusive recognition and direct involvement in our mission.",
      featured: true,
      benefits: [
        "Premier logo placement on All4Vets website homepage",
        "Featured sponsor in all annual reports and publications",
        "Exclusive naming rights opportunity for signature program",
        "Quarterly impact reports with detailed veteran success stories",
        "Speaking opportunity at annual All4Vets gala event",
        "Social media recognition (4 posts per quarter)",
        "Press release announcing partnership",
        "Invitation to exclusive donor appreciation events",
        "Custom veteran impact video featuring your support",
        "Recognition plaque for corporate office display",
        "Direct consultation with All4Vets leadership team",
        "Employee volunteer opportunities with veterans",
      ],
      color: "platinum",
    },
    {
      id: "gold",
      name: "Gold Sponsor",
      badge: "Premium Partner",
      amount: "$10,000+",
      period: "Annual Commitment",
      description:
        "A significant partnership level offering substantial recognition and meaningful engagement with our veteran community and mission.",
      featured: false,
      benefits: [
        "Prominent logo placement on All4Vets website",
        "Recognition in annual reports and newsletters",
        "Quarterly impact updates and success stories",
        "Social media recognition (2 posts per quarter)",
        "Invitation to annual All4Vets gala event (2 tickets)",
        "Recognition in email communications to supporters",
        "Company profile featured on sponsor page",
        "Certificate of appreciation for corporate display",
        "Access to veteran volunteer opportunities",
        "Bi-annual meetings with All4Vets leadership",
      ],
      color: "gold",
    },
    {
      id: "silver",
      name: "Silver Sponsor",
      badge: "Supporting Partner",
      amount: "$5,000+",
      period: "Annual Commitment",
      description:
        "An excellent entry-level partnership providing meaningful support to veterans while gaining valuable recognition for your corporate social responsibility.",
      featured: false,
      benefits: [
        "Logo placement on All4Vets sponsor page",
        "Recognition in annual report",
        "Semi-annual impact updates",
        "Social media recognition (1 post per quarter)",
        "Invitation to annual All4Vets gala event (1 ticket)",
        "Company name in email newsletters",
        "Certificate of appreciation",
        "Access to volunteer opportunities",
      ],
      color: "silver",
    },
  ];

  const comparisonData = [
    {
      benefit: "Website Logo Placement",
      platinum: "Homepage",
      gold: "Prominent",
      silver: "Sponsor Page",
    },
    {
      benefit: "Annual Report Recognition",
      platinum: "Featured",
      gold: true,
      silver: true,
    },
    {
      benefit: "Social Media Posts (Quarterly)",
      platinum: "4",
      gold: "2",
      silver: "1",
    },
    {
      benefit: "Impact Reports",
      platinum: "Quarterly",
      gold: "Quarterly",
      silver: "Semi-Annual",
    },
    {
      benefit: "Gala Event Tickets",
      platinum: "VIP + Speaking",
      gold: "2 Tickets",
      silver: "1 Ticket",
    },
    { benefit: "Press Release", platinum: true, gold: false, silver: false },
    {
      benefit: "Naming Rights Opportunity",
      platinum: true,
      gold: false,
      silver: false,
    },
    {
      benefit: "Custom Impact Video",
      platinum: true,
      gold: false,
      silver: false,
    },
    {
      benefit: "Leadership Consultation",
      platinum: "Direct Access",
      gold: "Bi-Annual",
      silver: false,
    },
    {
      benefit: "Employee Volunteer Opportunities",
      platinum: true,
      gold: true,
      silver: true,
    },
    {
      benefit: "Recognition Plaque/Certificate",
      platinum: "Premium Plaque",
      gold: "Certificate",
      silver: "Certificate",
    },
    {
      benefit: "Tax Deduction (501c3)",
      platinum: true,
      gold: true,
      silver: true,
    },
  ];

  const getTierColors = (tier) => {
    switch (tier) {
      case "platinum":
        return {
          header: "bg-gradient-to-br from-[#0B1D39] via-[#1E4F91] to-[#0B1D39]",
          badge: "bg-[#BF9B30] text-white",
          button: "bg-[#E64A38] hover:bg-[#d43e2e] text-white",
          border: "border-[#BF9B30]",
          ring: "ring-2 ring-[#BF9B30]",
        };
      case "gold":
        return {
          header: "bg-gradient-to-br from-[#BF9B30] via-[#d4af37] to-[#BF9B30]",
          badge: "bg-[#0B1D39] text-white",
          button: "bg-[#0B1D39] hover:bg-[#1E4F91] text-white",
          border: "border-[#BF9B30]",
          ring: "",
        };
      case "silver":
        return {
          header: "bg-gradient-to-br from-[#6B7280] via-[#9CA3AF] to-[#6B7280]",
          badge: "bg-[#0B1D39] text-white",
          button: "bg-[#0B1D39] hover:bg-[#1E4F91] text-white",
          border: "border-gray-300",
          ring: "",
        };
      default:
        return {};
    }
  };

  const renderCheckOrX = (value) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    } else if (value === false) {
      return <X className="w-5 h-5 text-gray-300 mx-auto" />;
    }
    return <span className="text-sm font-medium text-[#0B1D39]">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#0B1D39] via-[#1E4F91] to-[#0B1D39] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#BF9B30] mb-6">
              <Building2 size={16} className="mr-2 text-[#BF9B30]" />
              <span className="text-sm font-medium">
                Corporate Partnership Program
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
              Corporate Sponsorship Program
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Partner with All4Vets to make a lasting impact on the lives of
              veterans and their families.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-6">
              Empowering Veterans Through Corporate Partnership
            </h2>
            <p className="text-lg text-[#3C4A5B] max-w-4xl mx-auto leading-relaxed">
              All4Vets is a 501(c)(3) nonprofit organization dedicated to
              providing independent guidance, direct aid, and expert connections
              for veterans seeking VA disability benefits. Your corporate
              sponsorship directly supports veterans in financial hardship,
              helping them access the medical care and support they've earned
              through their service to our nation.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactStats.map((stat, index) => (
              <div
                key={stat.id}
                className="text-center p-8 bg-[#F3F5F7] rounded-xl border-2 border-transparent hover:border-[#1E4F91] transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-black text-[#BF9B30] mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-[#0B1D39] mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-[#3C4A5B]">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] uppercase tracking-tight mb-4">
              Choose Your Partnership Level
            </h2>
            <p className="text-lg text-[#3C4A5B] max-w-2xl mx-auto">
              Select the sponsorship tier that aligns with your company's
              commitment to supporting our nation's veterans
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sponsorshipTiers.map((tier, index) => {
              const colors = getTierColors(tier.color);
              const isVisible = visibleTiers.includes(index);
              return (
                <Card
                  key={tier.id}
                  className={`overflow-hidden transition-all duration-500 transform ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  } ${tier.featured ? `${colors.ring} shadow-2xl scale-105` : "shadow-lg hover:shadow-xl"}`}
                >
                  {/* Tier Header */}
                  <div
                    className={`${colors.header} text-white p-6 text-center`}
                  >
                    <div
                      className={`inline-block ${colors.badge} text-xs font-bold px-3 py-1 rounded-full mb-3`}
                    >
                      {tier.badge}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="text-3xl font-black mb-1">
                      {tier.amount}
                    </div>
                    <div className="text-sm opacity-80">{tier.period}</div>
                  </div>

                  {/* Tier Body */}
                  <CardContent className="p-6">
                    <p className="text-[#3C4A5B] mb-6 leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-bold text-[#0B1D39] mb-4 flex items-center">
                        <Award size={18} className="mr-2 text-[#BF9B30]" />
                        {tier.featured
                          ? "Exclusive Benefits"
                          : tier.color === "gold"
                            ? "Premium Benefits"
                            : "Supporting Benefits"}
                      </h4>
                      <ul className="space-y-3">
                        {tier.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-[#3C4A5B]"
                          >
                            <Check
                              size={16}
                              className="mr-2 mt-0.5 text-green-500 flex-shrink-0"
                            />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link to="/contact">
                      <Button
                        className={`w-full ${colors.button} font-bold py-3 rounded-full transition-all duration-200`}
                      >
                        Become a {tier.name.split(" ")[0]} Sponsor
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Custom Partnership Option */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg border-2 border-[#1E4F91]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0B1D39] rounded-full mb-4">
                <Briefcase size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1D39] mb-4">
                Custom Partnership Opportunities
              </h3>
              <p className="text-[#3C4A5B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Looking for a tailored sponsorship package? We're happy to work
                with you to create a custom partnership that aligns with your
                company's goals and budget. Contact us to discuss in-kind
                donations, program-specific sponsorships, or multi-year
                commitments.
              </p>
              <Link to="/contact">
                <Button className="bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold px-8 py-3 rounded-full transition-all duration-200">
                  Discuss Custom Options
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] text-center uppercase tracking-tight mb-12">
            Sponsorship Benefits Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0B1D39] text-white">
                  <th className="text-left p-4 font-bold">Benefit</th>
                  <th className="text-center p-4 font-bold">
                    <div>Platinum</div>
                    <div className="text-sm font-normal text-[#BF9B30]">
                      $25,000+
                    </div>
                  </th>
                  <th className="text-center p-4 font-bold">
                    <div>Gold</div>
                    <div className="text-sm font-normal text-[#BF9B30]">
                      $10,000+
                    </div>
                  </th>
                  <th className="text-center p-4 font-bold">
                    <div>Silver</div>
                    <div className="text-sm font-normal text-[#BF9B30]">
                      $5,000+
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-[#F3F5F7]" : "bg-white"} hover:bg-blue-50 transition-colors`}
                  >
                    <td className="p-4 font-medium text-[#0B1D39]">
                      {row.benefit}
                    </td>
                    <td className="p-4 text-center">
                      {renderCheckOrX(row.platinum)}
                    </td>
                    <td className="p-4 text-center">
                      {renderCheckOrX(row.gold)}
                    </td>
                    <td className="p-4 text-center">
                      {renderCheckOrX(row.silver)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0B1D39] via-[#1E4F91] to-[#0B1D39] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join us in supporting veterans who have served our nation. Let's
            discuss how your company can become a valued partner in our mission.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <div className="flex items-center text-gray-200">
              <Mail size={20} className="mr-2 text-[#BF9B30]" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <span className="hidden sm:block text-gray-400">|</span>
            <div className="flex items-center text-gray-200">
              <Phone size={20} className="mr-2 text-[#BF9B30]" />
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            <span className="hidden sm:block text-gray-400">|</span>
            <div className="flex items-center text-gray-200">
              <Globe size={20} className="mr-2 text-[#BF9B30]" />
              <span>www.all4vets.us</span>
            </div>
          </div>

          <Link to="/contact">
            <Button className="bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold px-10 py-6 text-lg rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
              Contact Us Today
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>

          <p className="mt-10 text-sm text-gray-300">
            All4Vets is a registered 501(c)(3) nonprofit organization. Your
            sponsorship is tax-deductible to the extent allowed by law.
            <br />
            EIN: {siteConfig.ein}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sponsorship;
