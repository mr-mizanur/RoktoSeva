"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const donorNav = [
  { href: "/dashboard/donor", label: "Overview", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  )},
  { href: "/dashboard/create-donation-request", label: "Create Request", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
  )},
  { href: "/dashboard/my-donation-requests", label: "My Requests", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
  )},
  { href: "/dashboard/profile", label: "Profile", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
  )},
];

const adminNav = [
  { href: "/dashboard/admin", label: "Overview", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  )},
  { href: "/dashboard/admin/all-users", label: "Manage Users", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
  )},
  { href: "/dashboard/admin/requests", label: "All Requests", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
  )},
  { href: "/dashboard/admin/funding", label: "Funding", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  )},
  { href: "/dashboard/profile", label: "Profile", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
  )},
];

const volunteerNav = [
  { href: "/dashboard/volunteer", label: "Overview", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  )},
  { href: "/dashboard/volunteer/requests", label: "All Requests", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
  )},
  { href: "/dashboard/profile", label: "Profile", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
  )},
];

const roleConfig = {
  admin:     { nav: adminNav,     accent: "purple", label: "Admin" },
  volunteer: { nav: volunteerNav, accent: "rose",   label: "Volunteer" },
  donor:     { nav: donorNav,     accent: "red",    label: "Donor" },
};

const accentClasses = {
  red:    { active: "bg-red-500/10 text-red-400 border-red-500/30",    dot: "bg-red-500",    badge: "bg-red-500/10 text-red-400 border-red-500/20",    glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",  line: "from-transparent via-red-500 to-transparent" },
  purple: { active: "bg-purple-500/10 text-purple-400 border-purple-500/30", dot: "bg-purple-500", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20", glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]", line: "from-transparent via-purple-500 to-transparent" },
  rose:   { active: "bg-rose-500/10 text-rose-400 border-rose-500/30",   dot: "bg-rose-500",   badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",   glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",  line: "from-transparent via-rose-500 to-transparent" },
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const role = user?.role || "donor";
  const config = roleConfig[role] || roleConfig.donor;
  const ac = accentClasses[config.accent];

  const handleLogout = async () => {
    await authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/login") } });
  };

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#0a0d1a] border-r border-white/5">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)] shrink-0">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
            <path d="M12 2C9 6 5 10 5 14C5 18.4 8.1 22 12 22C15.9 22 19 18.4 19 14C19 10 15 6 12 2Z" fill="white"/>
            <ellipse cx="10" cy="11" rx="1.5" ry="2.5" fill="white" fillOpacity="0.4"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-black text-white uppercase tracking-widest leading-none">Rokto<span className="text-red-500">Seva</span></p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Dashboard</p>
        </div>
      </div>

     
      <div className="px-4 py-3 border-b border-white/5">
        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${ac.badge}`}>
          {config.label} Panel
        </span>
      </div>

     
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {config.nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border group ${
                isActive
                  ? `${ac.active} border-opacity-50 ${ac.glow}`
                  : "text-slate-400 border-transparent hover:text-white hover:bg-white/5"
              }`}
            >
              <span className={isActive ? "" : "opacity-60 group-hover:opacity-100 transition-opacity"}>{item.icon}</span>
              {item.label}
              {isActive && <span className={`ml-auto w-1.5 h-1.5 rounded-full ${ac.dot}`} />}
            </Link>
          );
        })}
      </nav>

      
      <div className="border-t border-white/5 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={user?.image || "https://placehold.co/100"}
            alt={user?.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 border border-transparent hover:border-red-500/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#070a13] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-red-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a13] flex">

      
      <div className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 md:top-0 z-30">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 z-50 md:hidden">
            <Sidebar />
          </div>
        </>
      )}

    
      <div className="flex-1 flex flex-col md:ml-60">

     
        <header className="sticky top-0 z-20 bg-[#070a13]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Dashboard</p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Home
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className={`hidden sm:inline-flex text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${ac.badge}`}>
              {config.label}
            </span>
            <img
              src={user?.image || "https://placehold.co/100"}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
            />
          </div>
        </header>

      
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <footer className="border-t border-white/5 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} RoktoSeva. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/guidelines" className="hover:text-slate-400 transition-colors duration-200">Guidelines</a>
            <a href="/faq" className="hover:text-slate-400 transition-colors duration-200">FAQ</a>
            <a href="/contact" className="hover:text-slate-400 transition-colors duration-200">Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
