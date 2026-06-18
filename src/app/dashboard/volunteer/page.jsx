"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VolunteerDashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && (!user || (user.role !== "volunteer" && user.role !== "admin"))) {
      router.push("/dashboard"); return;
    }
    if (!isPending && user) {
      fetch("http://localhost:5000/api/posts/all-requests/pending", { credentials: "include" })
        .then(r => r.json())
        .then(d => { if (d.success) setRequests(d.data); })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user, isPending]);

  if (isPending) return (
    <div className="flex items-center justify-center py-32">
      <span className="loading loading-spinner loading-lg text-rose-500" />
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c101f] to-[#12182e] border border-rose-500/20 p-6 shadow-xl">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-600/5 rounded-full blur-3xl" />
        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border bg-rose-500/10 text-rose-400 border-rose-500/20">
          Volunteer Workspace
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-3">
          Volunteer <span className="text-rose-400">Command</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Welcome, {user?.name}. Review emergency requests below.</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Pending Requests", value: requests.filter(r => r.status === "pending").length,    color: "yellow" },
          { label: "In Progress",      value: requests.filter(r => r.status === "inprogress").length, color: "blue" },
          { label: "Total Active",     value: requests.length,                                         color: "rose" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl bg-[#0c101f] border border-white/5 p-4 shadow-lg">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{s.label}</p>
            <p className="text-3xl font-black text-white mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Requests list */}
      <div className="rounded-2xl bg-[#0c101f] border border-white/5 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h3 className="font-black text-sm uppercase tracking-wider text-white">Pending Requests</h3>
          <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20 uppercase tracking-widest animate-pulse">
            Live · {requests.length}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><span className="loading loading-spinner text-rose-500" /></div>
        ) : requests.length === 0 ? (
          <div className="py-14 text-center text-slate-500 text-sm">No active requests at this moment.</div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {requests.map(req => (
              <div key={req._id} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-black text-sm shrink-0">
                    {req.bloodGroup}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{req.patientName}</p>
                    <p className="text-xs text-slate-500 truncate">{req.upazila}, {req.district} · {req.hospital}</p>
                  </div>
                </div>
                <Link
                  href={`/blood-donation-request/${req._id}`}
                  className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 transition-all"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
