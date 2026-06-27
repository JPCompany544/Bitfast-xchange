import { createClient } from "@/lib/supabase/server";
import TransactionsClient from "./TransactionsClient";

export const dynamic = 'force-dynamic';

export default async function AdminTransactionsPage() {
  const supabase = await createClient();

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select(`
      *,
      profiles(email),
      vendors(name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="text-red-500">Error loading transactions: {error.message}</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-500 text-sm mt-1">Approve or reject P2P transactions in real-time.</p>
      </div>

      <TransactionsClient initialTransactions={transactions || []} />
    </div>
  );
}
