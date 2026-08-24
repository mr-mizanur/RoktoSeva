import Link from 'next/link'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="relative mt-auto bg-[#070a13] border-t border-red-500/10 px-4 sm:px-8 py-10 text-slate-400">
      <div className="absolute top-0 left-1/4 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_#ef4444]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
       
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-3 group w-fit">
           <Logo/>
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
          <Link href="/guidelines" className="text-sm hover:text-white transition-colors duration-200">Donation Guidelines</Link>
          <Link href="/faq" className="text-sm hover:text-white transition-colors duration-200">FAQ</Link>
          <Link href="/contact" className="text-sm hover:text-white transition-colors duration-200">Contact Us</Link>
        </div>

       
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
