"use client";

import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const DashboardGateway = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
  
    if (isPending) return;

   
    if (!user) {
      router.push("/login");
      return;
    }

    
    if (user.role === 'admin') {
      router.push("/dashboard/admin");
    } else if (user.role === 'volunteer') {
      router.push("/dashboard/volunteer");
    } else {
     
      router.push("/dashboard/donor");
    }
  }, [user, isPending, router]);

  return (
    <div className="min-h-screen bg-[#070a13] flex flex-col items-center justify-center gap-4">
      <span className="loading loading-spinner loading-lg text-red-500"></span>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">
        Initializing Quantum Role Architecture...
      </p>
    </div>
  );
};


export default DashboardGateway;