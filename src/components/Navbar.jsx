"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client'; 

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        }
      }
    });
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
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>

  
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all duration-500 group-hover:rotate-[360deg]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent uppercase tracking-widest">
              Rokto<span className="text-red-500 font-black drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">Seva</span>
            </span>
          </Link>
        </div>

  
        <div className="hidden md:flex items-center gap-3 bg-white/[0.02] border border-white/5 p-1.5 rounded-2xl backdrop-blur-md">
          <Link href="/" className={getLinkStyles('/')}>Home</Link>
          <Link href="/dashboard/my-donation-requests" className={getLinkStyles('/dashboard/my-donation-requests')}>Donation Requests</Link>
          {user && <Link href="/dashboard/funding" className={getLinkStyles('/dashboard/funding')}>Funding</Link>}
        </div>

       
        <div className="flex items-center gap-4 relative">
          {isPending ? (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 animate-pulse" />
          ) : user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full online ring-2 ring-red-500/40 p-0.5 transition-all duration-300 hover:ring-red-500 hover:scale-105 shadow-[0_0_15px_rgba(239,68,68,0.2)] focus:outline-none"
              >
                <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden">
                  <img alt={user?.name} src={user?.image || "https://placehold.co/100"} className="w-full h-full object-cover" />
                </div>
              </button>
              
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  
                  <ul className="absolute right-0 mt-3 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.7)] bg-[#0c101f]/95 border border-white/10 rounded-2xl w-56 text-slate-300 space-y-1.5 backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent rounded-2xl pointer-events-none" />
                    
                    <li className="px-4 py-2.5 border-b border-white/5 flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-white truncate">{user?.name}</span>
                      <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-md w-fit border border-red-500/20 mt-1">
                        Verified Donor
                      </span>
                    </li>

                    <li>
                      <Link 
                        href="/dashboard" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl hover:bg-white/5 hover:text-white transition-all duration-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-all duration-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" /> Logout
                      </button>
                    </li>
                  </ul>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/login" className="text-xs sm:text-sm font-semibold tracking-wider text-slate-400 hover:text-white transition-colors duration-300 uppercase">
                Login
              </Link>
              <Link href="/register" className="relative group px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-xl border border-red-500/20 shadow-[0_4px_15px_rgba(220,38,38,0.25)]">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>


      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 top-[66px] bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          
          <div className="absolute top-[66px] left-0 w-full bg-[#070a13]/95 border-b border-white/5 backdrop-blur-2xl p-5 z-50 md:hidden flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-3 rounded-xl font-bold uppercase tracking-widest text-sm text-center ${pathname === '/' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-slate-400 bg-white/[0.01]'}`}
            >
              Home
            </Link>
            <Link 
              href="/dashboard/my-donation-requests" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-3 rounded-xl font-bold uppercase tracking-widest text-sm text-center ${pathname === '/dashboard/my-donation-requests' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-slate-400 bg-white/[0.01]'}`}
            >
              Donation Requests
            </Link>
            {user && (
              <Link 
                href="/funding" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-3 rounded-xl font-bold uppercase tracking-widest text-sm text-center ${pathname === '/funding' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-slate-400 bg-white/[0.01]'}`}
              >
                Funding
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;