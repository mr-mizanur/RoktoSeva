import { redirect } from 'next/navigation';
import { stripe } from '../../../../lib/stripe'; 

export default async function SuccessPage({ searchParams }) {

  const params = await searchParams;
  const sessionId = params?.session_id;

 
  if (!sessionId) {
    redirect('/dashboard/funding');
  }

  try {
  
    const session = await stripe.checkout.sessions.retrieve(sessionId);

   
    if (session.status === 'open') {
      redirect('/dashboard/funding');
    }

   
    const amountPaid = session.amount_total ? session.amount_total / 100 : 0;

    
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070a13] text-white p-4">
        <div className="max-w-md w-full p-10 bg-[#0c101f] border border-green-500/20 rounded-3xl text-center shadow-2xl">
          
          <div className="text-6xl mb-4">$</div>
          <h1 className="text-3xl font-black text-white mb-2">Payment Successful!</h1>
          <p className="text-gray-400 mb-6">আপনার অমূল্য অনুদানের জন্য RoktoSeva পরিবার কৃতজ্ঞ।</p>
          
          {/* পেমেন্ট ডিটেইলস কার্ড */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Total Donated</p>
            <h2 className="text-4xl font-black text-red-500">${amountPaid.toFixed(2)}</h2>
          </div>

        
          <div className="text-sm text-gray-500 mb-8">
            <p>Confirmation sent to:</p>
            <p className="font-semibold text-white">{session.customer_details?.email}</p>
          </div>

        
          <a 
            href="/dashboard" 
            className="block w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold transition duration-300"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
    
  } catch (error) {
    console.error("Stripe Retrieval Error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error loading payment details.</h1>
          <a href="/dashboard/funding" className="text-red-500 underline">Try again</a>
        </div>
      </div>
    );
  }
}