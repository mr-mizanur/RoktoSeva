"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client'; 

export default function RequestDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  

  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const user = session?.user;
  
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);


  useEffect(() => {
    if (!id) return;

    const fetchRequestDetails = async () => {
      try {
       
        const res = await fetch('http://localhost:5000/api/donor/recent-requests');
        const data = await res.json();
        
        if (data.success) {
          const matched = data.data.find(item => String(item._id) === String(id));
          if (matched) {
            setRequest(matched);
            setLoading(false);
            return;
          }
        }

       
        const pendingRes = await fetch('http://localhost:5000/api/posts/all-requests/pending');
        const pendingData = await pendingRes.json();
        if (pendingData.success) {
          const matchedPending = pendingData.data.find(item => String(item._id) === String(id));
          if (matchedPending) {
            setRequest(matchedPending);
          }
        }
      } catch (err) {
        console.error("Error loading request details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id]);

  
  const handleConfirmDonation = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to complete this network operation.");
      return;
    }
    
    setUpdating(true);
    try {
      const res = await fetch(`http://localhost:5000/api/posts/blood-request/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          status: "inprogress",
          donorName: user.name,
          donorEmail: user.email
        }),
      });

      const data = await res.json();
      if (data.success) {
        const modal = document.getElementById('donation_confirm_modal');
        if (modal) modal.close();
        
        alert("Operation Status Lock: IN PROGRESS! Grid Sync Complete.");
        router.push("/dashboard"); 
        router.refresh();
      } else {
        alert(data.message || "Failed to finalize state lock.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Secure network layer communication failure.");
    } finally {
      setUpdating(false);
    }
  };

 
  if (loading || isAuthPending) {
    return (
      <div className="min-h-screen bg-[#070a13] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-[#070a13] text-white flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-black text-rose-500 uppercase tracking-widest">Request Node Terminated</h2>
        <Link href="/" className="btn btn-sm bg-white/5 border border-white/10 text-white rounded-xl uppercase tracking-wider text-xs">Back to Matrix</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a13] text-white p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-3xl mx-auto space-y-6 pt-10 relative z-10">
        <button onClick={() => router.back()} className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2">
          ← Back to Grid
        </button>

      
        <div className="backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] bg-red-500/10 border border-red-500/20 text-red-400 font-bold px-3 py-1 rounded-md uppercase tracking-widest">Emergency Node Active</span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider mt-3">
                Patient: <span className="text-red-500">{request.patientName}</span>
              </h1>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col items-center justify-center text-red-500">
              <span className="text-2xl font-black leading-none">{request.bloodGroup}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider mt-1">Group</span>
            </div>
          </div>
        </div>


        <div className="backdrop-blur-xl bg-[#0c101f]/80 border border-white/5 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-white/5 pb-2">— Operational Parameters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Hospital Node</span>
              <p className="text-sm font-semibold bg-white/[0.02] border border-white/5 p-3 rounded-xl">{request.hospital}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Target Location</span>
              <p className="text-sm font-semibold bg-white/[0.02] border border-white/5 p-3 rounded-xl">{request.upazila}, {request.district}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Timeline Required</span>
              <p className="text-sm font-semibold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl">📅 {request.dateNeeded} — {request.donationTime}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Emergency Contact</span>
              <p className="text-sm font-black text-red-400 bg-red-500/5 border border-red-500/10 p-3 rounded-xl">📞 {request.contactNumber}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            {request.status === "pending" ? (
              <button 
                onClick={() => document.getElementById('donation_confirm_modal').showModal()}
                className="btn w-full bg-gradient-to-r from-red-600 to-rose-600 border-0 rounded-xl text-white font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300"
              >
                Donate Blood
              </button>
            ) : (
              <div className="text-center p-3 bg-white/5 border border-white/10 text-yellow-500 font-bold uppercase tracking-wider rounded-xl text-xs">
                Status: {request.status}
              </div>
            )}
          </div>
        </div>
      </div>

     
      <dialog id="donation_confirm_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-md">
        <div className="modal-box bg-[#0c101f]/95 border border-red-500/20 rounded-3xl text-white shadow-2xl p-6 sm:p-8 relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]" />
          
          <h3 className="font-black text-xl uppercase tracking-wider text-red-500 mb-1">Confirm Donation Request</h3>
          <p className="text-slate-400 text-xs mb-6">
            By processing, your information node will be linked to this case parameter and status locks into <span className="text-red-400 font-bold">'inprogress'</span>.
          </p>
          
          <form onSubmit={handleConfirmDonation} className="space-y-4">
            <div className="form-control">
              <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2">Donor Name Matrix</label>
              <input 
                type="text" 
                value={user?.name || ""} 
                placeholder="No Name Linked To Node"
                required
                readOnly 
                className="input input-bordered w-full bg-white/[0.02] border-white/5 text-slate-300 rounded-xl font-semibold outline-none cursor-not-allowed focus:outline-none"
              />
            </div>

            <div className="form-control">
              <label className="label-text text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2">Donor Email Pointer</label>
              <input 
                type="text" 
                value={user?.email || ""} 
                placeholder="No Email Linked To Node"
                required
                readOnly 
                className="input input-bordered w-full bg-white/[0.02] border-white/5 text-slate-300 rounded-xl font-semibold outline-none cursor-not-allowed focus:outline-none"
              />
            </div>

            <div className="flex gap-3 justify-end pt-6 border-t border-white/5 mt-6">
              <button 
                type="button" 
                onClick={() => document.getElementById('donation_confirm_modal').close()} 
                className="btn btn-ghost border border-white/10 text-slate-400 hover:bg-white/5 rounded-xl uppercase text-xs"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={updating}
                className="btn bg-gradient-to-r from-red-600 to-rose-600 border-0 text-white rounded-xl uppercase tracking-widest font-black text-xs px-6 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300"
              >
                {updating ? <span className="loading loading-spinner loading-xs"></span> : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}