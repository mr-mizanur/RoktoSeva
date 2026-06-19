"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { 
  ArrowLeft, MapPin, Hospital, CalendarClock, 
  Phone, User, Mail, ShieldCheck, Droplet, AlertTriangle, X 
} from 'lucide-react';

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/all-requests/pending`);
        const data = await res.json();
        if (data.success) {
          const matched = data.data.find(item => String(item._id) === String(id));
          if (matched) setRequest(matched);
        }
      } catch (err) { console.error("Error:", err); }
      finally { setLoading(false); }
    };
    fetchRequestDetails();
  }, [id]);

  const handleConfirmDonation = async (e) => {
    e.preventDefault();
    if (!user) { alert("Please log in to donate!"); return; }
    
    setUpdating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/blood-request/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          status: "inprogress",
          donorName: user.name,
          donorEmail: user.email
        }),
      });
      if ((await res.json()).success) {
        document.getElementById('donation_confirm_modal').close();
        alert("Donation request successfully updated!");
        router.push("/dashboard");
      }
    } catch (err) { console.error(err); }
    finally { setUpdating(false); }
  };

  if (loading || isAuthPending) return <div className="min-h-screen bg-[#070a13] flex items-center justify-center"><span className="loading loading-spinner text-red-500"></span></div>;

  return (
    <div className="min-h-screen bg-[#070a13] text-white p-6 sm:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors">
          <ArrowLeft size={18} /> <span className="font-bold tracking-widest text-xs uppercase">Back to Grid</span>
        </button>

        <div className="backdrop-blur-xl bg-[#0c101f]/60 border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="flex justify-between items-start">
            <div>
              <span className="flex items-center gap-2 text-red-400 font-bold text-[10px] uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full w-fit">
                <AlertTriangle size={12} /> Emergency Request
              </span>
              <h1 className="text-4xl font-black mt-4 uppercase">{request?.patientName}</h1>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl flex flex-col items-center justify-center font-black text-2xl">
              <Droplet size={24} className="mb-1" />
              {request?.bloodGroup}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <InfoCard icon={<Hospital size={20}/>} label="Hospital" value={request?.hospital} />
            <InfoCard icon={<MapPin size={20}/>} label="Location" value={`${request?.upazila}, ${request?.district}`} />
            <InfoCard icon={<CalendarClock size={20}/>} label="Timeline" value={`${request?.dateNeeded} | ${request?.donationTime}`} />
            <InfoCard icon={<Phone size={20}/>} label="Contact" value={request?.contactNumber} />
          </div>

          <button 
            onClick={() => document.getElementById('donation_confirm_modal').showModal()}
            className="mt-8 w-full py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            <ShieldCheck size={20} /> Donate Now
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <dialog id="donation_confirm_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-[#0c101f] border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-black uppercase text-red-500">Confirm Donation</h3>
          <p className="text-slate-400 text-sm mt-2 mb-6">Are you sure you want to proceed with this donation request?</p>
          
          <form onSubmit={handleConfirmDonation} className="space-y-4">
            <input type="text" value={user?.name || ""} readOnly className="w-full bg-white/5 p-3 rounded-xl border border-white/10" />
            <input type="text" value={user?.email || ""} readOnly className="w-full bg-white/5 p-3 rounded-xl border border-white/10" />
            
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => document.getElementById('donation_confirm_modal').close()} className="flex-1 py-3 bg-white/10 rounded-xl font-bold">Cancel</button>
              <button type="submit" disabled={updating} className="flex-1 py-3 bg-red-600 rounded-xl font-bold">
                {updating ? "Processing..." : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

// Helper Card Component
function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
      <div className="text-red-500 mt-1">{icon}</div>
      <div>
        <p className="text-[10px] uppercase text-slate-500 font-bold">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}