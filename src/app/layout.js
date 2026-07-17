import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/ConditionalFooter";
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
  description: "RoktoSeva connects blood donors with patients across Bangladesh. Find donors by blood group and district, submit emergency requests, and save lives today.",
  keywords: [
    "blood donation Bangladesh", "রক্তদান", "blood donor", "rokto seva", 
    "emergency blood request", "blood donation service", "donate blood in Bangladesh"
  ],
  authors: [{ name: "RoktoSeva Team" }],
  creator: "RoktoSeva",
  publisher: "RoktoSeva",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "RoktoSeva — Blood Donation Platform Bangladesh",
    description: "Connect with blood donors across Bangladesh. Emergency blood requests, donor registration, and real-time coordination.",
    siteName: "RoktoSeva",
    images: [{
      url: "/og-image.png", 
      width: 1200,
      height: 630,
      alt: "RoktoSeva - Blood Donation Platform",
    }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoktoSeva — Blood Donation Platform Bangladesh",
    description: "Connect with blood donors across Bangladesh. Emergency blood requests, donor registration, and real-time coordination.",
    images: ["/og-image.png"],
    creator: "@rokto_seva", 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
     
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "RoktoSeva",
              "url": siteUrl,
              "logo": `${siteUrl}/logo.png`,
              "description": "Blood donation platform in Bangladesh.",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "areaServed": "BD",
              }
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#070a13] text-white">
        <ConditionalNavbar />
        <main className="flex-grow">{children}</main>
        <ConditionalFooter />
        <ToastProvider />
      </body>
    </html>
  );
}