"use client";

import { useState } from "react";
import Link from "next/link";

const previewFAQs = [
  {
    q: "Who can donate blood?",
    a: "Generally, anyone aged 18–60 who weighs at least 50 kg and is in good health. You should not donate if you have a fever, recent illness, or pregnancy. Consult a doctor if unsure.",
  },
  {
    q: "How do I request blood on RoktoSeva?",
    a: "Log in, go to Dashboard → Create Donation Request, fill in the blood group, hospital, and urgency. Your request goes live instantly and is visible to matching donors.",
  },
  {
    q: "How often can I donate blood?",
    a: "Whole blood can be donated once every 3 months (90 days). Platelets can be donated every 2 weeks. This gives your body time to fully recover.",
  },
  {
    q: "Is RoktoSeva free to use?",
    a: "Yes — completely free for donors and patients. Creating an account, searching for donors, and posting blood requests all cost nothing.",
  },
  {
    q: "What do the request statuses mean?",
    a: "Pending — awaiting a donor. In-Progress — a donor has been found. Done — donation completed. Canceled — request was withdrawn.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      className={`group relative backdrop-blur-xl bg-[#0c101f]/60 border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen ? "border-red-500/30 shadow-[0_0_20px_rgba(220,38,38,0.07)]" : "border-white/5 hover:border-white/10"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className={`text-sm font-bold leading-snug transition-colors duration-200 ${isOpen ? "text-white" : "text-slate-300"}`}>
          {q}
        </span>
        <span className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-red-500/20 border border-red-500/30 rotate-45" : "bg-white/5 border border-white/10"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-3 h-3 transition-colors duration-200 ${isOpen ? "text-red-400" : "text-slate-400"}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48" : "max-h-0"}`}>
        <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative bg-[#070a13] py-20 px-4 sm:px-8 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter mb-3">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">Questions</span>
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto font-light">
            Quick answers to the questions we hear most.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="flex flex-col gap-3 mb-8">
          {previewFAQs.map((item, idx) => (
            <FAQItem
              key={idx}
              q={item.q}
              a={item.a}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 border border-red-500/30 text-red-400 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-red-500/10 transition-all duration-300"
          >
            View All FAQs
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
