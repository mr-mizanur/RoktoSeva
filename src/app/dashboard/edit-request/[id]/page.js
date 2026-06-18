"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditRequest() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientName: '',
    recipientDistrict: '',
    recipientUpazila: '',
    hospitalName: '',
    address: '',
    date: '',
    time: '',
    message: ''
  });

  // রিকোয়েস্টের পুরনো ডেটা ফেচ করা
  useEffect(() => {
    fetch(`http://localhost:5000/api/blood-request/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/admin/request/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    router.push('/dashboard/admin/requests');
  };

  return (
    <div className="p-8 bg-[#070a13] min-h-screen text-white">
      <div className="max-w-2xl mx-auto bg-[#0c101f] border border-white/5 p-8 rounded-3xl">
        <h2 className="text-2xl font-black mb-6">Update Donation Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full p-3 bg-white/5 rounded-xl border border-white/10"
            value={formData.patientName} 
            onChange={(e) => setFormData({...formData, patientName: e.target.value})}
            placeholder="Patient Name"
          />
          <input 
            className="w-full p-3 bg-white/5 rounded-xl border border-white/10"
            value={formData.hospitalName} 
            onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
            placeholder="Hospital Name"
          />
          <textarea 
            className="w-full p-3 bg-white/5 rounded-xl border border-white/10"
            value={formData.message} 
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="Reason for blood"
          />
          <button type="submit" className="w-full py-3 bg-purple-600 rounded-xl font-bold hover:bg-purple-700">
            Update Request
          </button>
        </form>
      </div>
    </div>
  );
}