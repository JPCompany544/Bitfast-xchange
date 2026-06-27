"use client";

import { useState } from "react";

export default function BecomeVendorPage() {
  const [accountType, setAccountType] = useState<"Individual" | "Business">("Individual");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Application Received</h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for applying to become a vendor. Our compliance team will review your application and contact you within 24-48 hours.
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#0052ff] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052ff]"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Become a Vendor</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join our P2P marketplace and start trading with millions of users globally. Please complete the application below.
          </p>
        </div>

        <div className="bg-white py-10 px-6 shadow-sm rounded-2xl border border-gray-100 sm:px-10">
          <form className="space-y-10" onSubmit={handleSubmit}>
            
            {/* Section: Personal Details */}
            <div>
              <h3 className="text-xl leading-6 font-semibold text-gray-900 mb-6 border-b border-gray-100 pb-3">Personal Details</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="mt-2">
                    <input type="text" name="fullName" id="fullName" required
                      className="block w-full shadow-sm focus:ring-[#0052ff] focus:border-[#0052ff] sm:text-sm border-gray-300 rounded-md h-12 px-4 bg-gray-50 border"
                      placeholder="John Doe" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="mt-2">
                    <input type="email" name="email" id="email" required
                      className="block w-full shadow-sm focus:ring-[#0052ff] focus:border-[#0052ff] sm:text-sm border-gray-300 rounded-md h-12 px-4 bg-gray-50 border"
                      placeholder="john@example.com" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-2">
                    <input type="tel" name="phone" id="phone" required
                      className="block w-full shadow-sm focus:ring-[#0052ff] focus:border-[#0052ff] sm:text-sm border-gray-300 rounded-md h-12 px-4 bg-gray-50 border"
                      placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                  <div className="mt-2">
                    <select id="country" name="country" required
                      className="block w-full shadow-sm focus:ring-[#0052ff] focus:border-[#0052ff] sm:text-sm border-gray-300 rounded-md h-12 px-4 bg-gray-50 border">
                      <option value="">Select a country</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Nigeria</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Verification */}
            <div>
              <h3 className="text-xl leading-6 font-semibold text-gray-900 mb-6 border-b border-gray-100 pb-3">Verification</h3>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-[#0052ff] hover:text-blue-500 focus-within:outline-none">
                      <span>Upload Government ID</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" required />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Section: Business */}
            <div>
              <h3 className="text-xl leading-6 font-semibold text-gray-900 mb-6 border-b border-gray-100 pb-3">Business Profile</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input id="individual" name="accountType" type="radio" 
                      checked={accountType === "Individual"}
                      onChange={() => setAccountType("Individual")}
                      className="focus:ring-[#0052ff] h-4 w-4 text-[#0052ff] border-gray-300" />
                    <label htmlFor="individual" className="ml-3 block text-sm font-medium text-gray-700">Individual</label>
                  </div>
                  <div className="flex items-center">
                    <input id="business" name="accountType" type="radio" 
                      checked={accountType === "Business"}
                      onChange={() => setAccountType("Business")}
                      className="focus:ring-[#0052ff] h-4 w-4 text-[#0052ff] border-gray-300" />
                    <label htmlFor="business" className="ml-3 block text-sm font-medium text-gray-700">Business</label>
                  </div>
                </div>
              </div>

              {accountType === "Business" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
                  <div className="mt-2">
                    <input type="text" name="businessName" id="businessName" required={accountType === "Business"}
                      className="block w-full shadow-sm focus:ring-[#0052ff] focus:border-[#0052ff] sm:text-sm border-gray-300 rounded-md h-12 px-4 bg-gray-50 border"
                      placeholder="Your Company LLC" />
                  </div>
                </div>
              )}
            </div>

            {/* Section: Experience */}
            <div>
              <h3 className="text-xl leading-6 font-semibold text-gray-900 mb-6 border-b border-gray-100 pb-3">Experience</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="tradingVolume" className="block text-sm font-medium text-gray-700">Monthly Trading Volume</label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <select id="tradingVolume" name="tradingVolume" required
                      className="block w-full pl-7 focus:ring-[#0052ff] focus:border-[#0052ff] sm:text-sm border-gray-300 rounded-md h-12 px-4 bg-gray-50 border">
                      <option value="">Select volume</option>
                      <option value="0-10k">Less than $10,000</option>
                      <option value="10k-50k">$10,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k+">More than $100,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="cryptoExperience" className="block text-sm font-medium text-gray-700">Years of Crypto Experience</label>
                  <div className="mt-2">
                    <select id="cryptoExperience" name="cryptoExperience" required
                      className="block w-full focus:ring-[#0052ff] focus:border-[#0052ff] sm:text-sm border-gray-300 rounded-md h-12 px-4 bg-gray-50 border">
                      <option value="">Select experience</option>
                      <option value="<1">Less than 1 year</option>
                      <option value="1-3">1 to 3 years</option>
                      <option value="3-5">3 to 5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-sm text-base font-semibold text-white bg-[#0052ff] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052ff] disabled:opacity-70 transition-all duration-200"
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </button>
              <p className="mt-4 text-xs text-center text-gray-500">
                By submitting this application, you agree to our Terms of Service and Privacy Policy. All information provided will be subject to our KYC/AML verification process.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
