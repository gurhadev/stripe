import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState } from "react";

export default function CheckoutForm({amount} : {amount : number}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return (
        <div className="flex items-center justify-center w-full">
          <h1>loading...</h1>
        </div>
    )}
    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/success',
      },
    });

    if (error) {
      setError(error.message ?? 'Payment failed');
      setLoading(false);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="mt-2 px-10 py-3 w-full rounded-xl bg-blue-600 text-white transition-all duration-500 cursor-pointer hover:bg-blue-900 disabled:opacity-50" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}