"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard"
      });

      if (authError) {
        toast.error(authError.message || "Invalid email or password.");
      } else {
        toast.success("Login successful! Redirecting...");
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#070a13] px-4 py-12 overflow-hidden">
    
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/5 rounded-full blur-[140px] -z-10" />

      
      <div className="w-full max-w-md backdrop-blur-xl bg-[#0c101f]/80 border border-white/5 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10">
        <h2 className="text-3xl font-black text-center text-white uppercase tracking-wider mb-2">
          Secure <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">Login</span>
        </h2>
        <p className="text-center text-slate-400 text-sm mb-8 font-medium uppercase tracking-widest">
          Access the core quantum blood network
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          
     
          <div className="form-control">
            <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="name@example.com"
              className="input input-bordered w-full bg-white/[0.02] border-white/10 rounded-xl text-white placeholder-slate-600 focus:border-red-500/50 focus:outline-none transition-all duration-200" 
            />
          </div>

         
          <div className="form-control">
            <div className="flex justify-between items-center mb-2">
              <label className="label-text text-xs uppercase font-bold tracking-wider text-slate-400">
                Password
              </label>
              
              
            </div>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="••••••••"
              className="input input-bordered w-full bg-white/[0.02] border-white/10 rounded-xl text-white placeholder-slate-600 focus:border-red-500/50 focus:outline-none transition-all duration-200" 
            />
          </div>

          
          <div className="form-control pt-4">
            <button 
              type="submit" 
              disabled={loading} 
              className="btn w-full bg-gradient-to-r from-red-600 to-rose-600 border-0 rounded-xl text-white font-bold uppercase tracking-widest shadow-[0_4px_25px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_35px_rgba(220,38,38,0.45)] transition-all duration-300 disabled:bg-slate-800 disabled:text-slate-500"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-xs"></span>
                  Verifying Identity...
                </div>
              ) : "Authenticate"}
            </button>
          </div>
        </form>

       
        <div className="text-center text-sm text-slate-400 mt-6 font-medium">
          New to the RoktoSeva Network? <Link href="/register" className="text-red-500 hover:text-red-400 transition-colors duration-200 font-bold underline">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;