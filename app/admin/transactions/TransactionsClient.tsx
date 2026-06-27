"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Transaction = {
  id: string;
  amount: number;
  method: string;
  status: string;
  created_at: string;
  profiles: { email: string };
  vendors: { name: string };
};

export default function TransactionsClient({ initialTransactions }: { initialTransactions: any[] }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filter, setFilter] = useState<"all" | "pending">("pending");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Subscribe to new transactions or status changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        (payload) => {
          // When a change happens, just refresh the router to get fresh data with joins
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  // Update local state when props change (from router.refresh)
  useEffect(() => {
    setTransactions(initialTransactions);
  }, [initialTransactions]);

  const handleApprove = async (id: string) => {
    await supabase.from("transactions").update({ status: "approved" }).eq("id", id);
    router.refresh();
  };

  const handleReject = async (id: string) => {
    await supabase.from("transactions").update({ status: "rejected" }).eq("id", id);
    router.refresh();
  };

  const filtered = filter === "all" ? transactions : transactions.filter(t => t.status === "pending");

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex gap-2">
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${filter === "pending" ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700"}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${filter === "all" ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700"}`}
        >
          All Transactions
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vendor</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount / Method</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {t.profiles?.email || "Unknown User"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {t.vendors?.name || "Unknown Vendor"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">${t.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 uppercase">{t.method}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    t.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    t.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800 animate-pulse'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {t.status === 'pending' ? (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleApprove(t.id)} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Approve</button>
                      <button onClick={() => handleReject(t.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">Reject</button>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  No {filter} transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
