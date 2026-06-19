"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export default function DonorDashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [myDonations, setMyDonations] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
      return;
    }

    if (!isPending && user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donor/my-donations?email=${encodeURIComponent(user.email)}`, {
        credentials: "include"
      })
        .then((r) => r.json())
        .then((d) => {
          if (d.success) setMyDonations(d.data);
        })
        .catch(console.error)
        .finally(() => setLoadingRequests(false));
    }
  }, [user, isPending, router]);

  // পেজিনেশন লজিক
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = myDonations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(myDonations.length / itemsPerPage);

  const handleStatusUpdate = async (id, status) => {
    if (!confirm(`Mark this donation as ${status}?`)) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/blood-request/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, donorName: user.name, donorEmail: user.email }),
      });
      const data = await res.json();
      if (data.success) {
        setMyDonations((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
      }
    } catch (err) { console.error("Update error:", err); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Permanently delete this record?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/blood-request/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMyDonations((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) { console.error("Delete error:", err); }
  };

  const statusStyle = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    inprogress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    done: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    canceled: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  if (isPending) return <div className="flex items-center justify-center py-32"><span className="loading loading-spinner text-red-500" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0c101f] to-[#12182e] border border-white/5 p-6 shadow-xl">
        <h1 className="text-2xl font-black text-white">Hello, {user?.name || "Donor"} </h1>
        <p className="text-slate-400 text-sm mt-1">{user?.district}, {user?.upazila} | Blood Group: <span className="text-white font-bold">{user?.bloodGroup || "—"}</span></p>
      </div>

      {/* My Donations Table */}
      <div className="rounded-2xl bg-[#0c101f] border border-white/5 overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-white/5"><h3 className="font-black text-sm uppercase text-white">My Donations</h3></div>

        {loadingRequests ? (
          <div className="flex justify-center py-12"><span className="loading loading-spinner text-red-500" /></div>
        ) : myDonations.length === 0 ? (
          <div className="p-12 text-center text-slate-500">You have no donations yet.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-300">
                <thead>
                  <tr className="text-[10px] uppercase text-slate-500 border-b border-white/5">
                    <th className="text-left px-5 py-3">Patient Name</th>
                    <th className="text-left px-5 py-3">Status</th>
                    <th className="text-center px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((req) => (
                    <tr key={req._id} className="border-b border-white/[0.04]">
                      <td className="px-5 py-3 font-bold text-white">{req.patientName}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase border ${statusStyle[req.status] || statusStyle.pending}`}>{req.status}</span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex gap-2 justify-center">
                          {req.status === "inprogress" && <button onClick={() => handleStatusUpdate(req._id, "done")} className="btn btn-xs bg-emerald-600 text-white"><CheckCircle2 size={14} /> Done</button>}
                          <button onClick={() => handleDelete(req._id)} className="btn btn-xs bg-red-500/10 text-red-400"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 py-4 border-t border-white/5">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="btn btn-sm btn-ghost"><ChevronLeft size={16} /></button>
                <span className="text-xs font-bold text-slate-400">Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="btn btn-sm btn-ghost"><ChevronRight size={16} /></button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}