import Hero from "@/components/Home/Hero";
import PendingRequests from "@/components/PendingRequests";

export const metadata = {
  title: "Home",
  description:
    "Find blood donors near you across Bangladesh. Browse emergency blood requests, register as a donor, and help save lives with RoktoSeva.",
  alternates: {
    canonical: "https://rokto-seva.vercel.app",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070a13] text-white">
     <main>
       <Hero />
      <PendingRequests />
     </main>
    </div>
  );
}
