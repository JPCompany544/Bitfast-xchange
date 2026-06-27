"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export type VendorType = {
  id: string;
  name: string;
  isInstitutional: boolean;
  completionRate: string;
  totalOrders: number;
  likes: number;
  price: number;
  minLimit: number;
  maxLimit: number;
  methods: string[];
};

type P2PPaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vendor: VendorType | null;
  initialAmount: string;
  initialMethod: string;
  mode?: string;
};

export default function P2PPaymentModal({ isOpen, onClose, vendor, initialAmount, initialMethod, mode = "buy" }: P2PPaymentModalProps) {
  const [step, setStep] = useState<number>(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [amount, setAmount] = useState(initialAmount || "1000");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("cashapp");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setTermsAccepted(false);
      setFileUploaded(false);
      setTimeLeft(15 * 60);
      setIsProcessing(false);
      
      // If the user already selected a specific method earlier (not 'all'), auto-select it.
      if (initialMethod && initialMethod !== "all" && vendor?.methods.includes(initialMethod)) {
        setSelectedMethod(initialMethod);
      } else if (vendor && vendor.methods.length > 0) {
        setSelectedMethod(vendor.methods[0]);
      }
    }
  }, [isOpen, vendor, initialMethod]);

  useEffect(() => {
    if (!isOpen || step >= 4) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, step]);

  if (!isOpen || !vendor) return null;

  const btcAmount = (parseFloat(amount) / vendor.price).toFixed(8);
  const formattedTime = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;

  const handleNextStep = async () => {
    if (step === 3) {
      setIsProcessing(true);
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in to make a transaction.");
        setIsProcessing(false);
        return;
      }

      // Insert transaction
      const { data: tx, error } = await supabase.from("transactions").insert([{
        user_id: user.id,
        vendor_id: vendor.id,
        amount: parseFloat(amount),
        method: selectedMethod,
        status: "pending"
      }]).select().single();

      if (error || !tx) {
        alert("Failed to create transaction: " + (error?.message || "Unknown error"));
        setIsProcessing(false);
        return;
      }

      // Subscribe to this specific transaction's updates
      const channel = supabase
        .channel(`tx-${tx.id}`)
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "transactions", filter: `id=eq.${tx.id}` },
          (payload) => {
            if (payload.new.status === "approved") {
              setIsProcessing(false);
              setStep(4);
              supabase.removeChannel(channel);
            } else if (payload.new.status === "rejected") {
              alert("Transaction was rejected by the vendor.");
              setIsProcessing(false);
              supabase.removeChannel(channel);
            }
          }
        )
        .subscribe();
    } else {
      setStep(step + 1);
    }
  };

  const getPaymentDetails = (method: string) => {
    switch(method) {
      case "cashapp": return [{ label: "Cashtag", value: `$${vendor.name.replace(/\s+/g, '').toLowerCase()}OTC` }];
      case "zelle": return [{ label: "Email", value: `pay@${vendor.name.replace(/\s+/g, '').toLowerCase()}.com` }];
      case "wire": return [
        { label: "Account No.", value: `**** **** **** 8821` },
        { label: "Routing No.", value: `021000021` },
        { label: "Bank Name", value: `Chase Bank` }
      ];
      default: return [{ label: "Account ID", value: `1234567890` }];
    }
  };

  const paymentDetails = getPaymentDetails(selectedMethod);

  const METHOD_LABELS: Record<string, string> = {
    cashapp: "Cashapp",
    zelle: "Zelle",
    wire: "Wire Transfer"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[520px] rounded-[20px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-[18px] font-bold text-gray-900">{mode === "sell" ? "Sell BTC to" : "Buy BTC from"} {vendor.name}</h2>
            {step < 4 && (
              <div className="text-[13px] font-medium text-red-500 mt-0.5 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm1-10V7a1 1 0 10-2 0v6a1 1 0 001 1h4a1 1 0 100-2h-3z"></path></svg>
                Order cancels in {formattedTime}
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          
          {step === 1 && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <div className="bg-[#f8f9fa] rounded-[12px] p-3 border border-gray-100">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200">
                  <span className="text-[13px] text-gray-500 font-medium">{mode === "sell" ? "You receive" : "You pay"}</span>
                  <span className="text-[16px] font-bold text-gray-900">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500 font-medium">{mode === "sell" ? "You send" : "You receive"}</span>
                  <span className="text-[16px] font-bold text-[#f7931a]">~ {btcAmount} BTC</span>
                </div>
              </div>

              <div>
                <div className="bg-[#fff4d6] border border-[#fdeec3] rounded-[12px] p-3 text-[12px] text-gray-800 flex flex-col gap-1.5">
                  <h3 className="font-bold mb-0.5 text-[13px]">Vendor Terms</h3>
                  <p>1. <strong>NO 3RD PARTY PAYMENTS.</strong> Name must match profile.</p>
                  <p>2. No crypto-related words in the transaction memo.</p>
                  <p>3. Funds will be locked in secure escrow.</p>
                </div>
              </div>

              {/* Only show method selector if no specific initial method was provided and vendor has multiple */}
              {initialMethod === "all" && vendor.methods.length > 1 && (
                <div>
                  <h3 className="text-[14px] font-semibold text-gray-900 mb-2">Select Payment Method</h3>
                  <div className="flex gap-2">
                    {vendor.methods.map((method) => (
                      <label 
                        key={method} 
                        className={`flex-1 border rounded-[8px] p-2 cursor-pointer text-center transition-colors ${
                          selectedMethod === method 
                            ? "border-[#7592f0] bg-[#f0f4ff] text-[#3b5ccc] font-bold" 
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="p2pMethod" 
                          value={method} 
                          checked={selectedMethod === method}
                          onChange={() => setSelectedMethod(method)}
                          className="hidden"
                        />
                        <span className="text-[12px]">{METHOD_LABELS[method]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <label className="flex items-start gap-2 cursor-pointer p-3 border border-gray-200 rounded-[12px] hover:bg-gray-50 transition-colors">
                <div className="pt-0.5">
                  <input 
                    type="checkbox" 
                    className={`w-4 h-4 rounded border-gray-300 text-[${mode === "sell" ? "#ff8c8c" : "#7592f0"}] cursor-pointer`}
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                </div>
                <span className="text-[13px] text-gray-700 font-medium leading-tight">
                  I confirm I will {mode === "sell" ? "receive funds" : "pay"} from an account in my own name.
                </span>
              </label>

              <button 
                onClick={handleNextStep}
                disabled={!termsAccepted}
                className={`w-full py-3 rounded-full font-semibold text-[15px] transition-all ${
                  termsAccepted ? (mode === "sell" ? "bg-[#ff8c8c] text-[#0a0a0a] hover:bg-[#ff7373]" : "bg-[#b1ff8c] text-[#0a0a0a] hover:bg-[#a4f77d]") : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {mode === "sell" ? "Lock BTC in Escrow" : "Create Order & Lock Escrow"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <div className={`border rounded-[10px] p-3 flex items-center gap-3 ${mode === "sell" ? "bg-[#fff0f0] border-[#ff7373]" : "bg-[#eafdf0] border-[#a4f77d]"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[#0a0a0a] flex-shrink-0 ${mode === "sell" ? "bg-[#ff8c8c]" : "bg-[#b1ff8c]"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d={mode === "sell" ? "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" : "M5 13l4 4L19 7"} /></svg>
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900">{mode === "sell" ? "BTC Locked" : "BTC Secured"}</h4>
                  <p className="text-[12px] text-gray-700">{mode === "sell" ? "Waiting for vendor to send Fiat." : "Safe to proceed with payment."}</p>
                </div>
              </div>

              <div>
                <h3 className="text-[14px] font-semibold text-gray-900 mb-2">Payment Details</h3>
                <div className="border border-gray-200 rounded-[10px] p-3 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-gray-500 font-medium">Method</span>
                    <span className="text-[13px] font-bold text-gray-900 capitalize">{METHOD_LABELS[selectedMethod]}</span>
                  </div>
                  <div className="h-px bg-gray-100 w-full"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-gray-500 font-medium">Amount to send</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[18px] font-bold text-gray-900">${parseFloat(amount).toLocaleString()}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(amount, 'amount')}
                        className="text-gray-400 hover:text-green-500 transition-colors"
                        title="Copy Amount"
                      >
                        {copiedKey === 'amount' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100 w-full"></div>
                  {paymentDetails.map((detail, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-[12px] text-gray-500 font-medium">{detail.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-gray-900">{detail.value}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(detail.value, `detail-${idx}`)}
                          className="text-gray-400 hover:text-green-500 transition-colors"
                          title="Copy Details"
                        >
                          {copiedKey === `detail-${idx}` ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <button 
                  onClick={handleNextStep}
                  className={`w-full py-3 rounded-full font-semibold text-[15px] text-[#0a0a0a] transition-all ${mode === "sell" ? "bg-[#ff8c8c] hover:bg-[#ff7373]" : "bg-[#b1ff8c] hover:bg-[#a4f77d]"}`}
                >
                  {mode === "sell" ? "I have received the funds" : "I have transferred the funds"}
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-2.5 rounded-full font-semibold text-[13px] bg-white text-gray-500 hover:text-red-600 transition-all border border-transparent hover:border-red-100 hover:bg-red-50"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#e0e7ff] text-[#3730a3] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                </div>
                <h3 className="text-[18px] font-bold text-gray-900 mb-1">{mode === "sell" ? "Proof from Vendor" : "Upload Payment Proof"}</h3>
                <p className="text-[13px] text-gray-500 px-2">{mode === "sell" ? "Review the receipt from the vendor." : "Attach a screenshot of your successful transaction."}</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-[12px] p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden group">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFileUploaded(true);
                    }
                  }}
                  accept="image/*"
                />
                {!fileUploaded ? (
                  <div className="flex flex-col items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-gray-400 group-hover:text-[#7592f0] transition-colors"><path fill="currentColor" fillRule="evenodd" d="M4 4a2 2 0 012-2h8.586a2 2 0 011.414.586l4.414 4.414A2 2 0 0121 8.414V20a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v4.5A1.5 1.5 0 0015.5 10H20v10H6V4z" clipRule="evenodd"></path></svg>
                    <span className="text-[14px] font-semibold text-gray-700">Click to upload or drag & drop</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[14px] font-semibold text-green-700">Screenshot attached</span>
                    <span className="text-[12px] text-gray-500 underline z-20 relative cursor-pointer" onClick={(e) => { e.stopPropagation(); setFileUploaded(false); }}>Remove file</span>
                  </div>
                )}
              </div>

              <button 
                onClick={handleNextStep}
                disabled={!fileUploaded || isProcessing}
                className={`w-full py-3 mt-2 rounded-full font-semibold text-[15px] transition-all flex items-center justify-center gap-2 ${
                  fileUploaded && !isProcessing ? (mode === "sell" ? "bg-[#ff8c8c] text-[#0a0a0a] hover:bg-[#ff7373]" : "bg-[#7592f0] text-white hover:bg-[#5c7ae0]") : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    {mode === "sell" ? "Releasing BTC..." : "Notifying Vendor..."}
                  </>
                ) : (
                  mode === "sell" ? "Release BTC" : "Confirm Payment"
                )}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-4 items-center text-center py-4 animate-fadeIn">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <h3 className="text-[20px] font-bold text-gray-900 mb-1">{mode === "sell" ? "Sale Complete!" : "Payment Successful!"}</h3>
                <p className="text-[13px] text-gray-600">{mode === "sell" ? "You successfully sold your BTC." : "The vendor released the escrow."}</p>
              </div>
              
              <div className="bg-[#f8f9fa] rounded-[12px] p-5 w-full mt-2 flex flex-col gap-1">
                <span className="text-[13px] text-gray-500 font-medium">{mode === "sell" ? "Fiat Received" : "Added to Wallet"}</span>
                <span className={`text-[24px] font-bold ${mode === "sell" ? "text-green-600" : "text-gray-900"}`}>
                  {mode === "sell" ? `+ $${parseFloat(amount).toLocaleString()}` : `+ ${btcAmount} BTC`}
                </span>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-3 rounded-full font-semibold text-[15px] bg-gray-900 text-white hover:bg-gray-800 transition-all mt-2"
              >
                View Wallet
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
