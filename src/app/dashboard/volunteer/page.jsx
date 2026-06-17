"use client";

import React from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function VolunteerDashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

 
  if (!isPending && (!user || (user.role !== 'volunteer' && user.role !== 'admin'))) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#070a13] text-white p-8">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_15px_#f43f5e]" />
        
        <span className="text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold px-3 py-1 rounded-md uppercase tracking-widest">
          Volunteer Workspace Folder
        </span>
        <h1 className="text-3xl font-black uppercase tracking-wider mt-4 mb-2">
          Volunteer <span className="text-rose-500">Command</span>
        </h1>
        <p className="text-slate-400 text-sm">Welcome, {user?.name}. Review emergency tasks and community blood bank statuses here.</p>
      </div>
    </div>
  );
}