import { createClient } from "@/lib/supabase/server";
import ApplicationsClient from "./ApplicationsClient";

export const dynamic = 'force-dynamic';

export default async function AdminVendorApplicationsPage() {
  const supabase = await createClient();

  // Fetch pending applications by default, or all applications
  const { data: applications, error } = await supabase
    .from("vendor_applications")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Applications</h1>
          <p className="text-gray-500 text-sm mt-1">Review and manage P2P vendor applications.</p>
        </div>
      </div>

      {error && <div className="text-red-500 mb-4">Error loading applications: {error.message}</div>}

      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <ApplicationsClient initialApplications={applications || []} />
      </div>
    </div>
  );
}
