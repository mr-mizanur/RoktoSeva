import GuidelinesSection from "@/components/GuidelinesSection";

export const metadata = {
  title: "Blood Donation Guidelines",
  description:
    "Complete blood donation guidelines and tips for Bangladesh donors — what to do before, during, and after donating, eligibility criteria, and a full blood group compatibility chart.",
  alternates: {
    canonical: "https://rokto-seva.vercel.app/guidelines",
  },
};

export default function GuidelinesPage() {
  return <GuidelinesSection />;
}
