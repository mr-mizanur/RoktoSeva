"use client";

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { districts as allDistricts, upazilas as allUpazilas } from '@/data/locationData';
import { toast } from 'react-toastify';

export default function CreateDonationRequest() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");


  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);

    if (!districtId) {
      setUpazilas([]);
      return;
    }

    const filtered = allUpazilas
      .filter(u => String(u.district_id) === String(districtId))
      .sort((a, b) => a.name.localeCompare(b.name));

    setUpazilas(filtered);
  };


  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (user?.status === "blocked") {
      toast.error("Access Denied! Your account is blocked.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target);
    const districtObj = allDistricts.find(d => String(d.id) === String(selectedDistrict));
    const districtName = districtObj ? districtObj.name : "";

    const payload = {
      patientName: formData.get("patient_name"),
      bloodGroup: formData.get("blood_group"),
      hospital: formData.get("hospital"),
      district: districtName,
      upazila: formData.get("upazila"),
      contactNumber: formData.get("contact_number"),
      dateNeeded: formData.get("date_needed"),
      donationTime: formData.get("donation_time"),
      details: formData.get("details"),
  requesterEmail: user.email, // 👈 এটি যোগ না করলে ডেটা আসবে না
  status: "pending"
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/blood-request`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Blood request successfully submitted!");
        e.target.reset();
        setSelectedDistrict("");
        setUpazilas([]);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        throw new Error(data.message || "Failed to create request");
      }
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.");
        } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#070a13] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a13] text-white p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[160px] -z-10" />

      {/* 📬 DaisyUI কাস্টম টোস্ট ফ্রেমওয়ার্ক (সবার উপরে পজিশন করা) */}
      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        
        {/* Header Block */}
        <div className="backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]" />
          <span className="text-[10px] bg-red-500/10 border border-red-500/20 text-red-400 font-bold px-3 py-1 rounded-md uppercase tracking-widest">
            Request Deployment Node
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider mt-3">
            Create Blood <span className="text-red-500">Request</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Fill out the matrix parameters below to request emergency blood supplies.</p>
        </div>

        {/* 🚫 Blocked Safe Guard */}
        {user?.status === "blocked" ? (
          <div className="backdrop-blur-xl bg-red-500/5 border border-red-500/10 p-8 rounded-3xl text-center space-y-3">
            <h3 className="text-xl font-bold text-red-400 uppercase tracking-wider">Account Restricted</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Your account status is currently set to <span className="text-red-500 font-bold">BLOCKED</span>. You are restricted from broadcasting new requests onto the lifesaver network.
            </p>
          </div>
        ) : (
          /* 📋 Form Node */
          <form onSubmit={handleSubmitRequest} className="backdrop-blur-xl bg-[#0c101f]/80 border border-white/5 p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6">
            
            {/* Meta Read Only Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-b border-white/5 pb-6">
              <div className="form-control">
                <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">Requester Name</label>
                <input type="text" value={user?.name || ""} readOnly className="input input-bordered w-full bg-white/[0.01] border-white/5 rounded-xl text-slate-400 focus:outline-none cursor-not-allowed font-medium" />
              </div>
              <div className="form-control">
                <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">Requester Email</label>
                <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-white/[0.01] border-white/5 rounded-xl text-slate-400 focus:outline-none cursor-not-allowed font-medium" />
              </div>
            </div>

            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest pt-2">— Recipient & Case Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div className="form-control">
                <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Recipient Name</label>
                <input type="text" name="patient_name" required placeholder="Enter patient full name" className="input input-bordered w-full bg-white/[0.02] border-white/10 rounded-xl text-white focus:border-red-500/50 focus:outline-none transition-all duration-200" />
              </div>

              <div className="form-control">
                <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Required Blood Group</label>
                <select name="blood_group" required className="select select-bordered w-full bg-[#0c101f] border-white/10 rounded-xl text-white focus:border-red-500/50 transition-all duration-200">
              <option value="">Select Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
            </select>
              </div>

              {/* Recipient District */}
              <div className="form-control">
                <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Recipient District</label>
                <select 
                  value={selectedDistrict} 
                  required 
                  onChange={handleDistrictChange} 
                  className="select select-bordered w-full bg-[#0c101f] border-white/10 rounded-xl text-white focus:border-red-500/50 transition-all duration-200"
                >
              <option value="">Select District</option>
                  {allDistricts.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
            </select>
              </div>

              {/* Recipient Upazila */}
              <div className="form-control">
                <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Recipient Upazila</label>
                <select 
                  name="upazila" 
                  required 
                  disabled={!selectedDistrict || upazilas.length === 0} 
                  className="select select-bordered w-full bg-[#0c101f] border-white/10 rounded-xl text-white focus:border-red-500/50 disabled:bg-white/[0.01] disabled:text-slate-600 transition-all duration-200"
                >
                  <option value="">
                    {!selectedDistrict ? "Select District First" : upazilas.length === 0 ? "No Areas Found" : "Select Upazila"}
                  </option>
                  {upazilas.map(u => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
            </select>
              </div>

              <div className="form-control">
                <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Hospital Name</label>
                <input type="text" name="hospital" required placeholder="e.g. Dhaka Medical College Hospital" className="input input-bordered w-full bg-white/[0.02] border-white/10 rounded-xl text-white focus:border-red-500/50 focus:outline-none transition-all duration-200" />
              </div>

              <div className="form-control">
                <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Contact Number</label>
                <input type="text" name="contact_number" required placeholder="Emergency phone digits" className="input input-bordered w-full bg-white/[0.02] border-white/10 rounded-xl text-white focus:border-red-500/50 focus:outline-none transition-all duration-200" />
          </div>

              <div className="form-control">
                <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Donation Date</label>
                <input type="date" name="date_needed" required className="input input-bordered w-full bg-white/[0.02] border-white/10 rounded-xl text-white focus:border-red-500/50 focus:outline-none transition-all duration-200" />
              </div>

              <div className="form-control">
                <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Donation Time</label>
                <input type="time" name="donation_time" required className="input input-bordered w-full bg-white/[0.02] border-white/10 rounded-xl text-white focus:border-red-500/50 focus:outline-none transition-all duration-200" />
              </div>

              <div className="form-control sm:col-span-2">
                <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Request Message (Details)</label>
                <textarea name="details" required placeholder="Provide case depth, blood bags count, or details..." className="textarea textarea-bordered w-full h-28 bg-white/[0.02] border-white/10 rounded-xl text-white focus:border-red-500/50 focus:outline-none p-4 transition-all duration-200" />
              </div>

            </div>

            <div className="pt-4">
              <button type="submit" disabled={loading} className="btn w-full bg-gradient-to-r from-red-600 to-rose-600 border-0 rounded-xl text-white font-black uppercase tracking-widest shadow-[0_4px_25px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_35px_rgba(220,38,38,0.45)] transition-all duration-300 disabled:bg-slate-800 disabled:text-slate-500">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-xs"></span>
                    Deploying Core Request Grid...
                  </div>
                ) : "Deploy Request"}
          </button>
            </div>

        </form>
        )}
      </div>
    </div>
  );
}