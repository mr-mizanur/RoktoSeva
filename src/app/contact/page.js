import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the RoktoSeva team for emergency blood requests, donor support, technical help, or partnership inquiries. Available 24/7 across Bangladesh.",
  alternates: {
    canonical: "https://rokto-seva.vercel.app/contact",
  },
};

export default function ContactPage() {
  return <ContactSection />;
}
