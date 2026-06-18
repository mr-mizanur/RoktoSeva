import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RoktoSeva — Next-Gen Blood Coordination Platform",
  description: "RoktoSeva bridges the gap between blood donors and recipients across Bangladesh through decentralized, high-speed coordination.",
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
        </body>
    </html>
  );
}
