"use client";
import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function VolunteerRequests() {
  const { data: session } = authClient.useSession();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/all-requests')
      .then(res => res.json())
      .then(data => setRequests(data.data));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/admin/update-request-status/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    setRequests(requests.map(r => r._id === id ? { ...r, status } : r));
  };

  return (
    <div className="p-8 bg-[#070a13] min-h-screen text-white">
      <div className="mb-8">
        <h2 className="text-2xl font-black uppercase tracking-widest text-white">
          Manage Donation Requests
        </h2>
        <p className="text-slate-500 text-sm">Volunteer Dashboard - Access restricted to status updates only.</p>
      </div>

      <div className="bg-[#0c101f]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
        <table className="table w-full">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
              <th className="py-4">Patient Name</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {requests.map(req => (
              <tr key={req._id} className="hover:bg-white/[0.02]">
                <td className="py-4 font-semibold">{req.patientName}</td>
                <td className="text-sm text-slate-400">{req.district}, {req.upazila}</td>
                <td>
                  <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-[10px] font-bold">
                    {req.bloodGroup}
                  </span>
                </td>
                <td>
                  <span className={`text-[10px] font-bold uppercase ${req.status === 'done' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {req.status}
                  </span>
                </td>
                <td>
                  {/* ভলান্টিয়ার শুধুমাত্র স্ট্যাটাস আপডেট করতে পারবে */}
                  <select 
                    className="bg-[#1a1f33] text-xs py-2 px-3 rounded-lg border border-white/10 outline-none focus:border-purple-500 transition-all"
                    value={req.status}
                    onChange={(e) => updateStatus(req._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}