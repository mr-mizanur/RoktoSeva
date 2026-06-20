"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    label: "General",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
    faqs: [
      {
        q: "What is RoktoSeva?",
        a: "RoktoSeva (রক্তসেবা — 'Blood Service') is a free, full-stack blood donation platform built for Bangladesh. It connects blood donors with patients in urgent need through a real-time request system, smart donor search, and role-based dashboards — all in one place.",
      },
      {
        q: "Is RoktoSeva free to use?",
        a: "Yes, RoktoSeva is completely free for donors and patients. Creating an account, searching for donors, and making blood requests all cost nothing. We do offer a voluntary community funding feature to help us keep the platform running.",
      },
      {
        q: "Which areas does RoktoSeva cover?",
        a: "RoktoSeva covers all 64 districts of Bangladesh with upazila-level precision. You can search for donors or post requests from anywhere in the country.",
      },
      {
        q: "Is my personal data safe?",
        a: "Yes. We use industry-standard encryption and secure authentication via Better Auth. We never sell or share your personal information with third parties. Your contact details are only visible to verified users on the platform.",
      },
    ],
  },
  {
    label: "Donating Blood",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    faqs: [
      {
        q: "Who can donate blood?",
        a: "Generally, anyone aged 18–60 who weighs at least 50 kg and is in good health can donate blood. You should not donate if you have a fever, recent illness, pregnancy, or certain chronic conditions. Always consult a doctor if unsure.",
      },
      {
        q: "How often can I donate blood?",
        a: "Whole blood can be donated once every 3 months (90 days). This gives your body enough time to replenish red blood cells. Platelet donations can be made more frequently — every 2 weeks.",
      },
      {
        q: "Does donating blood hurt?",
        a: "You may feel a small pinch when the needle is inserted, but the actual donation process (around 8–10 minutes) is generally painless. Most donors feel fine immediately afterward.",
      },
      {
        q: "What blood groups are supported?",
        a: "All 8 standard blood groups are supported: A+, A−, B+, B−, AB+, AB−, O+, and O−. O− is the universal donor and is always in high demand. You can specify your blood group during registration.",
      },
      {
        q: "How do I register as a donor?",
        a: "Click 'Register' on the top navbar, fill in your details including blood group, district, and upazila, and submit. Your profile will be searchable by anyone looking for donors in your area.",
      },
    ],
  },
  {
    label: "Requesting Blood",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    faqs: [
      {
        q: "How do I request blood?",
        a: "Log in to your account and go to Dashboard → Create Donation Request. Fill in the required blood group, hospital location, and urgency level. Your request will go live immediately and be visible to matching donors.",
      },
      {
        q: "What happens after I post a request?",
        a: "Your request is published with a 'Pending' status. Matching donors can view the request and contact you. Volunteers and admins also monitor active requests and can help coordinate. You can track the status in Dashboard → My Donation Requests.",
      },
      {
        q: "What do the request statuses mean?",
        a: "Pending — the request is live and awaiting a donor. In-Progress — a donor has been found and the donation is being arranged. Done — the donation was completed successfully. Canceled — the request was withdrawn.",
      },
      {
        q: "Can I edit or cancel a request after posting?",
        a: "Yes. Go to Dashboard → My Donation Requests, find your request, and use the Edit or Cancel options. You can update details like location or urgency at any time while the request is Pending.",
      },
      {
        q: "Is there an emergency contact for urgent needs?",
        a: "Yes. For critical emergencies, call our hotline at +880 1700-000000, available 24/7. You can also email support@roktoseva.com and we will respond within 3 hours.",
      },
    ],
  },
  {
    label: "Account & Roles",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    faqs: [
      {
        q: "What are the different user roles?",
        a: "Donor — can register, create requests, manage their own profile and requests, and fund the platform. Volunteer — can view and update the status of all active requests across the platform. Admin — has full control: manage users, all requests, and view funding analytics.",
      },
      {
        q: "How do I become a volunteer?",
        a: "Volunteer status is granted by an admin. Contact us via the Contact page or email support@roktoseva.com with your name and motivation. Active, trusted donors are prioritised for volunteer roles.",
      },
      {
        q: "Can I change my blood group or location after registration?",
        a: "Yes. Go to Dashboard → Profile to update your blood group, district, upazila, and other personal details at any time.",
      },
      {
        q: "How do I upload a profile picture?",
        a: "On the Profile page, click the avatar area to upload a photo. Images are stored securely via ImgBB. Supported formats are JPG and PNG.",
      },
    ],
  },
  {
    label: "Community Funding",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    faqs: [
      {
        q: "What is community funding?",
        a: "Community funding lets donors and supporters contribute money to keep RoktoSeva running and growing. 100% of contributions go toward platform infrastructure, outreach, and new features.",
      },
      {
        q: "How do I contribute?",
        a: "Go to Dashboard → Funding, choose an amount, and complete the secure Stripe checkout. You'll receive a confirmation and be redirected to a success page.",
      },
      {
        q: "Is the payment secure?",
        a: "Yes. All payments are processed by Stripe, a globally trusted payment platform. RoktoSeva never stores your card details.",
      },
      {
        q: "Can I see a history of my contributions?",
        a: "Admins can view all funding transactions in the admin dashboard. Personal contribution history for donors is on the roadmap and will be added in a future update.",
      },
    ],
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      className={`group relative backdrop-blur-xl bg-[#0c101f]/60 border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen ? "border-red-500/30 shadow-[0_0_25px_rgba(220,38,38,0.08)]" : "border-white/5 hover:border-white/10"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`text-sm font-bold leading-snug transition-colors duration-200 ${isOpen ? "text-white" : "text-slate-300"}`}>
          {q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-red-500/20 border border-red-500/30 rotate-45" : "bg-white/5 border border-white/10"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-3.5 h-3.5 transition-colors duration-200 ${isOpen ? "text-red-400" : "text-slate-400"}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}
      >
        <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  const handleCategoryChange = (idx) => {
    setActiveCategory(idx);
    setOpenIndex(null);
  };

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative min-h-screen bg-[#070a13] text-white py-20 px-4 sm:px-8 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-600/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-rose-900/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
              Got Questions?
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter mb-4 leading-tight">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
              Questions
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-light leading-relaxed">
            Everything you need to know about donating blood, requesting blood, and using RoktoSeva.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryChange(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === idx
                  ? "bg-red-500/15 border-red-500/40 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                  : "bg-white/[0.03] border-white/5 text-slate-400 hover:text-white hover:border-white/10"
              }`}
            >
              <span className={activeCategory === idx ? "text-red-400" : "text-slate-500"}>
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-3">
          {categories[activeCategory].faqs.map((item, idx) => (
            <FAQItem
              key={idx}
              q={item.q}
              a={item.a}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="relative mt-14 backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 rounded-3xl p-8 sm:p-10 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.04] to-transparent pointer-events-none rounded-3xl" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5 text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-widest text-white mb-2">
              Still have questions?
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-7 leading-relaxed">
              Our team is available 24/7 for emergencies and responds to all other queries within 3 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_4px_25px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_35px_rgba(220,38,38,0.45)] transition-all duration-300"
              >
                Contact Us
              </Link>
              <a
                href="mailto:support@roktoseva.com"
                className="px-6 py-3 bg-white/[0.03] border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/[0.06] hover:text-white transition-all duration-300"
              >
                support@roktoseva.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
