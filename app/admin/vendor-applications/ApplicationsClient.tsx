"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Application = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  id_document_url: string;
  account_type: string;
  business_name: string | null;
  trading_volume: string;
  crypto_experience: string;
  status: string;
  created_at: string;
};

export default function ApplicationsClient({ initialApplications }: { initialApplications: Application[] }) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const supabase = createClient();

  const handleAction = async (app: Application, action: "approve" | "reject") => {
    setProcessingId(app.id);
    setErrorMsg("");
    
    try {
      const newStatus = action === "approve" ? "approved" : "rejected";

      // Update application status
      const { error: updateError } = await supabase
        .from("vendor_applications")
        .update({ status: newStatus })
        .eq("id", app.id);

      if (updateError) throw updateError;

      // If approved, create a vendor profile
      if (action === "approve") {
        const vendorName = app.account_type === "Business" && app.business_name 
            ? app.business_name 
            : app.full_name;
            
        const newVendor = {
          name: vendorName,
          is_institutional: app.account_type === "Business",
          price: 1.0, // Default values for a new vendor
          min_limit: 10,
          max_limit: 1000,
          methods: ["Bank Transfer"],
          completion_rate: 100,
          total_orders: 0
        };

        const { error: insertError } = await supabase
          .from("vendors")
          .insert([newVendor]);

        if (insertError) {
          // If inserting vendor fails, try to revert the application status
          await supabase.from("vendor_applications").update({ status: "pending" }).eq("id", app.id);
          throw new Error("Failed to create vendor profile: " + insertError.message);
        }
      }

      // Update local state
      setApplications(prev => prev.map(a => a.id === app.id ? { ...a, status: newStatus } : a));

    } catch (err: any) {
      setErrorMsg(err.message || `Failed to ${action} application`);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      {errorMsg && (
        <div className="m-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {errorMsg}
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type / Experience</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Document</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{app.full_name}</div>
                <div className="text-xs text-gray-500">{app.country}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{app.email}</div>
                <div className="text-xs text-gray-500">{app.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {app.account_type} {app.business_name ? `(${app.business_name})` : ""}
                </div>
                <div className="text-xs text-gray-500">Exp: {app.crypto_experience} | Vol: {app.trading_volume}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                {app.id_document_url ? (
                  <a href={app.id_document_url} target="_blank" rel="noopener noreferrer" className="underline">View ID</a>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  app.status === 'approved' ? 'bg-green-100 text-green-800' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {app.status === 'pending' && (
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleAction(app, "approve")}
                      disabled={processingId === app.id}
                      className="text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md disabled:opacity-50 transition-colors"
                    >
                      {processingId === app.id ? "..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handleAction(app, "reject")}
                      disabled={processingId === app.id}
                      className="text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md disabled:opacity-50 transition-colors"
                    >
                      {processingId === app.id ? "..." : "Reject"}
                    </button>
                  </div>
                )}
                {app.status !== 'pending' && (
                  <span className="text-gray-400 italic">Processed</span>
                )}
              </td>
            </tr>
          ))}
          {applications.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                No vendor applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
