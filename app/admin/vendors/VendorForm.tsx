"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Vendor = {
  id?: string;
  name: string;
  is_institutional: boolean;
  price: number | string;
  min_limit: number | string;
  max_limit: number | string;
  methods: string[];
  total_orders: number | string;
  completion_rate: number | string;
};

const EMPTY_FORM: Vendor = {
  name: "",
  is_institutional: false,
  price: "",
  min_limit: "",
  max_limit: "",
  methods: [],
  total_orders: "",
  completion_rate: "",
};

export default function VendorForm({ vendorToEdit }: { vendorToEdit?: Vendor }) {
  const router = useRouter();
  const isEditMode = !!vendorToEdit;

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Vendor>(vendorToEdit || EMPTY_FORM);

  const openModal = () => {
    setFormData(vendorToEdit || EMPTY_FORM);
    setIsOpen(true);
  };

  const toggleMethod = (method: string) => {
    setFormData(prev => ({
      ...prev,
      methods: prev.methods.includes(method)
        ? prev.methods.filter(m => m !== method)
        : [...prev.methods, method]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.methods.length === 0) {
      alert("Please select at least one payment method.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();

    const payload = {
      name: formData.name,
      is_institutional: formData.is_institutional,
      price: parseFloat(String(formData.price)),
      min_limit: parseFloat(String(formData.min_limit)),
      max_limit: parseFloat(String(formData.max_limit)),
      methods: formData.methods,
      total_orders: parseInt(String(formData.total_orders)) || 0,
      completion_rate: parseFloat(String(formData.completion_rate)) || 100,
    };

    let error;
    if (isEditMode && vendorToEdit?.id) {
      ({ error } = await supabase.from("vendors").update(payload).eq("id", vendorToEdit.id));
    } else {
      ({ error } = await supabase.from("vendors").insert([payload]));
    }

    setIsSubmitting(false);

    if (error) {
      alert(`Error ${isEditMode ? "updating" : "creating"} vendor: ` + error.message);
    } else {
      setIsOpen(false);
      setFormData(EMPTY_FORM);
      router.refresh();
    }
  };

  return (
    <>
      {isEditMode ? (
        <button
          onClick={openModal}
          className="px-3 py-1.5 text-xs font-semibold text-[#0052ff] border border-[#0052ff] rounded hover:bg-blue-50 transition-colors"
        >
          Edit
        </button>
      ) : (
        <button
          onClick={openModal}
          className="px-4 py-2 bg-[#0052ff] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Create Vendor
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
              <h2 className="text-lg font-bold text-gray-900">
                {isEditMode ? "Edit Vendor" : "Create New Vendor"}
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              {/* Vendor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                <input required type="text" value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#0052ff] focus:border-[#0052ff]" />
              </div>

              {/* Institutional */}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="inst" checked={formData.is_institutional}
                  onChange={e => setFormData({ ...formData, is_institutional: e.target.checked })}
                  className="text-[#0052ff] rounded focus:ring-[#0052ff]" />
                <label htmlFor="inst" className="text-sm font-medium text-gray-700">Institutional Vendor?</label>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (USD per BTC)</label>
                <input required type="number" step="0.01" value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#0052ff] focus:border-[#0052ff]"
                  placeholder="e.g. 64500" />
              </div>

              {/* Limits */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Limit ($)</label>
                  <input required type="number" value={formData.min_limit}
                    onChange={e => setFormData({ ...formData, min_limit: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#0052ff] focus:border-[#0052ff]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Limit ($)</label>
                  <input required type="number" value={formData.max_limit}
                    onChange={e => setFormData({ ...formData, max_limit: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#0052ff] focus:border-[#0052ff]" />
                </div>
              </div>

              {/* Total Orders & Completion Rate */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Orders</label>
                  <input type="number" min="0" value={formData.total_orders}
                    onChange={e => setFormData({ ...formData, total_orders: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#0052ff] focus:border-[#0052ff]"
                    placeholder="e.g. 1250" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Completion Rate (%)</label>
                  <input type="number" min="0" max="100" step="0.1" value={formData.completion_rate}
                    onChange={e => setFormData({ ...formData, completion_rate: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#0052ff] focus:border-[#0052ff]"
                    placeholder="e.g. 98.5" />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Methods</label>
                <div className="flex flex-wrap gap-2">
                  {["cashapp", "zelle", "wire"].map(method => (
                    <button key={method} type="button" onClick={() => toggleMethod(method)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${
                        formData.methods.includes(method)
                          ? "bg-[#0052ff] text-white border-[#0052ff]"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}>
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#0052ff] rounded-md hover:bg-blue-700 disabled:opacity-50">
                  {isSubmitting ? (isEditMode ? "Saving..." : "Creating...") : (isEditMode ? "Save Changes" : "Create Vendor")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
