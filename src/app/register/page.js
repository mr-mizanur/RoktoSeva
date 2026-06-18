"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth-client';
import { districts as allDistricts, upazilas as allUpazilas } from '@/data/locationData';

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      .filter(u => u.district_id === districtId)
      .sort((a, b) => a.name.localeCompare(b.name));
    setUpazilas(filtered);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");
    const bloodGroup = formData.get("blood_group");
    const avatarFile = formData.get("avatar");


    const districtName = allDistricts.find(d => d.id === selectedDistrict)?.name || "";
    const upazilaName = formData.get("upazila");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // 📸 Upload Profile Image to ImgBB
      const imgBbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 
      if (!imgBbKey) throw new Error("ImgBB API Key is missing!");

      const imgFormData = new FormData();
      imgFormData.append("image", avatarFile);

      const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgBbKey}`, {
        method: "POST",
        body: imgFormData,
      });
      const imgData = await imgRes.json();
      if (!imgData.success) throw new Error("ImgBB image upload failed.");

      const imageUrl = imgData.data.url;

    
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        image: imageUrl,
        bloodGroup,
        district: districtName,
        upazila: upazilaName,
      });

      if (authError) {
        setError(authError.message);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#070a13] px-4 py-12 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/5 rounded-full blur-[140px] -z-10" />

      <div className="w-full max-w-2xl backdrop-blur-xl bg-[#0c101f]/80 border border-white/5 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10">
        <h2 className="text-3xl font-black text-center text-white uppercase tracking-wider mb-2">
          Create <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">Account</span>
        </h2>
        <p className="text-center text-slate-400 text-sm mb-8 font-medium uppercase tracking-widest">
          Join the elite network of donor lifesavers
        </p>

        {error && (
          <div className="alert alert-error bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl mb-6 py-3">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          <div className="form-control">
            <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Full Name</label>
            <input type="text" name="name" required className="input input-bordered w-full bg-white/[0.02] border-white/10 rounded-xl text-white focus:border-red-500/50 focus:outline-none transition-all duration-200" />
          </div>

          <div className="form-control">
            <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Email Address</label>
            <input type="email" name="email" required className="input input-bordered w-full bg-white/[0.02] border-white/10 rounded-xl text-white focus:border-red-500/50 focus:outline-none transition-all duration-200" />
          </div>

          <div className="form-control">
            <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Avatar / Profile Picture</label>
            <input type="file" name="avatar" accept="image/*" required className="file-input file-input-bordered w-full bg-[#0c101f] border-white/10 rounded-xl text-slate-400 file:bg-red-500/10 file:border-0 file:text-red-400 file:font-bold" />
          </div>

          <div className="form-control">
            <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Blood Group</label>
            <select name="blood_group" required className="select select-bordered w-full bg-[#0c101f] border-white/10 rounded-xl text-white focus:border-red-500/50 transition-all duration-200">
              <option value="">Select Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

        
          <div className="form-control">
            <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">District</label>
            <select name="district" required onChange={handleDistrictChange} className="select select-bordered w-full bg-[#0c101f] border-white/10 rounded-xl text-white focus:border-red-500/50 transition-all duration-200">
              <option value="">Select District</option>
              {allDistricts.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

         
          <div className="form-control">
            <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Upazila</label>
            <select name="upazila" required disabled={!selectedDistrict || upazilas.length === 0} className="select select-bordered w-full bg-[#0c101f] border-white/10 rounded-xl text-white focus:border-red-500/50 disabled:bg-white/[0.01] disabled:text-slate-600 transition-all duration-200">
              <option value="">
                {!selectedDistrict ? "Select District First" : upazilas.length === 0 ? "Loading Upazilas..." : "Select Upazila"}
              </option>
              {upazilas.map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Password</label>
            <input type="password" name="password" required className="input input-bordered w-full bg-white/[0.02] border-white/10 rounded-xl text-white focus:border-red-500/50 focus:outline-none transition-all duration-200" />
          </div>

          <div className="form-control">
            <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Confirm Password</label>
            <input type="password" name="confirm_password" required className="input input-bordered w-full bg-white/[0.02] border-white/10 rounded-xl text-white focus:border-red-500/50 focus:outline-none transition-all duration-200" />
          </div>

          <div className="form-control sm:col-span-2 pt-4">
            <button type="submit" disabled={loading} className="btn w-full bg-gradient-to-r from-red-600 to-rose-600 border-0 rounded-xl text-white font-bold uppercase tracking-widest shadow-[0_4px_25px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_35px_rgba(220,38,38,0.45)] transition-all duration-300 disabled:bg-slate-800 disabled:text-slate-500">
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-xs"></span>
                  Processing Architecture...
                </div>
              ) : "Register"}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-slate-400 mt-6 font-medium">
          Already verified on RoktoSeva? <Link href="/login" className="text-red-500 hover:text-red-400 transition-colors duration-200 font-bold underline">Login Here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;