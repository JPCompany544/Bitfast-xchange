"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import P2PPaymentModal, { VendorType } from "../components/P2PPaymentModal";
import { createClient } from "@/lib/supabase/client";

const METHOD_ICONS: Record<string, { label: string; src: string }> = {
  cashapp: { label: "Cashapp", src: "/cashapp.svg" },
  zelle: { label: "Zelle", src: "/zelle.svg" },
  wire: { label: "Wire Transfer", src: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png" },
};

function P2PContent() {
  const searchParams = useSearchParams();
  const initialAmount = searchParams.get("amount") || "";
  const initialMethod = searchParams.get("method") || "all";
  const mode = searchParams.get("mode") || "buy";
  
  const [amountFilter, setAmountFilter] = useState(initialAmount);
  const [methodFilter, setMethodFilter] = useState(initialMethod);
  const [isLoading, setIsLoading] = useState(true);
  const [vendors, setVendors] = useState<VendorType[]>([]);
  
  // Modal State
  const [selectedVendor, setSelectedVendor] = useState<VendorType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchVendors() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .order("price", { ascending: true });
        
      if (!error && data) {
        // Map database columns to camelCase expected by component
        const mappedVendors: VendorType[] = data.map(v => ({
          id: v.id,
          name: v.name,
          isInstitutional: v.is_institutional,
          completionRate: v.completion_rate.toString(),
          totalOrders: v.total_orders,
          likes: v.likes,
          price: v.price,
          minLimit: v.min_limit,
          maxLimit: v.max_limit,
          methods: v.methods,
        }));
        setVendors(mappedVendors);
      }
      setIsLoading(false);
    }
    
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(v => {
    if (methodFilter !== "all" && !v.methods.includes(methodFilter)) return false;
    if (amountFilter) {
      const amt = parseFloat(amountFilter);
      if (!isNaN(amt)) {
        if (amt < v.minLimit || amt > v.maxLimit) return false;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">P2P Market</h1>
            <p className="text-gray-500 mt-2 text-[15px]">Trade directly with verified institutional and premium vendors.</p>
          </div>
          
          {/* Top Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white border border-gray-200 rounded-[12px] p-1 shadow-sm">
              <a href="?mode=buy" className={`px-5 py-2 text-[14px] font-semibold rounded-[8px] transition-colors ${mode === "buy" ? "bg-[#b1ff8c] text-gray-900" : "text-gray-500 hover:text-gray-900"}`}>Buy</a>
              <a href="?mode=sell" className={`px-5 py-2 text-[14px] font-semibold rounded-[8px] transition-colors ${mode === "sell" ? "bg-[#ff8c8c] text-white" : "text-gray-500 hover:text-gray-900"}`}>Sell</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-[16px] p-5 sticky top-24 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              <h3 className="font-semibold text-gray-900 mb-4 text-[16px]">Filter Offers</h3>
              
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-gray-500">Amount (USD)</label>
                  <input 
                    type="number" 
                    value={amountFilter}
                    onChange={(e) => setAmountFilter(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full h-11 px-3 border border-gray-300 rounded-[8px] text-[14px] outline-none focus:border-[#7592f0] focus:ring-1 focus:ring-[#7592f0] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-gray-500">Fiat Currency</label>
                  <select className="w-full h-11 px-3 border border-gray-300 rounded-[8px] text-[14px] outline-none focus:border-[#7592f0] focus:ring-1 focus:ring-[#7592f0] transition-all bg-white appearance-none cursor-pointer">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-gray-500">Payment Method</label>
                  <select 
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                    className="w-full h-11 px-3 border border-gray-300 rounded-[8px] text-[14px] outline-none focus:border-[#7592f0] focus:ring-1 focus:ring-[#7592f0] transition-all bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">All Methods</option>
                    <option value="cashapp">Cashapp</option>
                    <option value="zelle">Zelle</option>
                    <option value="wire">Wire Transfer</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => { setAmountFilter(""); setMethodFilter("all"); }}
                    className="text-[13px] font-semibold text-[#7592f0] hover:text-[#5c7ae0] transition-colors"
                  >
                    Reset all filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-[16px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
              
              {/* Table Header (Hidden on Mobile) */}
              <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Advertiser</div>
                <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Price</div>
                <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Limit & Method</div>
                <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider text-right w-[120px]">Action</div>
              </div>

              {/* Vendor List */}
              <div className="flex flex-col">
                {isLoading ? (
                  // Skeletons
                  Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 px-6 py-5 border-b border-gray-100 animate-pulse">
                      <div className="w-full md:w-[35%] flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                        <div className="flex flex-col gap-2 w-full">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                      <div className="w-full md:w-[25%] flex flex-col gap-2">
                        <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                      </div>
                      <div className="w-full md:w-[25%] flex flex-col gap-2">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="w-full md:w-[15%] flex justify-end">
                        <div className="w-full md:w-[120px] h-10 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  ))
                ) : filteredVendors.length > 0 ? (
                  filteredVendors.map((vendor, index) => (
                    <div key={vendor.id} className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-y-4 md:gap-x-4 px-6 py-5 border-b border-gray-100 hover:bg-[#fcfdfd] transition-colors">
                      
                      {/* Advertiser Info */}
                      <div className="flex gap-3 items-start md:items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e0e7ff] to-[#c7d2fe] flex items-center justify-center text-[#3730a3] font-bold text-[16px] flex-shrink-0">
                          {vendor.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-gray-900 text-[15px]">{vendor.name}</span>
                            {vendor.isInstitutional && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-[#009be3]">
                                <path fill="currentColor" d="m11.144 2.115 1.547-1.124a1 1 0 0 1 1.17 0l1.547 1.124a1 1 0 0 0 .97.104l1.716-.767a1 1 0 0 1 1.306.666l.542 1.802a1 1 0 0 0 .809.68l1.868.212a1 1 0 0 1 .88 1.17l-.504 1.813a1 1 0 0 0 .422.99l1.493 1.196a1 1 0 0 1 .2 1.455l-1.196 1.493a1 1 0 0 0 .104.97l1.124 1.547a1 1 0 0 1 0 1.17l-1.124 1.547a1 1 0 0 0-.104.97l1.196 1.493a1 1 0 0 1-.2 1.455l-1.493 1.196a1 1 0 0 0-.422.99l.504 1.813a1 1 0 0 1-.88 1.17l-1.868.212a1 1 0 0 0-.809.68l-.542 1.802a1 1 0 0 1-1.306.666l-1.716-.767a1 1 0 0 0-.97.104l-1.547 1.124a1 1 0 0 1-1.17 0l-1.547-1.124a1 1 0 0 0-.97-.104l-1.716.767a1 1 0 0 1-1.306-.666l-.542-1.802a1 1 0 0 0-.809-.68l-1.868-.212a1 1 0 0 1-.88-1.17l.504-1.813a1 1 0 0 0-.422-.99L1.92 15.656a1 1 0 0 1-.2-1.455l1.196-1.493a1 1 0 0 0-.104-.97l-1.124-1.547a1 1 0 0 1 0-1.17l1.124-1.547a1 1 0 0 0 .104-.97L1.72 5.021a1 1 0 0 1 .2-1.455l1.493-1.196a1 1 0 0 0 .422-.99l-.504-1.813a1 1 0 0 1 .88-1.17l1.868-.212a1 1 0 0 0 .809-.68l.542-1.802a1 1 0 0 1 1.306-.666l1.716.767a1 1 0 0 0 .97-.104"></path>
                                <path fill="#fff" fillRule="evenodd" d="M16.745 8.136a1 1 0 0 1 .119 1.41l-5 6a1 1 0 0 1-1.465.059l-3-3a1 1 0 1 1 1.414-1.414l2.223 2.223 4.3-5.16a1 1 0 0 1 1.409-.118" clipRule="evenodd"></path>
                              </svg>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-[13px] text-gray-500 font-medium">
                            <span>{vendor.totalOrders.toLocaleString()} orders</span>
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                            <span className="text-green-600">{vendor.completionRate}% completion</span>
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                            <span className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" className="text-gray-400">
                                <path fill="currentColor" d="M14.542 3c-1.396 0-2.227 1.433-1.848 2.76.197.69.458 1.419.709 2.115a30.4 30.4 0 0 1 .536 1.625h-5.07c-2.302 0-3.327 2.894-1.528 4.31l1.808 1.423-1.282 2.378c-.733 1.36.467 2.895 1.956 2.502l2.392-.63a23.4 23.4 0 0 1 2.308-.48c1.396-.215 2.545-1.127 3.328-2.12.871-1.104 1.474-2.453 1.761-3.766a20 20 0 0 0 .385-4.27 4.15 4.15 0 0 0-4.148-4.22c-.401-.01-.908-.024-1.307-.024"></path>
                              </svg>
                              {vendor.likes}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col justify-center">
                        <span className="text-[20px] font-bold text-gray-900">
                          {vendor.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </span>
                      </div>

                      {/* Limits & Payment Method */}
                      <div className="flex flex-col gap-1.5 justify-center">
                        <div className="text-[13px] text-gray-600 font-medium">
                          <span className="text-gray-400 mr-1">Available</span> 
                          ${vendor.minLimit.toLocaleString()} - ${vendor.maxLimit.toLocaleString()}
                        </div>
                        <div className="flex gap-1.5 flex-wrap mt-0.5">
                          {vendor.methods.map((method) => (
                            <div key={method} className="flex items-center gap-1.5 bg-[#f0f4ff] border border-[#d1dcff] px-2 py-1 rounded-[6px]" title={METHOD_ICONS[method].label}>
                              <img src={METHOD_ICONS[method].src} alt={method} className="w-3.5 h-3.5 object-contain" />
                              <span className="text-[11px] font-bold text-[#3b5ccc]">{METHOD_ICONS[method].label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex md:justify-end items-center mt-3 md:mt-0">
                        <button 
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setIsModalOpen(true);
                          }}
                          className={`w-full md:w-auto px-6 py-2.5 rounded-full font-semibold text-[14px] text-[#0a0a0a] transition-colors shadow-sm ${
                            mode === "sell" ? "bg-[#ff8c8c] hover:bg-[#ff7373]" : "bg-[#b1ff8c] hover:bg-[#a4f77d]"
                          }`}
                        >
                          {mode === "sell" ? "Sell BTC" : "Buy BTC"}
                        </button>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" className="text-gray-300 mb-4">
                      <path fill="currentColor" fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z" clipRule="evenodd"></path>
                    </svg>
                    <h3 className="text-[18px] font-semibold text-gray-900 mb-1">No offers found</h3>
                    <p className="text-[14px] text-gray-500">Try adjusting your filters to see more results.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-[12px] p-1 shadow-sm">
                <button className="w-9 h-9 flex items-center justify-center rounded-[8px] hover:bg-gray-100 text-gray-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" d="M15.707 5.293a1 1 0 0 1 0 1.414L10.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0z" clipRule="evenodd"></path>
                  </svg>
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-[8px] bg-gray-900 text-white font-semibold text-[14px]">1</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-[8px] hover:bg-gray-100 text-gray-600 font-medium text-[14px] transition-colors">2</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-[8px] hover:bg-gray-100 text-gray-600 font-medium text-[14px] transition-colors">3</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-[8px] hover:bg-gray-100 text-gray-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" d="M8.293 18.707a1 1 0 0 1 0-1.414L13.586 12 8.293 6.707a1 1 0 0 1 1.414-1.414l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <P2PPaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        vendor={selectedVendor} 
        initialAmount={amountFilter || "1000"} 
        initialMethod={methodFilter}
        mode={mode}
      />
    </div>
  );
}

export default function P2PPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f9fa] pt-24"><div className="w-12 h-12 border-4 border-[#7592f0] border-t-transparent rounded-full animate-spin mx-auto"></div></div>}>
      <P2PContent />
    </Suspense>
  );
}
