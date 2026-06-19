"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { districts, upazilas } from "@/data/locationData";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const BG_GRADIENT = {
  "A+": "from-red-600 to-rose-700", "A-": "from-red-700 to-red-900",
  "B+": "from-orange-600 to-red-700", "B-": "from-orange-700 to-orange-900",
  "AB+": "from-purple-600 to-red-700", "AB-": "from-purple-700 to-purple-900",
  "O+": "from-rose-500 to-red-700", "O-": "from-rose-700 to-rose-900",
};

// --- Donor Card Component ---
function DonorCard({ donor }) {
  const grad = BG_GRADIENT[donor.bloodGroup] || "from-red-600 to-rose-700";
  return (
    <div className="bg-[#0c101f]/60 border border-white/5 rounded-3xl p-6 flex flex-col gap-4 hover:border-red-500/30 transition-all">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center`}>
          <span className="text-white font-black text-sm">{donor.bloodGroup}</span>
        </div>
        <div>
          <h3 className="text-white font-bold">{donor.name}</h3>
          <p className="text-slate-500 text-xs">{donor.upazila}, {donor.district}</p>
        </div>
      </div>
      <a href={`tel:${donor.phone}`} className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl text-center text-xs font-bold hover:scale-[1.02] transition-transform">
        CALL DONOR
      </a>
    </div>
  );
}

// --- Request Card Component ---
function RequestCard({ req }) {
  return (
    <div className="bg-[#0c101f]/60 border border-white/5 p-6 rounded-3xl flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="px-3 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded-full">{req.bloodGroup}</div>
        <span className="text-[10px] text-yellow-500 uppercase">{req.status}</span>
      </div>
      <h3 className="text-white font-bold">{req.patientName}</h3>
      <p className="text-slate-400 text-xs text-sm">Hospital: {req.hospital}</p>
      <Link href={`/blood-donation-request/${req._id}`} className="mt-2 w-full py-2 bg-white/5 text-white rounded-lg text-center text-xs font-bold hover:bg-white/10">
        VIEW DETAILS
      </Link>
    </div>
  );
}

export default function SearchPage() {
  const [donors, setDonors] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBlood, setSelectedBlood] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  // Fetch Pending Requests
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/all-requests/pending`)
      .then(r => r.json())
      .then(d => d.success && setPendingRequests(d.data));
  }, []);

  const filteredUpazilas = useMemo(() => 
    upazilas.filter(u => u.district_id === selectedDistrictId), [selectedDistrictId]
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const params = new URLSearchParams();
    if (selectedBlood) params.set("bloodGroup", selectedBlood);
    const district = districts.find(d => d.id === selectedDistrictId)?.name;
    if (district) params.set("district", district);
    if (form.get("upazila")) params.set("upazila", form.get("upazila"));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donors/search?${params}`);
      const data = await res.json();
      setDonors(data.success ? data.data : []);
    } catch { setDonors([]); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#070a13] p-6 space-y-12">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-[#0c101f] p-8 rounded-3xl border border-white/5 space-y-6">
        <div className="flex flex-wrap gap-2">
          {BLOOD_GROUPS.map(bg => (
            <button key={bg} type="button" onClick={() => setSelectedBlood(bg)} className={`px-4 py-2 rounded-xl text-xs font-bold ${selectedBlood === bg ? "bg-red-600 text-white" : "bg-white/5 text-slate-400"}`}>
              {bg}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select onChange={e => setSelectedDistrictId(e.target.value)} className="w-full bg-white/5 p-3 rounded-xl text-white">
            <option value="">Select District</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <select name="upazila" className="w-full bg-white/5 p-3 rounded-xl text-white">
            <option value="">Select Upazila</option>
            {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
          </select>
        </div>
        <button type="submit" className="w-full py-4 bg-red-600 text-white rounded-xl font-bold">SEARCH DONORS</button>
      </form>

      {/* Results */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? <p className="text-white text-center col-span-3">Searching...</p> : donors.map(d => <DonorCard key={d._id} donor={d} />)}
      </div>

      {/* Pending Requests */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Pending Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pendingRequests.map(req => <RequestCard key={req._id} req={req} />)}
        </div>
      </div>
    </div>
  );
}