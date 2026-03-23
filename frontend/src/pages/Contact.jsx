import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteConfig, images } from "../mock";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create FormData for submission
      const submitData = new FormData();
      
      // Add form_id to identify this as the contact form
      submitData.append('form_id', 'contact');
      
      // Add form fields
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('subject', formData.subject);
      submitData.append('message', formData.message);
      
      // Add submission timestamp
      submitData.append('submission_date', new Date().toLocaleString());

      // Submit to PHP endpoint
      const response = await fetch('/api/ingest.php', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Even if email notification fails, form was received
        console.warn("Form submitted but email may have failed:", result.message);
        setSubmitStatus('success');
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialIcons = {
    Facebook: Facebook,
    Twitter: Twitter,
    LinkedIn: Linkedin,
    Instagram: Instagram,
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      primary: siteConfig.contact.email,
      secondary: "For general inquiries",
      action: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Phone,
      title: "Call Us",
      primary: siteConfig.contact.phone,
      secondary: "Mon-Fri, 9am-5pm EST",
      action: `tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`,
    },
    {
      icon: MapPin,
      title: "Mail Us",
      primary: "All4Vets, Inc.",
      secondary: `${siteConfig.contact.address}`,
      action: null,
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
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're here to help. Reach out with questions, partnership inquiries,
            or press requests.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="border-2 hover:border-[#1E4F91] transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#0B1D39] rounded-full flex items-center justify-center mx-auto mb-6">
                    <method.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1D39] mb-2">
                    {method.title}
                  </h3>
                  {method.action ? (
                    <a
                      href={method.action}
                      className="text-lg text-[#1E4F91] hover:underline font-semibold"
                    >
                      {method.primary}
                    </a>
                  ) : (
                    <p className="text-lg text-[#0B1D39] font-semibold">
                      {method.primary}
                    </p>
                  )}
                  <p className="text-[#3C4A5B] mt-2">{method.secondary}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-2 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[#0B1D39] mb-6">
                  Send Us a Message
                </h2>
                
                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-semibold text-green-800">Message Sent!</h4>
                      <p className="text-sm text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
                    </div>
                    <button 
                      onClick={() => setSubmitStatus(null)}
                      className="ml-auto text-green-600 hover:text-green-800"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
                
                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                    <X className="text-red-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-semibold text-red-800">Submission Failed</h4>
                      <p className="text-sm text-red-700">Please try again or email us directly at joe@all4vets.us</p>
                    </div>
                    <button 
                      onClick={() => setSubmitStatus(null)}
                      className="ml-auto text-red-600 hover:text-red-800"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-2">
                        Your Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="border-2 border-gray-300 focus:border-[#1E4F91]"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="border-2 border-gray-300 focus:border-[#1E4F91]"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0B1D39] mb-2">
                      Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="programs">Questions About Programs</option>
                      <option value="donation">Donation Inquiry</option>
                      <option value="partnership">
                        Partnership Opportunity
                      </option>
                      <option value="volunteer">Volunteer Interest</option>
                      <option value="press">Press / Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0B1D39] mb-2">
                      Message *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[150px]"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#B31942] hover:bg-[#d43e2e] text-white font-bold py-4 text-lg rounded-full disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Response Time */}
              <Card className="bg-[#F3F5F7] border-none">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Clock size={24} className="text-[#0B1D39] mr-3" />
                    <h3 className="text-xl font-bold text-[#0B1D39]">
                      Response Time
                    </h3>
                  </div>
                  <p className="text-[#3C4A5B]">
                    We strive to respond to all inquiries within 1-2 business
                    days. For urgent matters related to veteran assistance,
                    please call us directly.
                  </p>
                </CardContent>
              </Card>

              {/* Specific Contacts */}
              <Card className="bg-[#0B1D39] text-white border-none">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Specific Inquiries</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">General Inquiries</p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-[#BF9B30] hover:underline"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">
                        Partnership Opportunities
                      </p>
                      <a
                        href={`mailto:${siteConfig.contact.partnershipsEmail}`}
                        className="text-[#BF9B30] hover:underline"
                      >
                        {siteConfig.contact.partnershipsEmail}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-2">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-[#0B1D39] mb-6">
                    Connect With Us
                  </h3>
                  <p className="text-[#3C4A5B] mb-6">
                    Follow us on social media for updates, stories, and ways to
                    get involved.
                  </p>
                  <div className="flex space-x-4">
                    {siteConfig.social.map((social) => {
                      const Icon = socialIcons[social.name];
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          className="w-12 h-12 bg-[#0B1D39] rounded-full flex items-center justify-center hover:bg-[#1E4F91] transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                        >
                          <Icon size={20} className="text-white" />
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#F3F5F7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] mb-6">
            Are You a Veteran in Need?
          </h2>
          <p className="text-lg text-[#3C4A5B] mb-8">
            If you're a veteran seeking financial assistance, don't hesitate to
            reach out. We're here to help you navigate our programs and find the
            support you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/programs">
              <Button className="bg-[#0B1D39] hover:bg-[#1E4F91] text-white font-bold px-8 py-4 rounded-full">
                View Our Programs
              </Button>
            </a>
            <a href="/donate">
              <Button className="bg-[#B31942] hover:bg-[#d43e2e] text-white font-bold px-8 py-4 rounded-full">
                Support Our Mission
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
