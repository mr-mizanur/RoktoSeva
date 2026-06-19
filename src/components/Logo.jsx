export default function Logo({ showText = true, size = 36, textClass = "text-lg" }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="bg-gradient-to-br from-red-600 to-rose-900 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
        style={{ width: size, height: size, borderRadius: Math.round(size * 0.25) }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: size * 0.55, height: size * 0.55 }}
        >
          {/* Blood drop */}
          <path
            d="M12 2C9 6 5 10 5 14C5 18.4 8.1 22 12 22C15.9 22 19 18.4 19 14C19 10 15 6 12 2Z"
            fill="white"
          />
          {/* Highlight */}
          <ellipse cx="10" cy="11" rx="1.5" ry="2.5" fill="white" fillOpacity="0.4" />
        </svg>
      </div>
      {showText && (
        <span className={`font-black uppercase tracking-widest leading-none ${textClass}`}>
          <span className="text-white">Rokto</span>
          <span className="text-red-500">Seva</span>
        </span>
      )}
    </div>
  );
}
