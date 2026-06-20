"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminAllRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/all-requests`)
      .then(res => res.json())
      .then(data => setRequests(data.data));
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this request?")) {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/request/${id}`, { method: 'DELETE' });
      setRequests(requests.filter(r => r._id !== id));
    }
  };

  return (
    <div className="p-8 bg-[#070a13] min-h-screen text-white">
      <div className="mb-8">
        <h2 className="text-2xl font-black uppercase tracking-widest text-white">
          All Blood Requests 
        </h2>
        <p className="text-slate-500 text-sm">Managing the entire donation ecosystem.</p>
      </div>

      <div className="bg-[#0c101f]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
        <table className="table w-full">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
              <th>Recipient</th>
              <th>Location</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {requests.map(req => (
              <tr key={req._id} className="hover:bg-white/[0.02]">
                <td className="py-4 font-semibold">{req.patientName}</td>
                <td className="text-sm text-slate-400">{req.district}, {req.upazila}</td>
                <td>
                  <span className={`text-[10px] font-bold uppercase ${req.status === 'done' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {req.status}
                  </span>
                </td>
                <td className="text-right flex justify-end gap-2">
                  {/* ডিলিট বাটন */}
                  <button 
                    onClick={() => handleDelete(req._id)}
                    className="px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold rounded-lg border border-red-500/20 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                  {/* এডিট বাটন - আপনি এখানে এডিট পেজে রিডাইরেক্ট করতে পারেন */}
                  <Link href={`/dashboard/edit-request/${req._id}`}>
                    <button className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded-lg border border-blue-500/20 hover:bg-blue-500/20">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}