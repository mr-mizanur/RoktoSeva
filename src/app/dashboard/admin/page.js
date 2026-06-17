"use client";

import React from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  
  if (!isPending && (!user || user.role !== 'admin')) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#070a13] text-white p-8">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-[#0c101f]/80 border border-purple-500/20 p-8 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_#a855f7]" />
        
        <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold px-3 py-1 rounded-md uppercase tracking-widest">
          Admin Core Intelligence Folder
        </span>
        <h1 className="text-3xl font-black uppercase tracking-wider mt-4 mb-2">
          System Core <span className="text-purple-500">Root</span>
        </h1>
        <p className="text-slate-400 text-sm">Full architectural control over RoktoSeva database management system.</p>
      </div>
    </div>
  );
}