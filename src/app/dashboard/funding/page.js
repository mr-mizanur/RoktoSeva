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
//
//
//      </div>
//    </div>
//  );
//};
//
//export default FundingPage
//

import React from 'react';
import { MongoClient } from 'mongodb';
import Link from 'next/link';

async function getDonors(page) {
  const limit = 3;
  const skip = (page - 1) * limit;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("roktoseva");
  
 
  const totalDonors = await db.collection("funds").countDocuments();
  
 
  const donors = await db.collection("funds")
    .find({})
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
    
  await client.close();
  
  return {
    donors: donors.map(d => ({
      userEmail: d.userEmail || "Anonymous",
      amount: d.amount || 0,
      date: d.date ? new Date(d.date).toLocaleDateString('en-GB') : "N/A"
    })),
    totalPages: Math.ceil(totalDonors / limit)
  };
}

export default async function FundingPage({ searchParams }) {
 
  const page = parseInt((await searchParams)?.page) || 1;
  const { donors, totalPages } = await getDonors(page);

  return (
    <div className="min-h-screen bg-[#070a13] text-white p-8">

      <div className="max-w-md mx-auto p-8 bg-[#0c101f] border border-white/10 rounded-3xl shadow-2xl text-center mb-12">
         <span className="text-lg font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent uppercase tracking-widest">
              Rokto<span className="text-red-500 font-black drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">Seva</span>
            </span>
        <form action="/api/checkout_sessions" method="POST">
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 font-bold py-4 rounded-xl">Donate $10</button>
        </form>
      </div>

   
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Recent Donors</h2>
        <div className="bg-[#0c101f] border border-white/10 rounded-3xl overflow-hidden mb-6">
          <table className="w-full text-left">
            <tbody className="divide-y divide-white/5">
              {donors.map((d, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">{d.userEmail}</td>
                  <td className="px-6 py-4 text-green-500 font-bold">${d.amount}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
        <div className="flex justify-center gap-4">
          {page > 1 && (
            <Link href={`/dashboard/funding?page=${page - 1}`} className="px-4 py-2 bg-white/10 rounded">Previous</Link>
          )}
          <span className="px-4 py-2">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/dashboard/funding?page=${page + 1}`} className="px-4 py-2 bg-white/10 rounded">Next</Link>
          )}
        </div>
      </div>
    </div>
  );
}