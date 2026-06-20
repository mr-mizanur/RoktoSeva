import Link from "next/link";

const highlights = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "Eat & Hydrate First",
    desc: "Have a nutritious meal and drink 500 ml of extra water 2–3 hours before donating.",
    step: "Before",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Stay Calm & Still",
    desc: "Relax during donation. Inform staff immediately if you feel dizzy or unwell.",
    step: "During",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Rest & Recover",
    desc: "Sit for 10–15 min after donating, drink fluids, and avoid heavy lifting for 5 hours.",
    step: "After",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: "Every 90 Days",
    desc: "Whole blood can be donated once every 3 months. Mark it in your calendar — every drop counts.",
    step: "Interval",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Age 18–60, 50 kg+",
    desc: "Anyone aged 18–60 weighing at least 50 kg and in good health is eligible to donate.",
    step: "Eligibility",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "O− is Universal",
    desc: "O− blood can be given to anyone in an emergency. AB+ can receive from all blood groups.",
    step: "Blood Group",
  },
];

export default function GuidelinesPreview() {
  return (
    <section className="relative bg-[#070a13] py-20 px-4 sm:px-8 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-red-600/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">Donor Tips</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter leading-tight">
              Blood Donation{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
                Guidelines
              </span>
            </h2>
            <p className="text-slate-400 text-base mt-3 max-w-md font-light leading-relaxed">
              Key things every donor should know — before, during, and after donating blood.
            </p>
          </div>
          <Link
            href="/guidelines"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border border-red-500/30 text-red-400 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-red-500/10 transition-all duration-300 self-start sm:self-auto"
          >
            Full Guide
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="group relative backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:border-red-500/20 hover:bg-[#0c101f]/80 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500/15 transition-colors duration-300">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-lg">
                  {item.step}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1.5">{item.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
