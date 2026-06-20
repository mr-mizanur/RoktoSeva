import Link from "next/link";

const beforeTips = [
  { title: "Eat a healthy meal", desc: "Have a nutritious meal 2–3 hours before donating. Avoid fatty foods as they can affect blood tests." },
  { title: "Stay well hydrated", desc: "Drink an extra 500 ml of water before your appointment. Good hydration makes the process easier and safer." },
  { title: "Sleep well", desc: "Get at least 7–8 hours of sleep the night before. Fatigue can cause dizziness during or after donation." },
  { title: "Avoid alcohol", desc: "Abstain from alcohol for at least 24 hours before donating. Alcohol dehydrates you and affects blood quality." },
  { title: "Wear comfortable clothing", desc: "Wear a short-sleeve shirt or clothing with sleeves that roll up easily for quick access to your arm." },
  { title: "Bring valid ID", desc: "Carry a valid national ID card or donor registration card if you have one." },
];

const duringTips = [
  { title: "Stay calm and relaxed", desc: "Anxiety can raise blood pressure. Take slow, deep breaths and focus on something positive." },
  { title: "Inform staff of concerns", desc: "Tell the medical staff if you feel dizzy, nauseous, or unwell at any point during the process." },
  { title: "Keep your arm still", desc: "Avoid moving or tensing your arm during donation. Staying still ensures a smooth and faster process." },
  { title: "Squeeze the stress ball", desc: "Gently squeezing a stress ball during donation helps maintain blood flow and speeds up the process." },
];

const afterTips = [
  { title: "Rest for 10–15 minutes", desc: "Sit or lie down at the donation site for at least 10 minutes before leaving to avoid dizziness." },
  { title: "Drink fluids", desc: "Drink extra water, juice, or electrolyte drinks for the next 24 hours to replace lost fluids." },
  { title: "Eat a snack", desc: "Have a small snack like biscuits or fruit juice immediately after donation to restore blood sugar." },
  { title: "Avoid heavy lifting", desc: "Do not lift heavy objects with the donation arm for 5 hours after giving blood." },
  { title: "Skip intense exercise", desc: "Avoid vigorous exercise or strenuous physical activity for the rest of the day." },
  { title: "Keep the bandage on", desc: "Leave the bandage on for at least 4 hours. If the site bleeds, apply firm pressure and raise your arm." },
];

const eligibility = [
  { label: "Age", value: "18 – 60 years" },
  { label: "Weight", value: "At least 50 kg" },
  { label: "Hemoglobin", value: "≥ 12.5 g/dL (women) / ≥ 13.0 g/dL (men)" },
  { label: "Blood Pressure", value: "Systolic 90–160 / Diastolic 60–100 mmHg" },
  { label: "Pulse", value: "60 – 100 bpm (regular)" },
  { label: "Interval", value: "Every 90 days (3 months)" },
  { label: "Fever / Illness", value: "Must be symptom-free for 14 days" },
  { label: "Medications", value: "Inform staff — some may disqualify temporarily" },
];

const compatibility = [
  { group: "A+",  donateTo: ["A+", "AB+"],              receiveFrom: ["A+", "A−", "O+", "O−"] },
  { group: "A−",  donateTo: ["A+", "A−", "AB+", "AB−"], receiveFrom: ["A−", "O−"] },
  { group: "B+",  donateTo: ["B+", "AB+"],              receiveFrom: ["B+", "B−", "O+", "O−"] },
  { group: "B−",  donateTo: ["B+", "B−", "AB+", "AB−"], receiveFrom: ["B−", "O−"] },
  { group: "AB+", donateTo: ["AB+"],                    receiveFrom: ["All groups"] },
  { group: "AB−", donateTo: ["AB+", "AB−"],             receiveFrom: ["AB−", "A−", "B−", "O−"] },
  { group: "O+",  donateTo: ["A+", "B+", "O+", "AB+"], receiveFrom: ["O+", "O−"] },
  { group: "O−",  donateTo: ["All groups"],             receiveFrom: ["O−"] },
];

function TipCard({ title, desc, index }) {
  return (
    <div className="group relative backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 rounded-2xl p-5 flex gap-4 transition-all duration-300 hover:border-red-500/20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="shrink-0 w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[11px] font-black text-red-400">
        {String(index).padStart(2, "0")}
      </div>
      <div>
        <p className="text-sm font-bold text-white mb-1">{title}</p>
        <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function SectionHeader({ badge, title, highlight, subtitle }) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">{badge}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tighter mb-2">
        {title}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">{highlight}</span>
      </h2>
      {subtitle && <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{subtitle}</p>}
    </div>
  );
}

export default function GuidelinesSection() {
  return (
    <section className="relative min-h-screen bg-[#070a13] text-white py-20 px-4 sm:px-8 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-rose-900/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
              Save Lives Safely
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter mb-4 leading-tight">
            Blood Donation{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
              Guidelines
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-light leading-relaxed">
            Everything you need to know to donate safely, recover quickly, and make the biggest impact.
          </p>
        </div>

        {/* Before donating */}
        <div className="mb-16">
          <SectionHeader
            badge="Step 01"
            title="Before"
            highlight="Donating"
            subtitle="Prepare your body to ensure a smooth donation and quick recovery."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {beforeTips.map((tip, i) => <TipCard key={i} {...tip} index={i + 1} />)}
          </div>
        </div>

        {/* During donation */}
        <div className="mb-16">
          <SectionHeader
            badge="Step 02"
            title="During"
            highlight="Donation"
            subtitle="Stay calm and communicate with the medical team throughout the process."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {duringTips.map((tip, i) => <TipCard key={i} {...tip} index={i + 1} />)}
          </div>
        </div>

        {/* After donating */}
        <div className="mb-16">
          <SectionHeader
            badge="Step 03"
            title="After"
            highlight="Donating"
            subtitle="Give your body the care it needs to recover fully within 24 hours."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {afterTips.map((tip, i) => <TipCard key={i} {...tip} index={i + 1} />)}
          </div>
        </div>

        {/* Eligibility */}
        <div className="mb-16">
          <SectionHeader
            badge="Eligibility"
            title="Who Can"
            highlight="Donate?"
            subtitle="Basic criteria that must be met before donating blood."
          />
          <div className="relative backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-white/5 sm:divide-y-0 sm:divide-x-0">
              {eligibility.map((row, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-4 px-6 py-4 ${i % 2 === 0 ? "border-b border-white/5" : "border-b border-white/5"} last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0`}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{row.label}</span>
                  <span className="text-sm font-bold text-white text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blood group compatibility */}
        <div className="mb-16">
          <SectionHeader
            badge="Compatibility"
            title="Blood Group"
            highlight="Chart"
            subtitle="Know which blood groups can give to and receive from each other."
          />
          <div className="relative backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">Blood Group</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">Can Donate To</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">Can Receive From</th>
                  </tr>
                </thead>
                <tbody>
                  {compatibility.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors duration-150">
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-sm font-black text-red-400">
                          {row.group}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {row.donateTo.map((g) => (
                            <span key={g} className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                              {g}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {row.receiveFrom.map((g) => (
                            <span key={g} className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                              {g}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-3 text-center">
            O− is the universal donor. AB+ is the universal recipient.
          </p>
        </div>

        {/* CTA */}
        <div className="relative backdrop-blur-xl bg-[#0c101f]/60 border border-white/5 rounded-3xl p-8 sm:p-10 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.04] to-transparent pointer-events-none rounded-3xl" />
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-widest text-white mb-2">
              Ready to Save a Life?
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-7 leading-relaxed">
              Register as a donor today. One donation can save up to three lives.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_4px_25px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_35px_rgba(220,38,38,0.45)] transition-all duration-300"
              >
                Become a Donor
              </Link>
              <Link
                href="/search"
                className="px-6 py-3 bg-white/[0.03] border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/[0.06] hover:text-white transition-all duration-300"
              >
                Find Donors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
