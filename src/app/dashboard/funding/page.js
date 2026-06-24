"use client"; 
import React from 'react';

const FundingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070a13] text-white">
      <div className="max-w-md w-full p-8 bg-[#0c101f] border border-white/10 rounded-3xl shadow-2xl text-center">
        <h1 className="text-3xl font-black mb-4">Support <span className="text-red-500">RoktoSeva</span></h1>
        <p className="text-gray-400 mb-8">আপনার ছোট একটি অনুদান অনেক জীবন বাঁচাতে পারে।</p>

       
        <form action="/api/checkout_sessions" method="POST">
          <section>
            <button 
              type="submit" 
              role="link"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition duration-300"
            >
              Donate $10
            </button>
          </section>
        </form>


      </div>
    </div>
  );
};

export default FundingPage


