"use client";
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function MyRequests() {
  const { data: session } = authClient.useSession();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donor/my-requests?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setRequests(data.data));
    }
  }, [session]);

  return (
    <div className="p-10 bg-[#070a13] min-h-screen text-white">
      <h1 className="text-2xl font-black mb-6">My Blood Requests</h1>
        <div className="grid gap-4">
          {requests.map(req => (
          <div key={req._id} className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <h2 className="font-bold">{req.patientName} - {req.bloodGroup}</h2>
            <p className="text-sm text-slate-400">Hospital: {req.hospital}</p>
            <span className="badge badge-outline mt-2">{req.status}</span>
            </div>
          ))}
        </div>
    </div>
  );
}