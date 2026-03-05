import React, { useState } from 'react';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import emailjs from '@emailjs/browser';

// EmailJS Configuration - User needs to set these up
const EMAILJS_SERVICE_ID = 'service_all4vets';
const EMAILJS_TEMPLATE_ID = 'template_application';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // User needs to replace this

const ApplicationModal = ({ isOpen, onClose, programType }) => {
  const [formData, setFormData] = useState({
    // Basic Personal Info (all forms)
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    // Military Service Details (V-MEAF only)
    branch: '',
    serviceStartDate: '',
    serviceEndDate: '',
    rank: '',
    // VA Claim Status (V-MEAF only)
    vaClaimStatus: '',
    vaClaimDetails: '',
    // Type of Assistance (V-MEAF only)
    assistanceType: [],
    additionalInfo: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const isVMEAF = programType === 'vmeaf';

  const programTitles = {
    vmeaf: 'V-MEAF Application',
    scholarship: 'Scholarship & Education Grant Application',
    emergency: 'Emergency Aid Application'
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        assistanceType: checked 
          ? [...prev.assistanceType, value]
          : prev.assistanceType.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Prepare email content
    const emailContent = {
      to_email: 'joe@all4vets.us',
      program_type: programTitles[programType],
      applicant_name: `${formData.firstName} ${formData.lastName}`,
      applicant_email: formData.email,
      applicant_phone: formData.phone,
      applicant_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
      // V-MEAF specific
      military_branch: formData.branch || 'N/A',
      service_dates: formData.serviceStartDate ? `${formData.serviceStartDate} to ${formData.serviceEndDate}` : 'N/A',
      rank: formData.rank || 'N/A',
      va_claim_status: formData.vaClaimStatus || 'N/A',
      va_claim_details: formData.vaClaimDetails || 'N/A',
      assistance_type: formData.assistanceType.length > 0 ? formData.assistanceType.join(', ') : 'N/A',
      additional_info: formData.additionalInfo || 'None provided',
      submission_date: new Date().toLocaleString()
    };

    try {
      // Try EmailJS first
      if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          emailContent,
          EMAILJS_PUBLIC_KEY
        );
        setSubmitStatus('success');
      } else {
        // Fallback: Send to backend API
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/applications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            programType,
            ...emailContent
          }),
        });
        
        if (response.ok) {
          setSubmitStatus('success');
        } else {
          throw new Error('Failed to submit application');
        }
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setFormData({
      firstName: '', lastName: '', email: '', phone: '',
      address: '', city: '', state: '', zip: '',
      branch: '', serviceStartDate: '', serviceEndDate: '', rank: '',
      vaClaimStatus: '', vaClaimDetails: '',
      assistanceType: [], additionalInfo: ''
    });
    setSubmitStatus(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B1D39] text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{programTitles[programType]}</h2>
          <button 
            onClick={resetAndClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Success/Error States */}
        {submitStatus === 'success' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B1D39] mb-4">Application Submitted!</h3>
            <p className="text-[#3C4A5B] mb-6">
              Thank you for your application. Our team will review it and contact you within 10-14 business days.
            </p>
            <Button onClick={resetAndClose} className="bg-[#0B1D39] hover:bg-[#1E4F91] text-white px-8 py-3 rounded-full">
              Close
            </Button>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <X size={48} className="text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B1D39] mb-4">Submission Failed</h3>
            <p className="text-[#3C4A5B] mb-6">
              We couldn't submit your application. Please try again or contact us directly at joe@all4vets.us
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setSubmitStatus(null)} variant="outline" className="border-2 border-[#0B1D39] text-[#0B1D39] px-6 py-3 rounded-full">
                Try Again
              </Button>
              <Button onClick={resetAndClose} className="bg-[#0B1D39] hover:bg-[#1E4F91] text-white px-6 py-3 rounded-full">
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Form */}
        {!submitStatus && (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {/* Basic Personal Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#E64A38]">
                Basic Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">First Name *</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 focus:border-[#1E4F91]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">Last Name *</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 focus:border-[#1E4F91]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 focus:border-[#1E4F91]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">Phone *</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 focus:border-[#1E4F91]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">Street Address *</label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 focus:border-[#1E4F91]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">City *</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 focus:border-[#1E4F91]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1D39] mb-1">State *</label>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-300 focus:border-[#1E4F91]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1D39] mb-1">ZIP *</label>
                    <Input
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-300 focus:border-[#1E4F91]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* V-MEAF Specific Fields */}
            {isVMEAF && (
              <>
                {/* Military Service Details */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#E64A38]">
                    Military Service Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">Branch of Service *</label>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                      >
                        <option value="">Select Branch</option>
                        <option value="Army">Army</option>
                        <option value="Navy">Navy</option>
                        <option value="Air Force">Air Force</option>
                        <option value="Marine Corps">Marine Corps</option>
                        <option value="Coast Guard">Coast Guard</option>
                        <option value="Space Force">Space Force</option>
                        <option value="National Guard">National Guard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">Rank at Separation</label>
                      <Input
                        name="rank"
                        value={formData.rank}
                        onChange={handleChange}
                        placeholder="e.g., E-5, O-3"
                        className="border-2 border-gray-300 focus:border-[#1E4F91]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">Service Start Date *</label>
                      <Input
                        type="date"
                        name="serviceStartDate"
                        value={formData.serviceStartDate}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300 focus:border-[#1E4F91]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">Service End Date *</label>
                      <Input
                        type="date"
                        name="serviceEndDate"
                        value={formData.serviceEndDate}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300 focus:border-[#1E4F91]"
                      />
                    </div>
                  </div>
                </div>

                {/* VA Claim Status */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#E64A38]">
                    VA Claim Status
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">Current VA Claim Status *</label>
                      <select
                        name="vaClaimStatus"
                        value={formData.vaClaimStatus}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                      >
                        <option value="">Select Status</option>
                        <option value="Not Yet Filed">Not Yet Filed</option>
                        <option value="Pending Initial Review">Pending Initial Review</option>
                        <option value="Gathering Evidence">Gathering Evidence</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Decision Made - Appealing">Decision Made - Appealing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">VA Claim Details</label>
                      <Textarea
                        name="vaClaimDetails"
                        value={formData.vaClaimDetails}
                        onChange={handleChange}
                        placeholder="Please provide any additional details about your VA claim status, conditions being claimed, etc."
                        className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Type of Assistance Requested */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#E64A38]">
                    Type of Assistance Requested *
                  </h3>
                  <p className="text-sm text-[#3C4A5B] mb-4">Select all that apply:</p>
                  <div className="space-y-3">
                    {[
                      { value: 'Financial Assistance', label: 'Financial Assistance', desc: 'Help with costs during VA claim process' },
                      { value: 'Medical Advocacy', label: 'Medical Advocacy', desc: 'Support navigating medical documentation' },
                      { value: 'IMO Support', label: 'IMO Support', desc: 'Independent Medical Opinion assistance' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-[#1E4F91] cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          name="assistanceType"
                          value={option.value}
                          checked={formData.assistanceType.includes(option.value)}
                          onChange={handleChange}
                          className="mt-1 mr-4 w-5 h-5 text-[#0B1D39] border-gray-300 rounded focus:ring-[#1E4F91]"
                        />
                        <div>
                          <span className="font-semibold text-[#0B1D39]">{option.label}</span>
                          <p className="text-sm text-[#3C4A5B]">{option.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Additional Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#E64A38]">
                Additional Information
              </h3>
              <Textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Is there anything else you'd like us to know about your situation?"
                className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[100px]"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={resetAndClose}
                className="flex-1 border-2 border-gray-300 text-[#3C4A5B] py-4 rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || (isVMEAF && formData.assistanceType.length === 0)}
                className="flex-1 bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold py-4 rounded-full disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;
