"use client";
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Droplets, Hospital, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function MyRequests() {
  const { data: session, isPending } = authClient.useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donor/my-requests?email=${encodeURIComponent(session.user.email)}`)
        .then(res => res.json())
        .then(data => {
          setRequests(data.data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else if (!isPending) {
        setLoading(false);
    }
  }, [session, isPending]);

  if (isPending || loading) return (
    <div className="flex justify-center items-center h-screen text-purple-500">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  return (
    <div className="p-6 md:p-10 bg-[#070a13] min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-widest">My Blood Requests</h1>
        <p className="text-slate-500 mt-2 text-sm font-medium">Track and manage your blood donation requests.</p>
      </div>
      
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-white/5 rounded-3xl bg-[#0c101f]/50">
          <AlertCircle size={48} className="text-slate-700 mb-4" />
          <p className="text-slate-500 font-medium">You haven't made any blood requests yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map(req => (
            <div key={req._id} className="group p-6 bg-[#0c101f] border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300 shadow-xl hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                    <Droplets size={20} />
                  </div>
                  <h2 className="font-bold text-lg">{req.patientName}</h2>
                </div>
                <span className={`badge border-0 px-3 py-3 uppercase text-[10px] font-black tracking-widest ${
                  req.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                  req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {req.status}
                </span>
              </div>
              
              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Hospital size={16} /> {req.hospital}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> {req.upazila}, {req.district}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> {new Date(req.dateNeeded).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} /> {req.donationTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}