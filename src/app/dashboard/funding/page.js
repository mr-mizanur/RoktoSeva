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
//        {/* Stripe ফর্ম */}
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



"use client"; 
import React, { useState, useEffect } from 'react';

const FundingPage = () => {
  const [amount, setAmount] = useState(10);
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    // ব্যাকএন্ড থেকে ফান্ডিং হিস্ট্রি নিয়ে আসা
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}/api/funds`)
      .then(res => res.json())
      .then(data => { if(data.success) setFunds(data.data) })
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#070a13] text-white p-8">
      <div className="max-w-md mx-auto p-8 bg-[#0c101f] border border-white/10 rounded-3xl shadow-2xl text-center">
        <h1 className="text-3xl font-black mb-4">Support <span className="text-red-500">RoktoSeva</span></h1>
        
        <form action={`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}/api/checkout_sessions`} method="POST">
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
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition"
          >
            Donate ${amount}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FundingPage;