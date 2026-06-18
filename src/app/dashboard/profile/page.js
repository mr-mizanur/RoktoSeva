"use client";
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bloodGroup: user?.bloodGroup || "",
    district: user?.district || "",
    upazila: user?.upazila || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // এখানে আপনার API কল হবে (PATCH request)
    await fetch(`http://localhost:5000/api/user/update/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setIsEditing(false);
  };

  return (
    <div className="p-8 bg-[#070a13] min-h-screen text-white">
      <div className="max-w-2xl mx-auto bg-[#0c101f] border border-white/5 p-8 rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Profile</h2>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="btn btn-sm bg-purple-600 hover:bg-purple-700 border-none"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 uppercase">Email (Unchangeable)</label>
            <input type="email" value={user?.email || ""} disabled className="w-full p-3 bg-white/5 rounded-xl border border-white/5 cursor-not-allowed" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 uppercase">Name</label>
              <input name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} className={`w-full p-3 rounded-xl border ${isEditing ? "bg-white/10 border-purple-500" : "bg-white/5 border-white/5"}`} />
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase">Blood Group</label>
              <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} disabled={!isEditing} className={`w-full p-3 rounded-xl border ${isEditing ? "bg-white/10 border-purple-500" : "bg-white/5 border-white/5"}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 uppercase">District</label>
              <input name="district" value={formData.district} onChange={handleChange} disabled={!isEditing} className={`w-full p-3 rounded-xl border ${isEditing ? "bg-white/10 border-purple-500" : "bg-white/5 border-white/5"}`} />
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase">Upazila</label>
              <input name="upazila" value={formData.upazila} onChange={handleChange} disabled={!isEditing} className={`w-full p-3 rounded-xl border ${isEditing ? "bg-white/10 border-purple-500" : "bg-white/5 border-white/5"}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}