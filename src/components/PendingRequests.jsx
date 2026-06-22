//
//"use client";
//
//import React, { useEffect, useState } from 'react';
//import Link from 'next/link';
//
//export default function PendingRequests() {
//  const [requests, setRequests] = useState([]);
//  const [loading, setLoading] = useState(true);
//  
// 
//  const [currentPage, setCurrentPage] = useState(1);
//  const itemsPerPage = 9;
//
//  useEffect(() => {
//    const fetchPendingRequests = async () => {
//      try {
//        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/all-requests/pending`);
//        const data = await res.json();
//        if (data.success) {
//          setRequests(data.data);
//        }
//      } catch (err) {
//        console.error("Error loading requests:", err);
//      } finally {
//        setLoading(false);
//      }
//    };
//    fetchPendingRequests();
//  }, []);
//
//  // Pagination Logic
//  const indexOfLastItem = currentPage * itemsPerPage;
//  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
//  const totalPages = Math.ceil(requests.length / itemsPerPage);
//
//  return (
//    <section className="max-w-6xl mx-auto px-4 pb-20">
//      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
//        <div>
//          <h2 className="text-2xl font-black uppercase tracking-wider">
//            All Pending <span className="text-red-500">Requests</span>
//          </h2>
//          <p className="text-slate-500 text-xs mt-1">Page {currentPage} of {totalPages || 1}</p>
//        </div>
//        <div className="text-red-500 font-bold text-xs bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
//          TOTAL: {requests.length}
//        </div>
//      </div>
//
//      {loading ? (
//        <div className="flex justify-center py-20">
//          <span className="loading loading-spinner loading-lg text-red-500"></span>
//        </div>
//      ) : requests.length > 0 ? (
//        <>
//          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//            {currentRequests.map((req) => (
//              <div key={req._id} className="backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 p-6 rounded-3xl hover:border-red-500/30 transition-all duration-300 group shadow-xl relative overflow-hidden">
//                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                
//                <div className="flex justify-between items-start mb-4">
//                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-black text-xl">
//                    {req.bloodGroup}
//                  </div>
//                  <span className="text-[10px] uppercase font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">{req.status}</span>
//                </div>
//
//                <h3 className="text-lg font-bold text-white">{req.patientName}</h3>
//                <div className="mt-4 space-y-2 text-sm text-slate-400">
//                  <p>Hospital: <span className="text-slate-300">{req.hospital}</span></p>
//                  <p>Location: <span className="text-slate-300">{req.upazila}, {req.district}</span></p>
//                  <p>Date: <span className="text-slate-300">{req.dateNeeded}</span></p>
//                </div>
//
//                <div className="mt-6">
//                  <Link href={`/blood-donation-request/${req._id}`} className="btn btn-sm w-full bg-white/5 border border-white/10 text-white rounded-xl hover:bg-red-600 transition-all font-bold uppercase text-xs">
//                    View Details
//                  </Link>
//                </div>
//              </div>
//            ))}
//          </div>
//
//         
//          <div className="flex justify-center gap-2 mt-12">
//            <button 
//              disabled={currentPage === 1}
//              onClick={() => setCurrentPage(prev => prev - 1)}
//              className="px-4 py-2 bg-white/5 rounded-lg text-white disabled:opacity-30 hover:bg-white/10"
//            >
//              Prev
//            </button>
//            <span className="px-4 py-2 text-white font-bold">{currentPage} / {totalPages}</span>
//            <button 
//              disabled={currentPage === totalPages}
//              onClick={() => setCurrentPage(prev => prev + 1)}
//              className="px-4 py-2 bg-white/5 rounded-lg text-white disabled:opacity-30 hover:bg-white/10"
//            >
//              Next
//            </button>
//          </div>
//        </>
//      ) : (
//        <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-3xl">
//          <p className="text-slate-500 text-sm">No emergency requests active.</p>
//        </div>
//      )}
//    </section>
//  );
//}

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
    <section className="max-w-6xl mx-auto px-4 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-white/5 pb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wider">
            All Pending <span className="text-red-500">Requests</span>
          </h2>
        </div>

       
        <div className="flex gap-3">
          <select 
            className="bg-[#0c101f] border border-white/10 text-white text-xs p-2 rounded-xl outline-none"
            onChange={(e) => setSelectedBlood(e.target.value)}
          >
            <option value="All">All Groups</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          
          <select 
            className="bg-[#0c101f] border border-white/10 text-white text-xs p-2 rounded-xl outline-none"
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-red-500"></span>
        </div>
      ) : filteredRequests.length > 0 ? (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {currentRequests.map((req) => (
              <motion.div 
                key={req._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 p-6 rounded-3xl hover:border-red-500/30 transition-colors duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-black text-xl">
                    {req.bloodGroup}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">
                    {req.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">{req.patientName}</h3>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>Hospital: <span className="text-slate-300">{req.hospital}</span></p>
                  <p>Location: <span className="text-slate-300">{req.upazila}, {req.district}</span></p>
                </div>
                <Link href={`/blood-donation-request/${req._id}`} className="block text-center mt-6 py-2 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-red-600 transition-all font-bold uppercase text-xs">
                  View Details
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 text-slate-500">No requests found matching your filters.</div>
      )}
    </section>
  );
}