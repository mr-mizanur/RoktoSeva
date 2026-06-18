import Link from 'next/link'

export const metadata = {
  title: '404 – Page Not Found | RoktoSeva',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070a13] text-white px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-8xl font-black text-red-600 mb-2">404</p>
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        <p className="text-gray-400 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
