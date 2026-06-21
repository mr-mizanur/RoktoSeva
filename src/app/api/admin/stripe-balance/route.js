import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    const balance = await stripe.balance.retrieve();

    const available = balance.available.find((b) => b.currency === "usd")?.amount ?? 0;
    const pending = balance.pending.find((b) => b.currency === "usd")?.amount ?? 0;

    return Response.json({ available, pending });
  } catch (error) {
    console.error("Stripe Balance Error:", error);
    return Response.json({ error: "Failed to fetch balance" }, { status: 500 });
  }
}
