"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Hero = () => {
  const [stats, setStats] = useState({
    activeDonors: 0,
    livesImpacted: 0,
    pendingRequests: 0
  });

  useEffect(() => {
  
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stats`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats({
            activeDonors: data.data.activeDonors,
            livesImpacted: data.data.livesImpacted,
            pendingRequests: data.data.pendingRequests
          });
        }
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#050505] overflow-hidden">
    
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2000&auto=format&fit=crop')` 
        }}
      />
      
    
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

     
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        
       
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
            {stats.pendingRequests} Pending Requests Now
          </span>
        </div>

       
        <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tighter mb-8 leading-[0.9]">
          Donate Blood,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
            Inspire Life.
          </span>
        </h1>

     
        <p className="max-w-xl mx-auto text-lg md:text-xl text-slate-400 font-light mb-10 leading-relaxed">
          RoktoSeva connects compassionate donors with patients in urgent need. Join a community dedicated to seamless, real-time medical support.
        </p>

        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-all active:scale-95">
            Become a Donor
          </Link>
          <Link href="/search" className="px-8 py-4 bg-white/5 text-white border border-white/10 font-medium rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm">
            Request Blood
          </Link>
        </div>

       
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white">{stats.activeDonors}+</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Active Donors</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white">{stats.pendingRequests}+</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Pending Requests</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white">$50K+</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Total Funding</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;