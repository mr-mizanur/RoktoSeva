"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/posts/all-requests/pending');
        const data = await res.json();
        if (data.success) {
          setRequests(data.data);
        }
      } catch (err) {
        console.error("Error loading requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingRequests();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 pb-20">
      {/* section header */}
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wider">
            All Pending <span className="text-red-500">Requests</span>
          </h2>
          <p className="text-slate-500 text-xs mt-1">Live emergency feeds from across the country</p>
        </div>
        <div className="text-red-500 font-bold text-xs bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          LIVE FEEDS: {requests.length}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-red-500"></span>
        </div>
      ) : requests.length > 0 ? (
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req._id} className="backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 p-6 rounded-3xl hover:border-red-500/30 transition-all duration-300 group shadow-xl relative overflow-hidden">
            
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-black text-xl shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                  {req.bloodGroup}
                </div>
                <span className="text-[10px] uppercase font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20 tracking-widest animate-pulse">
                  {req.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors duration-200">{req.patientName}</h3>
              
              <div className="mt-4 space-y-2 text-sm text-slate-400">
                <div className="flex items-start gap-2">
                  <span className="text-slate-600 font-medium">Hospital:</span> 
                  <span className="text-slate-300">{req.hospital}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 font-medium">Location:</span> 
                  <span className="text-slate-300">{req.upazila}, {req.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 font-medium">Date:</span> 
                  <span className="text-slate-300">{req.dateNeeded} ({req.donationTime})</span>
                </div>
              </div>

              <div className="mt-6">
                <Link href={`/blood-donation-request/${req._id}`} className="btn btn-sm w-full bg-white/5 border border-white/10 text-slate-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-600 hover:text-white hover:border-0 rounded-xl transition-all duration-300 font-bold uppercase tracking-wider text-xs">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
       
        <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-3xl">
          <p className="text-slate-500 text-sm">No emergency requests active on the grid at this moment.</p>
        </div>
      )}
    </section>
  );
}