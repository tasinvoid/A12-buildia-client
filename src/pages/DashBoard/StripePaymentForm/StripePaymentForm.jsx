import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_public_key);

const StripePaymentForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripePaymentForm;
