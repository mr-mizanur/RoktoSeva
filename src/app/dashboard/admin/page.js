"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Users, Droplets, Wallet, ShieldCheck, ClipboardList } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [stats, setStats] = useState({ totalUsers: 0, totalRequests: 0, totalFunding: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && (!user || user.role !== "admin")) {
      router.push("/dashboard");
      return;
    }

    if (user?.role === "admin") {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/stats`, { credentials: "include" })
        .then((r) => r.json())
        .then((d) => {
          console.log("Full API Response:", d); 
         
          const data = d.stats || d;
          setStats({
            totalUsers: data.totalUsers || 0,
            totalRequests: data.totalRequests || 0,
            totalFunding: data.totalFunding || 0,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch Error:", err);
          setLoading(false);
        });
    }
  }, [user, isPending, router]);

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center py-32 text-purple-500">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const formatCurrency = (val) => {
    const num = parseFloat(val) || 0;
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
  };

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: <Users size={20} />, color: "purple" },
    { label: "Total Requests", value: stats.totalRequests, icon: <Droplets size={20} />, color: "red" },
    { label: "Total Funding", value: formatCurrency(stats.totalFunding), icon: <Wallet size={20} />, color: "emerald" },
  ];

  const colorMap = {
    purple: "border-purple-500/20 text-purple-400 bg-purple-500/10",
    red: "border-red-500/20 text-red-400 bg-red-500/10",
    emerald: "border-emerald-500/20 text-emerald-400 bg-emerald-500/10",
  };

  return (
    <div className="space-y-6">
   
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c101f] to-[#12182e] border border-purple-500/20 p-6 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-black text-white">System Core Root</h1>
        <p className="text-slate-400 text-sm">Full architectural control over RoktoSeva.</p>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-2xl bg-[#0c101f] border p-5 shadow-xl ${colorMap[c.color].split(" ")[0]}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${colorMap[c.color]}`}>
              {c.icon}
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{c.label}</p>
            <p className={`text-3xl font-black mt-1`}>{c.value}</p>
          </div>
        ))}
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="/dashboard/admin/all-users" className="rounded-2xl bg-[#0c101f] border border-white/5 p-5 hover:border-purple-500/30 transition-all">
          <ShieldCheck className="text-purple-400 mb-2" />
          <h4 className="font-bold text-white">Manage Users</h4>
        </a>
        <a href="/dashboard/admin/requests" className="rounded-2xl bg-[#0c101f] border border-white/5 p-5 hover:border-purple-500/30 transition-all">
          <ClipboardList className="text-purple-400 mb-2" />
          <h4 className="font-bold text-white">All Requests</h4>
        </a>
      </div>
    </div>
  );
}