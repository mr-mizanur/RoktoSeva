//"use client";
//import React, { useEffect, useState } from 'react';
//import { MoreVertical, Shield, User, Ban, CheckCircle, ShieldCheck } from 'lucide-react';
//
//export default function AllUsers() {
//  const [users, setUsers] = useState([]);
//  const [openDropdownId, setOpenDropdownId] = useState(null); // ← New state
//   
//
//
//  useEffect(() => {
//    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/all-users`)
//      .then(res => res.json())
//      .then(data => setUsers(data.data || []))
//      .catch(err => console.error(err));
//  }, []);
//
//  const handleUpdate = async (id, updateData) => {
//    try {
//      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/update-user/${id}`, {
//        method: 'PATCH',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify(updateData)
//      });
//      setUsers(users.map(u => u._id === id ? { ...u, ...updateData } : u));
//      setOpenDropdownId(null); // close dropdown after action
//    } catch (err) {
//      console.error(err);
//    }
//  };
//
//  const toggleDropdown = (id) => {
//    setOpenDropdownId(openDropdownId === id ? null : id);
//  };
//
//  return (
//    <div className="p-6 md:p-10 bg-[#070a13] min-h-screen text-white">
//      <div className="mb-8">
//        <h2 className="text-3xl font-black uppercase tracking-widest text-white">User Directory</h2>
//        <p className="text-slate-500 mt-2 text-sm font-medium">Manage platform permissions and user status.</p>
//      </div>
//
//      <div className="bg-[#0c101f]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-2 shadow-2xl">
//        <div className="overflow-visible">
//          <table className="table w-full border-separate border-spacing-0">
//            <thead>
//              <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
//                <th className="py-4 pl-6">User</th>
//                <th>Role</th>
//                <th>Status</th>
//                <th className="text-right pr-6">Management</th>
//              </tr>
//            </thead>
//            <tbody className="divide-y divide-white/5">
//              {users.map(user => (
//                <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
//                  <td className="py-4 pl-6">
//                    <div className="flex items-center gap-4">
//                      <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10">
//                        <img src={user.image || "/avatar-placeholder.png"} alt={user.name} />
//                      </div>
//                      <div>
//                        <div className="font-semibold">{user.name}</div>
//                        <div className="text-xs text-slate-500">{user.email}</div>
//                      </div>
//                    </div>
//                  </td>
//                  <td>
//                    <span className="flex w-max items-center gap-1.5 bg-white/5 text-slate-300 text-[10px] px-3 py-1 rounded-full border border-white/10 uppercase font-bold">
//                      {user.role === 'admin' ? <Shield size={12} /> : <User size={12} />}
//                      {user.role}
//                    </span>
//                  </td>
//                  <td>
//                    <div className={`flex w-max items-center gap-1.5 text-[10px] uppercase font-bold ${user.status === 'blocked' ? 'text-red-500' : 'text-emerald-500'}`}>
//                      {user.status === 'blocked' ? <Ban size={12} /> : <CheckCircle size={12} />}
//                      {user.status}
//                    </div>
//                  </td>
//                  <td className="text-right pr-6">
//                    <div className="relative">
//                      {/* Button */}
//                      <button
//                        onClick={() => toggleDropdown(user._id)}
//                        className="btn btn-ghost btn-sm btn-circle cursor-pointer"
//                      >
//                        <MoreVertical size={20} className="text-slate-400" />
//                      </button>
//
//                      {/* Dropdown Menu */}
//                      {openDropdownId === user._id && (
//                        <div className="absolute right-0 mt-2 z-[999] menu p-2 shadow-2xl bg-[#121626] rounded-xl w-48 border border-white/10">
//                          <ul className="space-y-1">
//                            <li>
//                              <button
//                                className="flex w-full items-center gap-2 text-xs font-medium py-2 px-3 hover:bg-white/5 rounded-lg text-left"
//                                onClick={() => handleUpdate(user._id, { status: user.status === 'active' ? 'blocked' : 'active' })}
//                              >
//                                {user.status === 'active' ? <Ban size={14} /> : <CheckCircle size={14} />}
//                                {user.status === 'active' ? 'Block Access' : 'Unblock Access'}
//                              </button>
//                            </li>
//                            <li>
//                              <button
//                                className="flex w-full items-center gap-2 text-xs font-medium py-2 px-3 hover:bg-white/5 rounded-lg text-left"
//                                onClick={() => handleUpdate(user._id, { role: 'admin' })}
//                              >
//                                <ShieldCheck size={14} />
//                                Assign Admin
//                              </button>
//                            </li>
//                            <li>
//                              <button
//                                className="flex w-full items-center gap-2 text-xs font-medium py-2 px-3 hover:bg-white/5 rounded-lg text-left"
//                                onClick={() => handleUpdate(user._id, { role: 'volunteer' })}
//                              >
//                                <User size={14} />
//                                Assign Volunteer
//                              </button>
//                            </li>
//                          </ul>
//                        </div>
//                      )}
//                    </div>
//                  </td>
//                </tr>
//              ))}
//            </tbody>
//          </table>
//        </div>
//      </div>
//    </div>
//  );
//}



"use client";

import React, { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { notFound } from "next/navigation";
import { MoreVertical, Shield, User, Ban, CheckCircle, ShieldCheck } from 'lucide-react';

export default function AllUsers() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  
  const [users, setUsers] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [loading, setLoading] = useState(true);

  // সুরক্ষিত useEffect: অথরাইজেশন চেক ও ডাটা ফেচিং
  useEffect(() => {
    if (isPending) return;

    // ১. শুধুমাত্র অ্যাডমিন ঢুকতে পারবে, অন্যথায় notFound
    if (!user || user.role !== "admin") {
      notFound();
      return;
    }

    // ২. ডাটা ফেচিং
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/all-users`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setUsers(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [user, isPending]);

  const handleUpdate = async (id, updateData) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/update-user/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      setUsers(users.map(u => u._id === id ? { ...u, ...updateData } : u));
      setOpenDropdownId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // লোডিং স্টেট
  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#070a13] text-purple-500">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-[#070a13] min-h-screen text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-widest text-white">User Directory</h2>
        <p className="text-slate-500 mt-2 text-sm font-medium">Manage platform permissions and user status.</p>
      </div>

      <div className="bg-[#0c101f]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-2 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                <th className="py-4 pl-6">User</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-right pr-6">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10">
                        <img src={user.image || "/avatar-placeholder.png"} alt={user.name} />
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="flex w-max items-center gap-1.5 bg-white/5 text-slate-300 text-[10px] px-3 py-1 rounded-full border border-white/10 uppercase font-bold">
                      {user.role === 'admin' ? <Shield size={12} /> : <User size={12} />}
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className={`flex w-max items-center gap-1.5 text-[10px] uppercase font-bold ${user.status === 'blocked' ? 'text-red-500' : 'text-emerald-500'}`}>
                      {user.status === 'blocked' ? <Ban size={12} /> : <CheckCircle size={12} />}
                      {user.status}
                    </div>
                  </td>
                  <td className="text-right pr-6">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(user._id)}
                        className="btn btn-ghost btn-sm btn-circle cursor-pointer"
                      >
                        <MoreVertical size={20} className="text-slate-400" />
                      </button>

                      {openDropdownId === user._id && (
                        <div className="absolute right-0 mt-2 z-[999] menu p-2 shadow-2xl bg-[#121626] rounded-xl w-48 border border-white/10">
                          <ul className="space-y-1">
                            <li>
                              <button
                                className="flex w-full items-center gap-2 text-xs font-medium py-2 px-3 hover:bg-white/5 rounded-lg text-left"
                                onClick={() => handleUpdate(user._id, { status: user.status === 'active' ? 'blocked' : 'active' })}
                              >
                                {user.status === 'active' ? <Ban size={14} /> : <CheckCircle size={14} />}
                                {user.status === 'active' ? 'Block Access' : 'Unblock Access'}
                              </button>
                            </li>
                            <li>
                              <button
                                className="flex w-full items-center gap-2 text-xs font-medium py-2 px-3 hover:bg-white/5 rounded-lg text-left"
                                onClick={() => handleUpdate(user._id, { role: 'admin' })}
                              >
                                <ShieldCheck size={14} />
                                Assign Admin
                              </button>
                            </li>
                            <li>
                              <button
                                className="flex w-full items-center gap-2 text-xs font-medium py-2 px-3 hover:bg-white/5 rounded-lg text-left"
                                onClick={() => handleUpdate(user._id, { role: 'volunteer' })}
                              >
                                <User size={14} />
                                Assign Volunteer
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}