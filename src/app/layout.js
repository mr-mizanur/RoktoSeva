import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://rokto-seva.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RoktoSeva — Blood Donation Platform Bangladesh",
    template: "%s | RoktoSeva",
  },
  description:
    "RoktoSeva connects blood donors with patients across Bangladesh. Find donors by blood group and district, submit emergency requests, and save lives today.",
  keywords: [
    "blood donation Bangladesh",
    "রক্তদান",
    "blood donor",
    "rokto seva",
    "emergency blood request",
    "blood group",
    "voluntary blood donation",
  ],
  authors: [{ name: "RoktoSeva" }],
  creator: "RoktoSeva",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "RoktoSeva",
    title: "RoktoSeva — Blood Donation Platform Bangladesh",
    description:
      "Connect with blood donors across Bangladesh. Emergency blood requests, donor registration, and real-time coordination.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoktoSeva — Blood Donation Platform Bangladesh",
    description:
      "Connect with blood donors across Bangladesh. Emergency blood requests, donor registration, and real-time coordination.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070a13] text-white">
        <ConditionalNavbar />
        {children}
        <Footer />
        <ToastProvider />
        </body>
    </html>
  );
}
