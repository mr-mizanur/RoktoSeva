"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [stats, setStats] = useState({ totalUsers: 0, totalRequests: 0, totalFunding: 0 });

  useEffect(() => {
    if (!isPending && (!user || user.role !== "admin")) { router.push("/dashboard"); return; }
    fetch("http://localhost:5000/api/admin/stats", { credentials: "include" })
      .then(r => r.json())
      .then(d => { if (d.success) setStats(d.stats); })
      .catch(console.error);
  }, [user, isPending]);

  if (isPending) return (
    <div className="flex items-center justify-center py-32">
      <span className="loading loading-spinner loading-lg text-purple-500" />
    </div>
  );

  const cards = [
    { label: "Total Users",    value: stats.totalUsers,        icon: "👥", color: "purple" },
    { label: "Total Requests", value: stats.totalRequests,     icon: "🩸", color: "red" },
    { label: "Total Funding",  value: `$${stats.totalFunding}`,icon: "💰", color: "emerald" },
  ];

  const colorMap = {
    purple:  "border-purple-500/20 text-purple-400 bg-purple-500/10",
    red:     "border-red-500/20 text-red-400 bg-red-500/10",
    emerald: "border-emerald-500/20 text-emerald-400 bg-emerald-500/10",
  };

  return (
    <div className="space-y-6">

      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c101f] to-[#12182e] border border-purple-500/20 p-6 shadow-xl">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-600/5 rounded-full blur-3xl" />
        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border bg-purple-500/10 text-purple-400 border-purple-500/20">
          Admin Core Intelligence
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-3">
          System Core <span className="text-purple-400">Root</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Full architectural control over RoktoSeva database management.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-2xl bg-[#0c101f] border p-5 shadow-xl ${colorMap[c.color].split(" ")[0]}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 border ${colorMap[c.color]}`}>
              {c.icon}
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{c.label}</p>
            <p className={`text-3xl font-black mt-1 ${colorMap[c.color].split(" ")[1]}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { href: "/dashboard/admin/all-users",    label: "Manage Users",   desc: "View, block, promote or remove users", icon: "👥" },
          { href: "/dashboard/admin/requests", label: "All Requests",   desc: "Moderate all blood donation requests",  icon: "📋" },
        ].map(item => (
          <a key={item.href} href={item.href} className="group relative overflow-hidden rounded-2xl bg-[#0c101f] border border-white/5 p-5 hover:border-purple-500/30 transition-all duration-300 shadow-lg">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-2xl mb-3">{item.icon}</div>
            <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">{item.label}</h4>
            <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
