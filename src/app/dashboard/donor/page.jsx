"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, notFound } from "next/navigation"; 
import Link from "next/link";
import { toast } from "react-toastify";
import {
  Droplets, MapPin, ChevronLeft, ChevronRight,
  Plus, ClipboardList, User, Search,
  CheckCircle2, Trash2, Clock, Building2,
  TrendingUp, AlertCircle, XCircle,
} from "lucide-react";

const STATUS_STYLE = {
  pending:    "bg-yellow-500/10 text-yellow-400 border-yellow-500/25",
  inprogress: "bg-blue-500/10  text-blue-400  border-blue-500/25",
  done:       "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  canceled:   "bg-slate-500/10  text-slate-400  border-slate-500/25",
};

const STATUS_LABEL = {
  pending: "Pending",
  inprogress: "In Progress",
  done: "Done",
  canceled: "Canceled",
};

const ITEMS_PER_PAGE = 3;

function StatCard({ label, value, icon, color }) {
  const colors = {
    red:     "bg-red-500/10 border-red-500/20 text-red-400",
    yellow:  "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
    blue:    "bg-blue-500/10 border-blue-500/20 text-blue-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  };
  return (
    <div className="relative backdrop-blur-xl bg-[#0c101f]/70 border border-white/5 rounded-2xl p-5 flex items-center gap-4 overflow-hidden group hover:border-white/10 transition-all duration-300">
      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-white leading-none">{value}</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{label}</p>
      </div>
    </div>
  );
}

function QuickAction({ href, icon, label, sub, accent }) {
  const accents = {
    red:     "hover:border-red-500/30 hover:bg-red-500/[0.05]",
    blue:    "hover:border-blue-500/30 hover:bg-blue-500/[0.05]",
    emerald: "hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]",
    purple:  "hover:border-purple-500/30 hover:bg-purple-500/[0.05]",
  };
  const iconAccents = {
    red:     "bg-red-500/10 border-red-500/20 text-red-400",
    blue:    "bg-blue-500/10 border-blue-500/20 text-blue-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    purple:  "bg-purple-500/10 border-purple-500/20 text-purple-400",
  };
  return (
    <Link
      href={href}
      className={`group relative backdrop-blur-xl bg-[#0c101f]/70 border border-white/5 rounded-2xl p-4 flex items-center gap-3 transition-all duration-300 overflow-hidden ${accents[accent]}`}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${iconAccents[accent]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="text-[10px] text-slate-500">{sub}</p>
      </div>
    </Link>
  );
}

export default function DonorDashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [donations, setDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  useEffect(() => {
    if (!isPending) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "donor") {
        // যদি ডোনার না হয়, সাথে সাথে not-found এ পাঠাবে
        notFound();
      }
    }
  }, [user, isPending, router]);
  useEffect(() => {
    if (!isPending && !user) { router.push("/login"); return; }
    if (!isPending && user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/donor/my-donations?email=${encodeURIComponent(user.email)}`,
        { credentials: "include" }
      )
        .then((r) => r.json())
        .then((d) => { if (d.success) setDonations(d.data); })
        .catch(() => toast.error("Failed to load donations."))
        .finally(() => setLoadingDonations(false));
    }
  }, [user, isPending, router]);

  const totalPages = Math.ceil(donations.length / ITEMS_PER_PAGE);
  const paginated = donations.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const stats = {
    total:      donations.length,
    pending:    donations.filter((d) => d.status === "pending").length,
    inprogress: donations.filter((d) => d.status === "inprogress").length,
    done:       donations.filter((d) => d.status === "done").length,
  };

  const handleStatusUpdate = async (id, status) => {
    const toastId = toast.loading("Updating status…");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/blood-request/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, donorName: user.name, donorEmail: user.email }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setDonations((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
        toast.update(toastId, { render: `Marked as ${STATUS_LABEL[status]}`, type: "success", isLoading: false, autoClose: 3000 });
      } else {
        toast.update(toastId, { render: "Update failed. Try again.", type: "error", isLoading: false, autoClose: 3000 });
      }
    } catch {
      toast.update(toastId, { render: "Network error. Try again.", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    const toastId = toast.loading("Deleting record…");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/blood-request/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        setDonations((prev) => prev.filter((r) => r._id !== id));
        if (currentPage > Math.ceil((donations.length - 1) / ITEMS_PER_PAGE)) {
          setCurrentPage((p) => Math.max(1, p - 1));
        }
        toast.update(toastId, { render: "Record deleted.", type: "success", isLoading: false, autoClose: 3000 });
      } else {
        toast.update(toastId, { render: "Delete failed. Try again.", type: "error", isLoading: false, autoClose: 3000 });
      }
    } catch {
      toast.update(toastId, { render: "Network error. Try again.", type: "error", isLoading: false, autoClose: 3000 });
    } finally {
      setDeletingId(null);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-40">
        <span className="loading loading-spinner loading-lg text-red-500" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

    
      <div className="relative backdrop-blur-xl bg-[#0c101f]/70 border border-white/5 rounded-3xl p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.04] via-transparent to-transparent pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative shrink-0">
            <img
              src={user?.image || "https://placehold.co/100"}
              alt={user?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-red-500/30"
            />
            <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0c101f] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-black text-white truncate">
                Welcome back, {user?.name?.split(" ")[0] || "Donor"}
              </h1>
              {user?.bloodGroup && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-black text-red-400">
                  <Droplets size={11} />
                  {user.bloodGroup}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
              {(user?.district || user?.upazila) && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-500" />
                  {[user?.upazila, user?.district].filter(Boolean).join(", ")}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Donor
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">{user?.email}</p>
          </div>

          <Link
            href="/dashboard/profile"
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all duration-200"
          >
            <User size={13} /> Edit Profile
          </Link>
        </div>
      </div>

    
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Donations" value={stats.total}      icon={<TrendingUp size={18} />}   color="red" />
        <StatCard label="Pending"          value={stats.pending}    icon={<Clock size={18} />}         color="yellow" />
        <StatCard label="In Progress"      value={stats.inprogress} icon={<AlertCircle size={18} />}  color="blue" />
        <StatCard label="Completed"        value={stats.done}       icon={<CheckCircle2 size={18} />} color="emerald" />
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <QuickAction href="/dashboard/create-donation-request" icon={<Plus size={16} />}         label="New Request"   sub="Post a blood request"     accent="red" />
          <QuickAction href="/dashboard/my-donation-requests"    icon={<ClipboardList size={16} />} label="My Requests"   sub="View all your requests"   accent="blue" />
          <QuickAction href="/search"                            icon={<Search size={16} />}        label="Find Donors"   sub="Search by blood group"    accent="emerald" />
          <QuickAction href="/dashboard/profile"                 icon={<User size={16} />}          label="Profile"       sub="Manage your account"      accent="purple" />
        </div>
      </div>

      {/* ── Donations Table ── */}
      <div className="relative backdrop-blur-xl bg-[#0c101f]/70 border border-white/5 rounded-3xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Table header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-white">My Donations</h2>
            <p className="text-[10px] text-slate-500 mt-0.5">{donations.length} record{donations.length !== 1 ? "s" : ""} total</p>
          </div>
          <Link
            href="/dashboard/create-donation-request"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 shadow-[0_4px_15px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.4)]"
          >
            <Plus size={13} /> New
          </Link>
        </div>

        {/* Body */}
        {loadingDonations ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-md text-red-500" />
          </div>
        ) : donations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-6">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
              <Droplets size={24} className="text-slate-600" />
            </div>
            <p className="text-sm font-bold text-slate-400">No donations yet</p>
            <p className="text-xs text-slate-600 max-w-xs">Create your first blood donation request to get started.</p>
            <Link
              href="/dashboard/create-donation-request"
              className="mt-2 px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200"
            >
              Create Request
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Patient</th>
                    <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Hospital</th>
                    <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Location</th>
                    <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Date</th>
                    <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                    <th className="text-center px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((req) => (
                    <tr key={req._id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150 group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                            <Droplets size={14} className="text-red-400" />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{req.patientName}</p>
                            {req.bloodGroup && (
                              <p className="text-[10px] font-bold text-red-400">{req.bloodGroup}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Building2 size={13} className="text-slate-500 shrink-0" />
                          <span className="truncate max-w-[120px]">{req.hospital || "—"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <MapPin size={13} className="text-slate-500 shrink-0" />
                          {[req.upazila, req.district].filter(Boolean).join(", ") || "—"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {req.dateNeeded ? new Date(req.dateNeeded).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${STATUS_STYLE[req.status] || STATUS_STYLE.pending}`}>
                          {STATUS_LABEL[req.status] || req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {req.status === "inprogress" && (
                            <button
                              onClick={() => handleStatusUpdate(req._id, "done")}
                              title="Mark as Done"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold transition-all duration-200"
                            >
                              <CheckCircle2 size={13} /> Done
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(req._id)}
                            disabled={deletingId === req._id}
                            title="Delete"
                            className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-all duration-200 disabled:opacity-40"
                          >
                            {deletingId === req._id
                              ? <span className="loading loading-spinner loading-xs" />
                              : <Trash2 size={13} />
                            }
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden divide-y divide-white/[0.04]">
              {paginated.map((req) => (
                <div key={req._id} className="px-5 py-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <Droplets size={15} className="text-red-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{req.patientName}</p>
                        {req.bloodGroup && <p className="text-[10px] font-bold text-red-400">{req.bloodGroup}</p>}
                      </div>
                    </div>
                    <span className={`shrink-0 inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${STATUS_STYLE[req.status] || STATUS_STYLE.pending}`}>
                      {STATUS_LABEL[req.status] || req.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                    {req.hospital && (
                      <span className="flex items-center gap-1.5 col-span-2">
                        <Building2 size={12} className="text-slate-500" /> {req.hospital}
                      </span>
                    )}
                    {(req.district || req.upazila) && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-500" />
                        {[req.upazila, req.district].filter(Boolean).join(", ")}
                      </span>
                    )}
                    {req.dateNeeded && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-500" />
                        {new Date(req.dateNeeded).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {req.status === "inprogress" && (
                      <button
                        onClick={() => handleStatusUpdate(req._id, "done")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold transition-all duration-200"
                      >
                        <CheckCircle2 size={13} /> Mark Done
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(req._id)}
                      disabled={deletingId === req._id}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-all duration-200 disabled:opacity-40"
                    >
                      {deletingId === req._id ? <span className="loading loading-spinner loading-xs" /> : <><Trash2 size={13} /> Delete</>}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
                <p className="text-xs text-slate-500">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, donations.length)} of {donations.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <span className="text-xs font-bold text-slate-400 px-1">{currentPage} / {totalPages}</span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
