"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();


  const [user, setUser] = useState(null); 

  

  const handleLogout = () => {
    setUser(null);
  };


  const getLinkStyles = (path) => {
    const isActive = pathname === path;
    return `relative px-4 py-2 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
      isActive 
        ? 'text-white bg-gradient-to-r from-red-600/20 to-rose-600/10 border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#070a13]/70 border-b border-red-500/10 px-4 sm:px-8 py-3.5 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
  
      <div className="absolute top-0 left-1/4 -z-10 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_#ef4444]" />

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
      
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white animate-pulse">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          
            <div className="absolute inset-0 rounded-xl border border-white/20 scale-110 group-hover:scale-125 transition-all duration-500" />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent uppercase tracking-widest hidden sm:block">
            Rokto<span className="text-red-500 font-black drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">Seva</span>
          </span>
        </Link>

     
        <div className="hidden md:flex items-center gap-3 bg-white/[0.02] border border-white/5 p-1.5 rounded-2xl backdrop-blur-md">
          <Link href="/" className={getLinkStyles('/')}>Home</Link>
          <Link href="/donation-requests" className={getLinkStyles('/donation-requests')}>Donation Requests</Link>
          {user && <Link href="/funding" className={getLinkStyles('/funding')}>Funding</Link>}
        </div>

     
        <div className="flex items-center gap-4">
          {user ? (
        
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="relative btn btn-ghost btn-circle avatar online ring-2 ring-red-500/40 p-0.5 transition-all duration-300 hover:ring-red-500 hover:scale-105 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" src={user?.avatar} />
                </div>
              </div>
              
            
              <ul tabIndex={0} className="dropdown-content z-[50] mt-4 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.7)] bg-[#0c101f]/95 border border-white/10 rounded-2xl w-56 text-slate-300 space-y-1.5 backdrop-blur-2xl animate-fadeIn">
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent rounded-2xl pointer-events-none" />
                <li className="px-4 py-2.5 border-b border-white/5 text-xs text-slate-400 font-semibold tracking-wider uppercase truncate">
                  {user?.name}
                </li>
                <li>
                  <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl hover:bg-white/5 hover:text-white transition-all duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-all duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
          
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-semibold tracking-wider text-slate-400 hover:text-white transition-colors duration-300 uppercase">
                Login
              </Link>
              <Link href="/register" className="relative group px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-xl shadow-[0_4px_20px_rgba(220,38,38,0.25)] transition-all duration-300 hover:shadow-[0_4px_25px_rgba(220,38,38,0.5)] hover:scale-[1.02] overflow-hidden border border-red-500/20">
                <span className="relative z-10">Register</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>
          )}

     
          <div className="dropdown dropdown-end md:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle text-slate-300 hover:bg-white/5 border border-white/5 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <ul tabIndex={0} className="dropdown-content z-[50] mt-4 p-2 shadow-2xl bg-[#0c101f] border border-white/10 rounded-2xl w-52 text-slate-300 space-y-1 backdrop-blur-xl">
              <li><Link href="/" className="block px-4 py-2 text-sm rounded-xl hover:bg-white/5">Home</Link></li>
              <li><Link href="/donation-requests" className="block px-4 py-2 text-sm rounded-xl hover:bg-white/5">Donation Requests</Link></li>
              {user && <li><Link href="/funding" className="block px-4 py-2 text-sm rounded-xl hover:bg-white/5">Funding</Link></li>}
            </ul>
          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;