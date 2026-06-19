import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="relative mt-auto bg-[#070a13] border-t border-red-500/10 px-4 sm:px-8 py-10 text-slate-400">
      <div className="absolute top-0 left-1/4 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_#ef4444]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-500 group-hover:rotate-[360deg]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white animate-pulse">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span className="text-lg font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent uppercase tracking-widest">
              Rokto<span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">Seva</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
            Bridging the gap between blood donors and recipients across Bangladesh through fast, decentralized coordination.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">Quick Links</h3>
          <Link href="/" className="text-sm hover:text-white transition-colors duration-200">Home</Link>
          <Link href="/dashboard/my-donation-requests" className="text-sm hover:text-white transition-colors duration-200">Donation Requests</Link>
          <Link href="/dashboard/funding" className="text-sm hover:text-white transition-colors duration-200">Support Us</Link>
          <Link href="/dashboard/create-donation-request" className="text-sm hover:text-white transition-colors duration-200">Request Blood</Link>
          <Link href="/contact" className="text-sm hover:text-white transition-colors duration-200">Contact Us</Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">Contact</h3>
          <a href="mailto:support@roktoseva.com" className="text-sm hover:text-white transition-colors duration-200">support@roktoseva.com</a>
          <p className="text-sm">Dhaka, Bangladesh</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1.5 text-xs text-red-500 font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Live 24/7
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
        <p>© {new Date().getFullYear()} RoktoSeva. All rights reserved.</p>
        <p>Built with care for lives that matter.</p>
      </div>
    </footer>
  )
}

export default Footer
