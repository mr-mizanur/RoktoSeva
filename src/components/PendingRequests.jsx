"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [selectedBlood, setSelectedBlood] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const itemsPerPage = 9;

  const fetchPendingRequests = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/all-requests/pending`, {
        cache: 'no-store',
        next: { revalidate: 0 }
      });
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

  useEffect(() => {
    fetchPendingRequests();
    const interval = setInterval(fetchPendingRequests, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchBlood = selectedBlood === "All" || req.bloodGroup === selectedBlood;
      const matchDistrict = selectedDistrict === "All" || req.district === selectedDistrict;
      return matchBlood && matchDistrict;
    });
  }, [requests, selectedBlood, selectedDistrict]);

  const districts = useMemo(() => ["All", ...new Set(requests.map(r => r.district))], [requests]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [selectedBlood, selectedDistrict]);

  return (
    <section className="relative bg-[#070a13] text-white py-20 px-4 sm:px-8 overflow-hidden">
      {/* Top separator line matching other sections */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      
      {/* Background glow matching design system */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-red-600/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header (Left-aligned matching Guidelines/Contact) */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-white/5 pb-6 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                Live Feed
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter leading-tight mb-2">
              All Pending <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">Requests</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">Showing page {currentPage} of {totalPages || 1} ({filteredRequests.length} total results)</p>
          </div>

          {/* Filters & Total Badge */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select 
              className="bg-[#0c101f] border border-white/10 text-white text-xs px-3 py-2.5 rounded-xl outline-none focus:border-red-500/50 cursor-pointer"
              onChange={(e) => setSelectedBlood(e.target.value)}
            >
              <option value="All">All Groups</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            
            <select 
              className="bg-[#0c101f] border border-white/10 text-white text-xs px-3 py-2.5 rounded-xl outline-none focus:border-red-500/50 cursor-pointer max-w-[160px]"
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              {districts.map(d => <option key={d} value={d}>{d === "All" ? "All Districts" : d}</option>)}
            </select>

            <div className="text-red-400 font-bold text-xs bg-red-500/10 px-3 py-2.5 rounded-xl border border-red-500/20 ml-auto md:ml-0">
              TOTAL: {filteredRequests.length}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-red-500"></span>
          </div>
        ) : filteredRequests.length > 0 ? (
          <>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {currentRequests.map((req) => (
                  <motion.div 
                    key={req._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group relative backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 p-6 rounded-3xl hover:border-red-500/30 hover:bg-[#0c101f]/85 transition-all duration-300 shadow-xl overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-black text-xl group-hover:bg-red-500/15 transition-colors">
                        {req.bloodGroup}
                      </div>
                      <span className="text-[10px] uppercase font-bold text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-lg border border-yellow-500/20">
                        {req.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors">{req.patientName}</h3>
                    
                    <div className="space-y-1.5 text-sm text-slate-400">
                      <p className="text-xs">Hospital: <span className="text-slate-300 font-medium">{req.hospital}</span></p>
                      <p className="text-xs">Location: <span className="text-slate-300 font-medium">{req.upazila}, {req.district}</span></p>
                      {req.dateNeeded && (
                        <p className="text-xs">Date Needed: <span className="text-slate-300 font-medium">{req.dateNeeded}</span></p>
                      )}
                    </div>

                    <div className="mt-6">
                      <Link 
                        href={`/blood-donation-request/${req._id}`} 
                        className="block text-center w-full py-2.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-red-600 hover:border-red-500 transition-all font-bold uppercase text-xs tracking-wider shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-wider disabled:opacity-30 hover:bg-white/10 transition-all cursor-pointer"
                >
                  Prev
                </button>
                <span className="px-3 text-xs text-slate-400 font-semibold">{currentPage} / {totalPages}</span>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-wider disabled:opacity-30 hover:bg-white/10 transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-3xl">
            <p className="text-slate-500 text-sm">No requests found matching your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}