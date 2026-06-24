//"use client"; 
//import React from 'react';
//
//const FundingPage = () => {
//  return (
//    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070a13] text-white">
//      <div className="max-w-md w-full p-8 bg-[#0c101f] border border-white/10 rounded-3xl shadow-2xl text-center">
//        <h1 className="text-3xl font-black mb-4">Support <span className="text-red-500">RoktoSeva</span></h1>
//        <p className="text-gray-400 mb-8">আপনার ছোট একটি অনুদান অনেক জীবন বাঁচাতে পারে।</p>
//
//       
//        <form action="/api/checkout_sessions" method="POST">
//          <section>
//            <button 
//              type="submit" 
//              role="link"
//              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition duration-300"
//            >
//              Donate $10
//            </button>
//          </section>
//        </form>
//      </div>
//    </div>
//  );
//};
//
//export default FundingPage
//
//






"use client"; 
import React, { useState, useEffect } from 'react';

const FundingPage = () => {
  const [amount, setAmount] = useState(10);
  const [donors, setDonors] = useState([]);

  // ব্যাকএন্ড থেকে ডোনেশন লিস্ট নিয়ে আসা
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}/api/all-donations`)
      .then(res => res.json())
      .then(data => { if(data.success) setDonors(data.data) })
      .catch(err => console.error("Error fetching donations:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#070a13] text-white p-6 md:p-12">
      {/* ডোনেশন ফর্ম কার্ড */}
      <div className="max-w-md mx-auto p-8 bg-[#0c101f] border border-white/10 rounded-3xl shadow-2xl text-center mb-12">
        <h1 className="text-3xl font-black mb-4">Support <span className="text-red-500">RoktoSeva</span></h1>
        <p className="text-gray-400 mb-8">আপনার ছোট একটি অনুদান অনেক জীবন বাঁচাতে পারে।</p>
<form action="/api/checkout_sessions" method="POST">
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">অনুদান পরিমাণ (মিনিমাম $10)</label>
            <input 
              type="number"
              name="amount"
              min="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#070a13] border border-white/10 p-4 rounded-xl text-center text-xl font-bold outline-none focus:border-red-500"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition duration-300"
          >
            Donate ${amount}
          </button>
        </form>
      </div>

      {/* ডোনেশন লিস্ট টেবিল */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Recent Donors</h2>
        <div className="bg-[#0c101f] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {donors.length > 0 ? donors.map((d, i) => (
                <tr key={i} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-green-400 font-bold">${d.amount}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-gray-500">No donations found yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;