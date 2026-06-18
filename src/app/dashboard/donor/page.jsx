"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DonorDashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [recentRequests, setRecentRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    if (!isPending && !user) { router.push("/login"); return; }
    if (!isPending && user) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donor/recent-requests`, { credentials: "include" })
        .then(r => r.json())
        .then(d => { if (d.success) setRecentRequests(d.data); })
        .catch(console.error)
        .finally(() => setLoadingRequests(false));
    }
  }, [user, isPending]);

  if (isPending) return (
    <div className="flex items-center justify-center py-32">
      <span className="loading loading-spinner loading-lg text-red-500" />
    </div>
  );

  const handleStatusUpdate = async (id, status) => {
    if (!confirm(`Mark as ${status}?`)) return;
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/blood-request/${id}/status`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      credentials: "include", body: JSON.stringify({ status }),
    });
    setRecentRequests(prev => prev.map(r => r._id === id ? { ...r, status } : r));
  };

  const handleDelete = async (id) => {
    if (!confirm("Permanently delete this request?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/blood-request/${id}`, { method: "DELETE", credentials: "include" });
    setRecentRequests(prev => prev.filter(r => r._id !== id));
  };

  const statusStyle = {
    pending:    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    inprogress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    done:       "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    canceled:   "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  return (
    <div className="space-y-6">

      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c101f] to-[#12182e] border border-white/5 p-6 shadow-xl">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-600/5 rounded-full blur-3xl" />
        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Welcome back</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {user?.name} <span className="text-red-500">🩸</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Blood Group: <span className="text-white font-bold">{user?.bloodGroup || "—"}</span> · {user?.district}, {user?.upazila}</p>
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/dashboard/create-donation-request" className="group relative overflow-hidden rounded-2xl bg-[#0c101f] border border-white/5 p-5 hover:border-red-500/30 transition-all duration-300 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          </div>
          <h4 className="font-bold text-white group-hover:text-red-400 transition-colors">Create Donation Request</h4>
          <p className="text-slate-500 text-xs mt-1">Post an emergency blood request to the network</p>
        </Link>

        <Link href="/dashboard/my-donation-requests" className="group relative overflow-hidden rounded-2xl bg-[#0c101f] border border-white/5 p-5 hover:border-red-500/30 transition-all duration-300 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
          <h4 className="font-bold text-white group-hover:text-red-400 transition-colors">My Requests</h4>
          <p className="text-slate-500 text-xs mt-1">View and manage all your broadcasted requests</p>
        </Link>
      </div>

      {/* Recent requests table */}
      <div className="rounded-2xl bg-[#0c101f] border border-white/5 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h3 className="font-black text-sm uppercase tracking-wider text-white">Recent Requests</h3>
          <Link href="/dashboard/my-donation-requests" className="text-[11px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors">
            View All →
          </Link>
        </div>

        {loadingRequests ? (
          <div className="flex justify-center py-12"><span className="loading loading-spinner text-red-500" /></div>
        ) : recentRequests.length === 0 ? (
          <div className="py-14 text-center text-slate-500 text-sm">No requests yet. Create your first one above.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-300">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                  <th className="text-left px-5 py-3">Recipient</th>
                  <th className="text-left px-5 py-3">Location</th>
                  <th className="text-left px-5 py-3">Date</th>
                  <th className="text-left px-5 py-3">Group</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-center px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req._id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-all">
                    <td className="px-5 py-3 font-bold text-white">{req.patientName}</td>
                    <td className="px-5 py-3 text-slate-400">{req.upazila}, {req.district}</td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{req.dateNeeded}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs">{req.bloodGroup}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider border ${statusStyle[req.status] || statusStyle.canceled}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        {req.status === "inprogress" && (
                          <>
                            <button onClick={() => handleStatusUpdate(req._id, "done")} className="btn btn-xs bg-emerald-600 border-0 text-white hover:bg-emerald-700">Done</button>
                            <button onClick={() => handleStatusUpdate(req._id, "canceled")} className="btn btn-xs bg-rose-700 border-0 text-white hover:bg-rose-800">Cancel</button>
                          </>
                        )}
                        <Link href={`/dashboard/edit-request/${req._id}`} className="btn btn-xs bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10">Edit</Link>
                        <button onClick={() => handleDelete(req._id)} className="btn btn-xs bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white">Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
