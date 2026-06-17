"use client";

import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div 
      className="relative min-h-[85vh] flex items-center justify-center bg-[#070a13] overflow-hidden px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{ 
       
        backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1920&auto=format&fit=crop')` 
      }}
    >
      
   
      <div className="absolute inset-0 bg-gradient-to-b from-[#070a13]/90 via-[#070a13]/85 to-[#070a13]/95 backdrop-blur-[6px]" />
      
     
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      
   
      <div className="absolute top-1/4 left-10 -z-10 w-72 h-72 bg-red-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-10 -z-10 w-80 h-80 bg-rose-600/10 rounded-full blur-[150px]" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        
       
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/5 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)] backdrop-blur-md animate-bounce">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-red-400">
            Next-Gen Blood Coordination Platform
          </span>
        </div>

       
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-tight">
          Every Drop Counts <br />
          <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            Save A Life Today
          </span>
        </h1>

    
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-400 font-medium tracking-wide leading-relaxed">
          RoktoSeva seamlessly bridges the gap between blood donors and recipients. Empowering immediate medical response through decentralized, high-speed coordination.
        </p>

       
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          
        
          <Link 
            href="/register" 
            className="w-full sm:w-auto relative group px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-xl shadow-[0_0_25px_rgba(220,38,38,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] hover:scale-[1.03] overflow-hidden border border-red-500/20"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Join as a donor
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

         
          <Link 
            href="/search" 
            className="w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-wider text-slate-300 bg-white/[0.02] border border-white/10 rounded-xl backdrop-blur-md transition-all duration-300 hover:text-white hover:bg-white/5 hover:border-red-500/40 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] hover:scale-[1.03]"
          >
            <span className="flex items-center justify-center gap-2">
              Search Donors
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
          </Link>

        </div>

      
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-12 border-t border-white/5 text-left">
          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Active Donors</p>
            <h3 className="text-2xl font-black text-white mt-1">2,400+</h3>
          </div>
          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Requests Resolved</p>
            <h3 className="text-2xl font-black text-red-500 mt-1">98.4%</h3>
          </div>
          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-sm col-span-2 md:col-span-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Response Time</p>
            <h3 className="text-2xl font-black text-white mt-1">&lt; 5 Mins</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;