"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { notFound } from "next/navigation"; // নেক্সট জেএস এর নেটিভ নট ফাউন্ড

export default function RoleGuard({ children, allowedRoles }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (allowedRoles.includes(session.user.role)) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      
      // ৩ সেকেন্ড পর রিডাইরেক্ট
      setTimeout(() => {
        const userRole = session.user.role;
        // যদি ড্যাশবোর্ড রুট হয় তবে খালি স্ট্রিং, অন্যথায় রোল নাম
        const redirectPath = userRole === 'donor' ? '/dashboard' : `/dashboard/${userRole}`;
        router.push(redirectPath);
      }, 3000);
    }
  }, [session, isPending, router, allowedRoles]);

  if (isPending || isAuthorized === null) return null; // লোডিং হলে কিছু দেখাবে না

  if (isAuthorized === false) {
    // এখানে আমরা সরাসরি নট-ফাউন্ড এর মতো একটি UI রিটার্ন করছি
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0c101f] text-white">
        <h1 className="text-9xl font-black text-red-500/20">404</h1>
        <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
        <p className="text-slate-400 mt-2">You don't have permission to access this page.</p>
        <p className="text-slate-500 text-sm mt-6 animate-pulse">
          Redirecting to your dashboard in 3 seconds...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}