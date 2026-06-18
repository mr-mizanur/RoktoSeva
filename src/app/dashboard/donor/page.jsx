"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, Trash2, CheckCircle2 } from "lucide-react"; 

export default function DonorDashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [recentRequests, setRecentRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // ডেটা ফেচিং - শুধুমাত্র লগইন করা ইউজারের ইমেইল অনুযায়ী ৩টি রিকোয়েস্ট
  useEffect(() => {
    if (!isPending && !user) { router.push("/login"); return; }
    
    if (!isPending && user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donor/recent-requests?email=${encodeURIComponent(user.email)}`, { credentials: "include" })
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
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c101f] to-[#12182e] border border-white/5 p-6 shadow-xl">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Welcome back</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{user?.name} 🩸</h1>
        <p className="text-slate-400 text-sm mt-1">Blood Group: <span className="text-white font-bold">{user?.bloodGroup || "—"}</span> · {user?.district}, {user?.upazila}</p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/dashboard/create-donation-request" className="group rounded-2xl bg-[#0c101f] border border-white/5 p-5 hover:border-red-500/30 transition shadow-lg">
          <h4 className="font-bold text-white">Create Donation Request</h4>
        </Link>
        <Link href="/dashboard/my-donation-requests" className="group rounded-2xl bg-[#0c101f] border border-white/5 p-5 hover:border-red-500/30 transition shadow-lg">
          <h4 className="font-bold text-white">My Requests</h4>
        </Link>
      </div>

      {/* Recent Requests Table */}
      <div className="rounded-2xl bg-[#0c101f] border border-white/5 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h3 className="font-black text-sm uppercase text-white">My Recent Requests</h3>
        </div>

        {loadingRequests ? (
          <div className="flex justify-center py-12"><span className="loading loading-spinner text-red-500" /></div>
        ) : recentRequests.length === 0 ? (
          <div className="p-10 text-center text-slate-500">No requests found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-300">
              <thead>
                <tr className="text-[10px] uppercase text-slate-500 border-b border-white/5">
                  <th className="text-left px-5 py-3">Recipient</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-center px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req._id} className="border-b border-white/[0.04]">
                    <td className="px-5 py-3 font-bold text-white">{req.patientName}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase border ${statusStyle[req.status]}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {/* View Full Request Link */}
                        <Link href={`/dashboard/request-details/${req._id}`} className="btn btn-xs bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white">
                          <Eye size={14} /> View
                        </Link>
                        
                        {req.status === "inprogress" && (
                          <button onClick={() => handleStatusUpdate(req._id, "done")} className="btn btn-xs bg-emerald-600 border-0 text-white hover:bg-emerald-700">
                            <CheckCircle2 size={14} /> Done
                          </button>
                        )}
                        <button onClick={() => handleDelete(req._id)} className="btn btn-xs bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white">
                          <Trash2 size={14} /> Del
                        </button>
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