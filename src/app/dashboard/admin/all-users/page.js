"use client";
import React, { useEffect, useState } from 'react';

export default function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/all-users')
      .then(res => res.json())
      .then(data => setUsers(data.data));
  }, []);

  const handleUpdate = async (id, updateData) => {
    await fetch(`http://localhost:5000/api/admin/update-user/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    setUsers(users.map(u => u._id === id ? { ...u, ...updateData } : u));
  };

  return (
    <div className="p-6 md:p-10 bg-[#070a13] min-h-screen text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-widest text-white">
          User Directory
        </h2>
        <p className="text-slate-500 mt-2 text-sm font-medium">Manage platform permissions and user status.</p>
      </div>

      <div className="bg-[#0c101f]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-2 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                <th className="py-4">User</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10">
                          <img src={user.image || "/avatar-placeholder.png"} />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="bg-white/5 text-slate-300 text-[10px] px-3 py-1 rounded-full border border-white/10 uppercase font-bold tracking-wider">
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className={`text-[10px] uppercase font-bold tracking-wider ${user.status === 'blocked' ? 'text-red-500' : 'text-emerald-500'}`}>
                      {user.status}
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="dropdown dropdown-left">
                      <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 transition-all rounded-lg border border-white/10">
                        Manage
                      </button>
                      <ul className="dropdown-content menu p-2 shadow-xl bg-[#121626] rounded-xl w-44 border border-white/10 mt-2">
                        <li>
                          <button 
                            className="text-xs font-medium text-left py-2 px-3 hover:bg-white/5 rounded-lg"
                            onClick={() => handleUpdate(user._id, { status: user.status === 'active' ? 'blocked' : 'active' })}
                          >
                            {user.status === 'active' ? 'Block Access' : 'Unblock Access'}
                          </button>
                        </li>
                        <li>
                          <button 
                            className="text-xs font-medium text-left py-2 px-3 hover:bg-white/5 rounded-lg"
                            onClick={() => handleUpdate(user._id, { role: 'admin' })}
                          >
                            Assign Admin
                          </button>
                        </li>
                        <li>
                          <button 
                            className="text-xs font-medium text-left py-2 px-3 hover:bg-white/5 rounded-lg"
                            onClick={() => handleUpdate(user._id, { role: 'volunteer' })}
                          >
                            Assign Volunteer
                          </button>
                        </li>
                      </ul>
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