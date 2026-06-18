import Hero from "@/components/Home/Hero";
import PendingRequests from "@/components/PendingRequests";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070a13] text-white">
      <Hero />
      <PendingRequests />
    </div>
  );
}
