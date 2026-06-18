import { stripe } from '../../../lib/stripe'

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donate to RoktoSeva',
              description: 'Support blood donation efforts',
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // এনভায়রনমেন্ট ভেরিয়েবল থেকে URL নিন
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/funding/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/funding`,
    });

    return Response.redirect(session.url, 303);
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return new Response(JSON.stringify({ error: "Checkout failed" }), { status: 500 });
  }
}