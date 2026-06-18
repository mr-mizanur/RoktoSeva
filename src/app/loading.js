export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070a13]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-red-600 animate-spin" />
        <p className="text-gray-400 text-sm tracking-widest uppercase">Loading</p>
      </div>
    </div>
  )
}
