export default function Logo({ showText = true, imageSize = 50, textClass = "text-lg" }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/roktoseba.jpg"
        alt="RoktoSeva Logo"
        className="object-cover shrink-0 rounded-full border-2 border-red-500/50"
        style={{ width: imageSize, height: imageSize }}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-black uppercase tracking-wider leading-none ${textClass}`}>
            <span className="text-red-500">রক্ত</span>
            <span className="text-red-500">সেবা</span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">
            Blood Donation
          </span>
        </div>
      )}
    </div>
  );
}