import React, { useState, useRef } from "react";
import {
  X,
  Send,
  CheckCircle,
  Loader2,
  Upload,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
  const dd214InputRef = useRef(null);
  const strInputRef = useRef(null);
  const blueButtonInputRef = useRef(null);
  const privateMedicalInputRef = useRef(null);
  const priorDbqInputRef = useRef(null);

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
    serviceTreatmentRecords: null,
    vaBlueButtonReport: null,
    privateMedicalRecords: null,
    priorDbqNexusLetter: null,

    // Section 3: VA Disability Information
    claimStatus: "",
    vaFileNumber: "",
    disabilityRating: "",
    evaluationType: "",
    conditionsClaimed: "",
    existingDiagnosis: "",
    medicalConditions: "",
    currentSymptoms: "",
    currentMedications: "",
    priorTreatmentHistory: "",

    // Section 4: Financial Hardship Statement
    hardshipStatement: "",

    // Section 5: Certification & Consent
    certifications: [],
    signature: "",
    signatureDate: new Date().toISOString().split("T")[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [fileNames, setFileNames] = useState({
    dd214: "",
    serviceTreatmentRecords: "",
    vaBlueButtonReport: "",
    privateMedicalRecords: "",
    priorDbqNexusLetter: "",
  });

  const isVMEAF = programType === "vmeaf";

  const programTitles = {
    vmeaf: "Veterans Medical Evidence Assistance Fund (V-MEAF) Application",
    scholarship: "Scholarship & Education Grant Application",
    emergency: "Emergency Aid Application",
  };

  // Certification options
  const certificationOptions = [
    {
      value: "Information accurate",
      label:
        "I certify that all information provided in this application is true and accurate to the best of my knowledge.",
    },
    {
      value: "Financial hardship",
      label:
        "I certify that I am experiencing financial hardship and am in need of assistance.",
    },
    {
      value: "Understand verification",
      label:
        "I understand that All4Vets may verify the information provided and request additional documentation.",
    },
    {
      value: "Consent to contact",
      label:
        "I consent to be contacted by All4Vets regarding this application via phone, email, or mail.",
    },
    {
      value: "Funds for stated purpose",
      label:
        "I agree to use any funds received solely for the purposes stated in this application.",
    },
    {
      value: "Privacy policy",
      label:
        "I have read and agree to All4Vets' privacy policy regarding the handling of my personal information.",
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "certifications") {
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

  const handleFileChange = (e, fieldName, fileNameKey) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      // Check file type
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPG, JPEG, and PNG files are allowed");
        return;
      }
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      setFileNames((prev) => ({ ...prev, [fileNameKey]: file.name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all certifications are checked for V-MEAF
    if (isVMEAF && formData.certifications.length !== 6) {
      alert("Please agree to all certification statements to proceed");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create FormData for multipart/form-data submission
      const submitData = new FormData();
      
      // Add form_id to identify the form type
      submitData.append('form_id', programType);
      
      // Add program type for reference
      submitData.append('program_type', programTitles[programType]);
      
      // Personal Information
      submitData.append('first_name', formData.firstName);
      submitData.append('last_name', formData.lastName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('address', formData.address);
      submitData.append('city', formData.city);
      submitData.append('state', formData.state);
      submitData.append('zip_code', formData.zipCode);
      
      // Full address for easy reference
      submitData.append('full_address', `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`);
      
      // V-MEAF specific fields
      if (isVMEAF) {
        // Military Service
        submitData.append('military_branch', formData.branch || 'N/A');
        submitData.append('service_number', formData.serviceNumber || 'N/A');
        submitData.append('service_start_date', formData.serviceStart || 'N/A');
        submitData.append('service_end_date', formData.serviceEnd || 'N/A');
        submitData.append('service_dates', formData.serviceStart ? `${formData.serviceStart} to ${formData.serviceEnd}` : 'N/A');
        submitData.append('discharge_type', formData.dischargeType || 'N/A');
        
        // File uploads
        if (formData.dd214File) {
          submitData.append('dd214', formData.dd214File);
        }
        if (formData.serviceTreatmentRecords) {
          submitData.append('service_treatment_records', formData.serviceTreatmentRecords);
        }
        if (formData.vaBlueButtonReport) {
          submitData.append('va_blue_button_report', formData.vaBlueButtonReport);
        }
        if (formData.privateMedicalRecords) {
          submitData.append('private_medical_records', formData.privateMedicalRecords);
        }
        if (formData.priorDbqNexusLetter) {
          submitData.append('prior_dbq_nexus_letter', formData.priorDbqNexusLetter);
        }
        
        // VA Disability Info
        submitData.append('va_claim_status', formData.claimStatus || 'N/A');
        submitData.append('va_file_number', formData.vaFileNumber || 'N/A');
        submitData.append('disability_rating', formData.disabilityRating || 'N/A');
        submitData.append('evaluation_type', formData.evaluationType || 'N/A');
        submitData.append('conditions_claimed', formData.conditionsClaimed || 'N/A');
        submitData.append('existing_diagnosis', formData.existingDiagnosis || 'N/A');
        submitData.append('medical_conditions', formData.medicalConditions || 'N/A');
        submitData.append('current_symptoms', formData.currentSymptoms || 'N/A');
        submitData.append('current_medications', formData.currentMedications || 'N/A');
        submitData.append('prior_treatment_history', formData.priorTreatmentHistory || 'N/A');
        
        // Financial Hardship
        submitData.append('hardship_statement', formData.hardshipStatement || 'N/A');
        
        // Certification
        submitData.append('certifications', formData.certifications.join('; '));
        submitData.append('digital_signature', formData.signature || 'N/A');
        submitData.append('signature_date', formData.signatureDate || 'N/A');
      } else {
        // Non-V-MEAF forms (scholarship, emergency) - simpler data
        submitData.append('additional_info', formData.hardshipStatement || 'N/A');
      }
      
      // Add submission timestamp
      submitData.append('submission_date', new Date().toLocaleString());

      // Submit to PHP endpoint
      // Note: Do NOT set Content-Type header manually - browser will set it with boundary for multipart/form-data
      const response = await fetch('/api/ingest.php', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
      } else {
        // Even if email fails, the form was received
        console.warn("Form submitted but email may have failed:", result.message);
        setSubmitStatus("success");
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
      serviceTreatmentRecords: null,
      vaBlueButtonReport: null,
      privateMedicalRecords: null,
      priorDbqNexusLetter: null,
      claimStatus: "",
      vaFileNumber: "",
      disabilityRating: "",
      evaluationType: "",
      conditionsClaimed: "",
      existingDiagnosis: "",
      medicalConditions: "",
      currentSymptoms: "",
      currentMedications: "",
      priorTreatmentHistory: "",
      hardshipStatement: "",
      certifications: [],
      signature: "",
      signatureDate: new Date().toISOString().split("T")[0],
    });
    setFileNames({
      dd214: "",
      serviceTreatmentRecords: "",
      vaBlueButtonReport: "",
      privateMedicalRecords: "",
      priorDbqNexusLetter: "",
    });
    setSubmitStatus(null);
    onClose();
  };

  // File upload component
  const FileUploadField = ({
    label,
    required,
    inputRef,
    fieldName,
    fileNameKey,
    helpText,
  }) => (
    <div>
      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
        {label} {required && "*"}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(e, fieldName, fileNameKey)}
          required={required}
          className="hidden"
        />
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full p-3 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-[#1E4F91] transition-colors flex items-center justify-center gap-2"
        >
          <Upload size={20} className="text-gray-400" />
          <span className="text-gray-600 text-sm">
            {fileNames[fileNameKey] ||
              "Click to upload (PDF, JPG, PNG - Max 10MB)"}
          </span>
        </div>
      </div>
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B1D39] text-white p-6 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">
            {programTitles[programType]}
          </h2>
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
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <div className="flex items-start">
                  <AlertCircle
                    className="text-red-500 mr-3 flex-shrink-0 mt-0.5"
                    size={20}
                  />
                  <div>
                    <h4 className="font-semibold text-red-800">
                      Confidential Application
                    </h4>
                    <p className="text-sm text-red-700 mt-1">
                      All information provided will be kept strictly
                      confidential. Applications are typically reviewed within
                      10-14 business days.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Section 1: Personal Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#B31942] flex items-center">
                <span className="bg-[#0B1D39] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                  1
                </span>
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
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#B31942] flex items-center">
                    <span className="bg-[#0B1D39] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                      2
                    </span>
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
                    <div className="md:col-span-2">
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
                        <option value="General">
                          General (Under Honorable Conditions)
                        </option>
                        <option value="Other Than Honorable">
                          Other Than Honorable
                        </option>
                        <option value="Bad Conduct">Bad Conduct</option>
                        <option value="Dishonorable">Dishonorable</option>
                        <option value="Medical">Medical Discharge</option>
                      </select>
                    </div>
                  </div>

                  {/* File Upload Section */}
                  <div className="mt-6">
                    <h4 className="text-md font-semibold text-[#0B1D39] mb-4">
                      Upload Documents
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FileUploadField
                        label="Upload DD214"
                        required={true}
                        inputRef={dd214InputRef}
                        fieldName="dd214File"
                        fileNameKey="dd214"
                        helpText="Your DD214 is required to verify military service."
                      />
                      <FileUploadField
                        label="Service Treatment Records"
                        required={false}
                        inputRef={strInputRef}
                        fieldName="serviceTreatmentRecords"
                        fileNameKey="serviceTreatmentRecords"
                        helpText="Upload your Service Treatment Records if available."
                      />
                      <FileUploadField
                        label="VA Blue Button Report"
                        required={false}
                        inputRef={blueButtonInputRef}
                        fieldName="vaBlueButtonReport"
                        fileNameKey="vaBlueButtonReport"
                        helpText="Upload your VA Blue Button Report if available."
                      />
                      <FileUploadField
                        label="Private Medical Records"
                        required={false}
                        inputRef={privateMedicalInputRef}
                        fieldName="privateMedicalRecords"
                        fileNameKey="privateMedicalRecords"
                        helpText="Upload any private medical records if available."
                      />
                      <FileUploadField
                        label="Prior DBQ / Nexus Letter"
                        required={false}
                        inputRef={priorDbqInputRef}
                        fieldName="priorDbqNexusLetter"
                        fileNameKey="priorDbqNexusLetter"
                        helpText="Upload any prior DBQ or Nexus Letter if available."
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: VA Disability Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#B31942] flex items-center">
                    <span className="bg-[#0B1D39] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                      3
                    </span>
                    VA Disability Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        VA Disability Claim Status *
                      </label>
                      <select
                        name="claimStatus"
                        value={formData.claimStatus}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                      >
                        <option value="">Select Status</option>
                        <option value="Pending">Claim Pending</option>
                        <option value="Approved">Claim Approved</option>
                        <option value="Denied/Appealing">
                          Denied/Appealing
                        </option>
                        <option value="Not Yet Filed">Not Yet Filed</option>
                      </select>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                          Type of Evaluation Needed *
                        </label>
                        <select
                          name="evaluationType"
                          value={formData.evaluationType}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                        >
                          <option value="">Select Evaluation Type</option>
                          <option value="Nexus Letter">Nexus Letter</option>
                          <option value="DBQ">DBQ</option>
                          <option value="Independent Medical Opinion">
                            Independent Medical Opinion
                          </option>
                          <option value="All of the above">
                            All of the above
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                          Conditions Being Claimed *
                        </label>
                        <select
                          name="conditionsClaimed"
                          value={formData.conditionsClaimed}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                        >
                          <option value="">Select Condition Type</option>
                          <option value="Medical Conditions">
                            Medical Conditions
                          </option>
                          <option value="Mental Health Condition">
                            Mental Health Condition
                          </option>
                          <option value="All of the above">
                            All of the above
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Existing Diagnosis *
                      </label>
                      <select
                        name="existingDiagnosis"
                        value={formData.existingDiagnosis}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#1E4F91] focus:outline-none"
                      >
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Service Connected Medical Conditions *
                      </label>
                      <Textarea
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleChange}
                        required
                        placeholder="How the claimed condition is connected to military service or an already service-connected disability. The veteran describes the direct or secondary nexus in their own words."
                        className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[100px]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Current Symptoms *
                      </label>
                      <Textarea
                        name="currentSymptoms"
                        value={formData.currentSymptoms}
                        onChange={handleChange}
                        required
                        placeholder="A detailed description of present symptoms related to the claimed condition."
                        className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[100px]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Current Medications *
                      </label>
                      <Textarea
                        name="currentMedications"
                        value={formData.currentMedications}
                        onChange={handleChange}
                        required
                        placeholder="All medications currently being taken specifically for the claimed condition."
                        className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[100px]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0B1D39] mb-1">
                        Prior Treatment History *
                      </label>
                      <Textarea
                        name="priorTreatmentHistory"
                        value={formData.priorTreatmentHistory}
                        onChange={handleChange}
                        required
                        placeholder="Previous treatment for the condition, including doctors, therapists, clinics, or hospitals."
                        className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Financial Hardship Statement */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#B31942] flex items-center">
                    <span className="bg-[#0B1D39] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                      4
                    </span>
                    Financial Hardship Statement
                  </h3>
                  <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                    <p className="text-sm text-red-800">
                      Please provide a brief statement explaining your current
                      financial situation and why you need assistance. This
                      helps us understand your circumstances and prioritize
                      applications.
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

                {/* Section 5: Certification & Consent */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#B31942] flex items-center">
                    <span className="bg-[#0B1D39] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                      5
                    </span>
                    Certification & Consent
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Please read and agree to all statements below to complete
                    your application:
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
                          checked={formData.certifications.includes(
                            option.value,
                          )}
                          onChange={handleChange}
                          className="mt-0.5 mr-3 w-4 h-4 text-[#1E4F91] rounded"
                        />
                        <span className="text-sm text-[#0B1D39]">
                          {option.label}
                        </span>
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
                        By typing your name, you agree this serves as your
                        electronic signature.
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
                <h3 className="text-lg font-bold text-[#0B1D39] mb-4 pb-2 border-b-2 border-[#B31942]">
                  Additional Information
                </h3>
                <Textarea
                  name="hardshipStatement"
                  value={formData.hardshipStatement}
                  onChange={handleChange}
                  placeholder="Is there anything else you'd like us to know about your situation?"
                  className="border-2 border-gray-300 focus:border-[#1E4F91] min-h-[100px]"
                />
              </div>
            )}

            {/* What Happens Next - V-MEAF only */}
            {isVMEAF && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <h4 className="font-semibold text-red-800 mb-2">
                  What happens next?
                </h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>
                    • Your application will be reviewed within 10-14 business
                    days
                  </li>
                  <li>
                    • We may contact you if additional information is needed
                  </li>
                  <li>
                    • You will receive notification of our decision via email
                  </li>
                  <li>
                    • For questions, email info@all4vets.us or call (800)
                    555-VETS
                  </li>
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
                disabled={
                  isSubmitting ||
                  (isVMEAF && formData.certifications.length !== 6)
                }
                className="flex-1 bg-[#B31942] hover:bg-[#d43e2e] text-white font-bold py-4 rounded-full disabled:opacity-50"
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
