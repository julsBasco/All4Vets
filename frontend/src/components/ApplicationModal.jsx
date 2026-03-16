import React, { useState, useRef } from "react";
import { X, Send, CheckCircle, Loader2, Upload, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import emailjs from "@emailjs/browser";

// EmailJS Configuration - User needs to set these up
const EMAILJS_SERVICE_ID = "service_pvv6b3x";
const EMAILJS_TEMPLATE_ID = "template_fks6sqz";
const EMAILJS_PUBLIC_KEY = "05MmZHAAF9TuVW64Z";

// US States list for dropdown
const US_STATES = [
  { value: "", label: "Select State" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

const ApplicationModal = ({ isOpen, onClose, programType }) => {
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    // Section 1: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Section 2: Military Service Verification
    branch: "",
    serviceNumber: "",
    serviceStart: "",
    serviceEnd: "",
    dischargeType: "",
    dd214File: null,
    
    // Section 3: VA Disability Information
    claimStatus: "",
    vaFileNumber: "",
    disabilityRating: "",
    medicalConditions: "",
    
    // Section 4: Financial Hardship Statement
    hardshipStatement: "",
    
    // Section 5: Requested Assistance
    assistanceAmount: "",
    fundUse: [],
    fundUseDetails: "",
    urgency: "",
    additionalInfo: "",
    
    // Section 6: Certification & Consent
    certifications: [],
    signature: "",
    signatureDate: new Date().toISOString().split('T')[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [fileName, setFileName] = useState("");

  const isVMEAF = programType === "vmeaf";

  const programTitles = {
    vmeaf: "Veterans Medical Evidence Assistance Fund (V-MEAF) Application",
    scholarship: "Scholarship & Education Grant Application",
    emergency: "Emergency Aid Application",
  };

  // Fund use options
  const fundUseOptions = [
    { value: "Medical expenses", label: "Medical expenses (copays, prescriptions, treatments)" },
    { value: "VA claim assistance", label: "VA claim filing assistance (legal fees, medical records)" },
    { value: "Housing", label: "Housing (rent, mortgage, utilities)" },
    { value: "Transportation", label: "Transportation (vehicle repairs, gas for medical appointments)" },
    { value: "Food", label: "Food and basic necessities" },
    { value: "Medical equipment", label: "Medical equipment or adaptive devices" },
    { value: "Other", label: "Other (please specify below)" },
  ];

  // Certification options
  const certificationOptions = [
    { value: "Information accurate", label: "I certify that all information provided in this application is true and accurate to the best of my knowledge." },
    { value: "Financial hardship", label: "I certify that I am experiencing financial hardship and am in need of assistance." },
    { value: "Understand verification", label: "I understand that All4Vets may verify the information provided and request additional documentation." },
    { value: "Consent to contact", label: "I consent to be contacted by All4Vets regarding this application via phone, email, or mail." },
    { value: "Funds for stated purpose", label: "I agree to use any funds received solely for the purposes stated in this application." },
    { value: "Privacy policy", label: "I have read and agree to All4Vets' privacy policy regarding the handling of my personal information." },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "fundUse") {
        setFormData((prev) => ({
          ...prev,
          fundUse: checked
            ? [...prev.fundUse, value]
            : prev.fundUse.filter((item) => item !== value),
        }));
      } else if (name === "certifications") {
        setFormData((prev) => ({
          ...prev,
          certifications: checked
            ? [...prev.certifications, value]
            : prev.certifications.filter((item) => item !== value),
        }));
      }
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPG, JPEG, and PNG files are allowed");
        return;
      }
      setFormData((prev) => ({ ...prev, dd214File: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate fund use selection for V-MEAF
    if (isVMEAF && formData.fundUse.length === 0) {
      alert("Please select at least one option for Primary Use of Funds");
      return;
    }
    
    // Validate all certifications are checked for V-MEAF
    if (isVMEAF && formData.certifications.length !== 6) {
      alert("Please agree to all certification statements to proceed");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Prepare email content
    const emailContent = {
      to_email: "joe@all4vets.us",
      program_type: programTitles[programType],
      // Personal Info
      applicant_name: `${formData.firstName} ${formData.lastName}`,
      applicant_email: formData.email,
      applicant_phone: formData.phone,
      applicant_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      // Military Service
      military_branch: formData.branch || "N/A",
      service_number: formData.serviceNumber || "N/A",
      service_dates: formData.serviceStart
        ? `${formData.serviceStart} to ${formData.serviceEnd}`
        : "N/A",
      discharge_type: formData.dischargeType || "N/A",
      dd214_uploaded: formData.dd214File ? "Yes - " + fileName : "No",
      // VA Disability Info
      va_claim_status: formData.claimStatus || "N/A",
      va_file_number: formData.vaFileNumber || "N/A",
      disability_rating: formData.disabilityRating || "N/A",
      medical_conditions: formData.medicalConditions || "N/A",
      // Financial Hardship
      hardship_statement: formData.hardshipStatement || "N/A",
      // Requested Assistance
      assistance_amount: formData.assistanceAmount ? `$${formData.assistanceAmount}` : "N/A",
      fund_use: formData.fundUse.length > 0 ? formData.fundUse.join(", ") : "N/A",
      fund_use_details: formData.fundUseDetails || "N/A",
      urgency: formData.urgency || "N/A",
      additional_info: formData.additionalInfo || "None provided",
      // Certification
      signature: formData.signature || "N/A",
      signature_date: formData.signatureDate || "N/A",
      submission_date: new Date().toLocaleString(),
    };

    try {
      if (EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          emailContent,
          EMAILJS_PUBLIC_KEY,
        );
        setSubmitStatus("success");
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/applications`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              programType,
              ...emailContent,
            }),
          },
        );

        if (response.ok) {
          setSubmitStatus("success");
        } else {
          throw new Error("Failed to submit application");
        }
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      branch: "",
      serviceNumber: "",
      serviceStart: "",
      serviceEnd: "",
      dischargeType: "",
      dd214File: null,
      claimStatus: "",
      vaFileNumber: "",
      disabilityRating: "",
      medicalConditions: "",
      hardshipStatement: "",
      assistanceAmount: "",
      fundUse: [],
      fundUseDetails: "",
      urgency: "",
      additionalInfo: "",
      certifications: [],
      signature: "",
      signatureDate: new Date().toISOString().split('T')[0],
    });
    setFileName("");
    setSubmitStatus(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B1D39] text-white p-6 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">{programTitles[programType]}</h2>
          <button
            onClick={resetAndClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Success State */}
        {submitStatus === "success" && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B1D39] mb-4">
              Application Submitted!
            </h3>
            <p className="text-[#3C4A5B] mb-6">
              Thank you for your application. Our team will review it and
              contact you within 10-14 business days.
            </p>
            <Button
              onClick={resetAndClose}
              className="bg-[#0B1D39] hover:bg-[#1E4F91] text-white px-8 py-3 rounded-full"
            >
              Close
            </Button>
          </div>
        )}

        {/* Error State */}
        {submitStatus === "error" && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <X size={48} className="text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B1D39] mb-4">
              Submission Failed
            </h3>
            <p className="text-[#3C4A5B] mb-6">
              We couldn't submit your application. Please try again or contact
              us directly at joe@all4vets.us
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setSubmitStatus(null)}
                variant="outline"
                className="border-2 border-[#0B1D39] text-[#0B1D39] px-6 py-3 rounded-full"
              >
                Try Again
              </Button>
              <Button
                onClick={resetAndClose}
                className="bg-[#0B1D39] hover:bg-[#1E4F91] text-white px-6 py-3 rounded-full"
              >
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Form */}
        {!submitStatus && (
          <form
            onSubmit={handleSubmit}
            className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]"
          >
            {/* Info Box for V-MEAF */}
            {isVMEAF && (
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <div className="flex items-start">
                  <AlertCircle className="text-blue-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-blue-800">Confidential Application</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      All information provided will be kept strictly confidential. Applications are typically reviewed within 10-14 business days.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Section 1: Personal Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#E64A38] flex items-center">
                <span className="bg-[#0B1D39] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                    First Name *
                  </label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 focus:border-[#1E4F91]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                    Last Name *
                  </label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 focus:border-[#1E4F91]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                    Email Address *
                  </label>
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
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                    Phone Number *
                  </label>
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
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                    Street Address *
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 focus:border-[#1E4F91]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                    City *
                  </label>
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
                    <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                    >
                      {US_STATES.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                      ZIP Code *
                    </label>
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{5}"
                      maxLength={5}
                      placeholder="12345"
                      className="border-2 border-gray-300 focus:border-[#1E4F91]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* V-MEAF Specific Sections */}
            {isVMEAF && (
              <>
                {/* Section 2: Military Service Verification */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#E64A38] flex items-center">
                    <span className="bg-[#0B1D39] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                    Military Service Verification
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Branch of Service *
                      </label>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                      >
                        <option value="">Select Branch</option>
                        <option value="Army">U.S. Army</option>
                        <option value="Navy">U.S. Navy</option>
                        <option value="Air Force">U.S. Air Force</option>
                        <option value="Marine Corps">U.S. Marine Corps</option>
                        <option value="Coast Guard">U.S. Coast Guard</option>
                        <option value="Space Force">U.S. Space Force</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Service Number (if applicable)
                      </label>
                      <Input
                        name="serviceNumber"
                        value={formData.serviceNumber}
                        onChange={handleChange}
                        placeholder="Optional"
                        className="border-2 border-gray-300 focus:border-[#1E4F91]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Service Start Date *
                      </label>
                      <Input
                        type="date"
                        name="serviceStart"
                        value={formData.serviceStart}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300 focus:border-[#1E4F91]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Service End Date *
                      </label>
                      <Input
                        type="date"
                        name="serviceEnd"
                        value={formData.serviceEnd}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300 focus:border-[#1E4F91]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Type of Discharge *
                      </label>
                      <select
                        name="dischargeType"
                        value={formData.dischargeType}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                      >
                        <option value="">Select Discharge Type</option>
                        <option value="Honorable">Honorable</option>
                        <option value="General">General (Under Honorable Conditions)</option>
                        <option value="Other Than Honorable">Other Than Honorable</option>
                        <option value="Bad Conduct">Bad Conduct</option>
                        <option value="Dishonorable">Dishonorable</option>
                        <option value="Medical">Medical Discharge</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Upload DD214 *
                      </label>
                      <div className="relative">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          required
                          className="hidden"
                        />
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full p-3 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-[#1E4F91] transition-colors flex items-center justify-center gap-2"
                        >
                          <Upload size={20} className="text-gray-400" />
                          <span className="text-gray-600">
                            {fileName || "Click to upload (PDF, JPG, PNG - Max 10MB)"}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Your DD214 is required to verify military service. Accepted formats: PDF, JPG, PNG (Max 10MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 3: VA Disability Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#E64A38] flex items-center">
                    <span className="bg-[#0B1D39] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                    VA Disability Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-2">
                        VA Disability Claim Status *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { value: "Pending", label: "Claim Pending" },
                          { value: "Approved", label: "Claim Approved" },
                          { value: "Denied/Appealing", label: "Denied/Appealing" },
                          { value: "Not Yet Filed", label: "Not Yet Filed" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.claimStatus === option.value
                                ? "border-[#1E4F91] bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="claimStatus"
                              value={option.value}
                              checked={formData.claimStatus === option.value}
                              onChange={handleChange}
                              required
                              className="mr-3 w-4 h-4 text-[#1E4F91]"
                            />
                            <span className="text-[#0B1D39]">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                          VA File Number (if applicable)
                        </label>
                        <Input
                          name="vaFileNumber"
                          value={formData.vaFileNumber}
                          onChange={handleChange}
                          placeholder="Optional"
                          className="border-2 border-gray-300 focus:border-[#1E4F91]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                          Current Disability Rating (if applicable)
                        </label>
                        <select
                          name="disabilityRating"
                          value={formData.disabilityRating}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                        >
                          <option value="">Select Rating</option>
                          <option value="0%">0%</option>
                          <option value="10%">10%</option>
                          <option value="20%">20%</option>
                          <option value="30%">30%</option>
                          <option value="40%">40%</option>
                          <option value="50%">50%</option>
                          <option value="60%">60%</option>
                          <option value="70%">70%</option>
                          <option value="80%">80%</option>
                          <option value="90%">90%</option>
                          <option value="100%">100%</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Service-Connected Medical Conditions *
                      </label>
                      <Textarea
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleChange}
                        required
                        placeholder="Please list any conditions you are claiming or have claimed, whether service-connected, pending, or denied."
                        className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Financial Hardship Statement */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#E64A38] flex items-center">
                    <span className="bg-[#0B1D39] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                    Financial Hardship Statement
                  </h3>
                  <div className="mb-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                    <p className="text-sm text-amber-800">
                      Please provide a brief statement explaining your current financial situation and why you need assistance. This helps us understand your circumstances and prioritize applications.
                    </p>
                  </div>
                  <Textarea
                    name="hardshipStatement"
                    value={formData.hardshipStatement}
                    onChange={handleChange}
                    required
                    placeholder="Describe your current financial hardship and circumstances..."
                    className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[120px]"
                  />
                </div>

                {/* Section 5: Requested Assistance */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#E64A38] flex items-center">
                    <span className="bg-[#0B1D39] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                    Requested Assistance
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Amount of Assistance Requested *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          type="number"
                          name="assistanceAmount"
                          value={formData.assistanceAmount}
                          onChange={handleChange}
                          required
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className="border-2 border-gray-300 focus:border-[#1E4F91] pl-8"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-2">
                        Primary Use of Funds * <span className="text-gray-500 font-normal">(Select all that apply)</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {fundUseOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.fundUse.includes(option.value)
                                ? "border-[#1E4F91] bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              name="fundUse"
                              value={option.value}
                              checked={formData.fundUse.includes(option.value)}
                              onChange={handleChange}
                              className="mt-0.5 mr-3 w-4 h-4 text-[#1E4F91] rounded"
                            />
                            <span className="text-sm text-[#0B1D39]">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Detailed Explanation of Fund Usage *
                      </label>
                      <Textarea
                        name="fundUseDetails"
                        value={formData.fundUseDetails}
                        onChange={handleChange}
                        required
                        placeholder="Please provide specific details about how the funds will be used..."
                        className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[100px]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Urgency Level *
                      </label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                      >
                        <option value="">Select Urgency</option>
                        <option value="Critical">Critical (Immediate need - within 7 days)</option>
                        <option value="High">High (Within 2 weeks)</option>
                        <option value="Moderate">Moderate (Within 30 days)</option>
                        <option value="Standard">Standard (No immediate deadline)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Additional Information
                      </label>
                      <Textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        placeholder="Is there anything else you'd like us to know?"
                        className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 6: Certification & Consent */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#E64A38] flex items-center">
                    <span className="bg-[#0B1D39] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">6</span>
                    Certification & Consent
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Please read and agree to all statements below to complete your application:
                  </p>
                  <div className="space-y-3 mb-6">
                    {certificationOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.certifications.includes(option.value)
                            ? "border-[#1E4F91] bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="certifications"
                          value={option.value}
                          checked={formData.certifications.includes(option.value)}
                          onChange={handleChange}
                          className="mt-0.5 mr-3 w-4 h-4 text-[#1E4F91] rounded"
                        />
                        <span className="text-sm text-[#0B1D39]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Digital Signature (Full Name) *
                      </label>
                      <Input
                        name="signature"
                        value={formData.signature}
                        onChange={handleChange}
                        required
                        placeholder="Type your full legal name"
                        className="border-2 border-gray-300 focus:border-[#1E4F91] bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        By typing your name, you agree this serves as your electronic signature.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Date *
                      </label>
                      <Input
                        type="date"
                        name="signatureDate"
                        value={formData.signatureDate}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300 focus:border-[#1E4F91] bg-white"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Non-V-MEAF forms - keep simple additional info */}
            {!isVMEAF && (
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
            )}

            {/* What Happens Next - V-MEAF only */}
            {isVMEAF && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                <h4 className="font-semibold text-green-800 mb-2">What happens next?</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Your application will be reviewed within 10-14 business days</li>
                  <li>• We may contact you if additional information is needed</li>
                  <li>• You will receive notification of our decision via email</li>
                  <li>• For questions, email info@all4vets.us or call (800) 555-VETS</li>
                </ul>
              </div>
            )}

            {/* Submit Buttons */}
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
                disabled={isSubmitting || (isVMEAF && (formData.fundUse.length === 0 || formData.certifications.length !== 6))}
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
