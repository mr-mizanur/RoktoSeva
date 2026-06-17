"use client";

import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const DashboardGateway = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    // লোডিং শেষ হওয়া পর্যন্ত অপেক্ষা করব
    if (isPending) return;

    // লগইন করা না থাকলে সোজা লগইন পেইজে কিক আউট
    if (!user) {
      router.push("/login");
      return;
    }

    // 🎯 ইউজারের রোল অনুযায়ী নির্দিষ্ট ফোল্ডারের পথ (Path) ওপেন হবে
    if (user.role === 'admin') {
      router.push("/dashboard/admin");
    } else if (user.role === 'volunteer') {
      router.push("/dashboard/volunteer");
    } else {
      // ডিফল্ট বা donor রোল হলে donor ফোল্ডার ওপেন হবে
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

// 🎯 এই লাইনটি সবচেয়ে গুরুত্বপূর্ণ! এটা মিস হলেই ওই এরর দেয়।
export default DashboardGateway;