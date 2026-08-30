"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { districts, upazilas } from "@/data/locationData";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const BG_GRADIENT = {
  "A+": "from-red-600 to-rose-700", "A-": "from-red-700 to-red-900",
  "B+": "from-orange-600 to-red-700", "B-": "from-orange-700 to-orange-900",
  "AB+": "from-purple-600 to-red-700", "AB-": "from-purple-700 to-purple-900",
  "O+": "from-rose-500 to-red-700", "O-": "from-rose-700 to-rose-900",
};


function DonorCard({ donor }) {
  const grad = BG_GRADIENT[donor.bloodGroup] || "from-red-600 to-rose-700";
  return (
    <div className="group relative backdrop-blur-xl bg-[#0c101f]/70 border border-white/5 rounded-3xl p-6 flex flex-col gap-5 hover:border-red-500/30 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-lg`}>
          <span className="text-white font-black text-base">{donor.bloodGroup}</span>
        </div>
        <div>
          <h3 className="text-white font-bold text-base group-hover:text-red-400 transition-colors">{donor.name}</h3>
          <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-1 font-light">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {donor.upazila}, {donor.district}
          </p>
        </div>
      </div>
      
      <a 
        href={`tel:${donor.phone}`} 
        className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl text-center text-xs font-bold uppercase tracking-widest shadow-[0_4px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_4px_30px_rgba(220,38,38,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
        Call Donor
      </a>
    </div>
  );
}


function RequestCard({ req }) {
  return (
    <div className="group relative backdrop-blur-xl bg-[#0c101f]/70 border border-white/5 p-6 rounded-3xl flex flex-col justify-between gap-4 hover:border-red-500/30 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-full">
            {req.bloodGroup}
          </span>
          <span className="px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase rounded-lg tracking-wider">
            {req.status}
          </span>
        </div>
        <h3 className="text-white font-bold text-base">{req.patientName}</h3>
        <p className="text-slate-400 text-xs flex items-center gap-1.5 font-light">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5 text-red-400 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.28-7.5.82V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
          </svg>
          <span className="truncate">{req.hospital}</span>
        </p>
      </div>

      <Link 
        href={`/blood-donation-request/${req._id}`} 
        className="w-full py-2.5 bg-white/[0.03] border border-white/10 text-white rounded-xl text-center text-xs font-bold uppercase tracking-widest hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
      >
        View Details
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/all-requests/pending`)
      .then(r => r.json())
      .then(d => d.success && setPendingRequests(d.data));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = pendingRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pendingRequests.length / itemsPerPage);

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Donor List", 14, 15);
    const tableColumn = ["Name", "Blood Group", "District", "Upazila"];
    const tableRows = donors.map(d => [d.name, d.bloodGroup, d.district, d.upazila]);
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("donors_list.pdf");
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-white py-16 px-4 sm:px-8 space-y-16 relative overflow-hidden">
     
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

    
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

     
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
         
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2">
             Donor <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">Search</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl font-light leading-relaxed">
            Quickly locate and connect with verified blood donors across districts and upazilas instantly.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative backdrop-blur-2xl bg-[#0c101f]/80 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]" />

          {/* Blood group quick pills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Select Blood Group</label>
            <div className="flex flex-wrap gap-2">
              {BLOOD_GROUPS.map(bg => (
                <button 
                  key={bg} 
                  type="button" 
                  onClick={() => setSelectedBlood(selectedBlood === bg ? "" : bg)} 
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    selectedBlood === bg 
                      ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-400 scale-105" 
                      : "bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Location filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">District</label>
              <select 
                onChange={e => setSelectedDistrictId(e.target.value)} 
                className="w-full bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
              >
                <option value="" className="bg-[#0c101f]">Select District</option>
                {districts.map(d => <option key={d.id} value={d.id} className="bg-[#0c101f]">{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Upazila</label>
              <select 
                name="upazila" 
                className="w-full bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
              >
                <option value="" className="bg-[#0c101f]">Select Upazila</option>
                {filteredUpazilas.map(u => <option key={u.id} value={u.name} className="bg-[#0c101f]">{u.name}</option>)}
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_4px_25px_rgba(220,38,38,0.3)] hover:shadow-[0_4px_35px_rgba(220,38,38,0.5)] transition-all duration-300 cursor-pointer"
          >
            {loading ? "Searching Donors..." : "Search Donors"}
          </button>
        </form>
      </div>

      {/* --- Donor Results Section --- */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <span>Donor Results</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
              {donors.length} Found
            </span>
          </h2>
          {donors.length > 0 && (
            <button 
              onClick={downloadPDF} 
              className="px-4 py-2 bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-red-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download PDF
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400 text-sm animate-pulse">Searching for available donors...</div>
        ) : donors.length === 0 ? (
          <div className="backdrop-blur-xl bg-[#0c101f]/40 border border-white/5 rounded-3xl p-12 text-center text-slate-500 text-sm font-light">
            No donors found. Try changing your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donors.map(d => <DonorCard key={d._id} donor={d} />)}
          </div>
        )}
      </div>

      {/* --- Pending Requests Section --- */}
      <div className="max-w-6xl mx-auto pt-6 border-t border-white/5">
        <h2 className="text-2xl font-extrabold text-white mb-6 uppercase tracking-wider">Pending Requests</h2>
        
        {pendingRequests.length === 0 ? (
          <div className="backdrop-blur-xl bg-[#0c101f]/40 border border-white/5 rounded-3xl p-12 text-center text-slate-500 text-sm font-light">
            No pending requests at the moment.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentRequests.map(req => <RequestCard key={req._id} req={req} />)}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(p => p - 1)} 
                  className="px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs font-bold uppercase text-white disabled:opacity-25 hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  Prev
                </button>
                <span className="text-xs font-bold text-slate-400 tracking-widest">
                  {currentPage} / {totalPages}
                </span>
                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(p => p + 1)} 
                  className="px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs font-bold uppercase text-white disabled:opacity-25 hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}