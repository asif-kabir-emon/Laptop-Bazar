import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import useTitle from "../../../Hooks/useTitle";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
  useTitle("Payment");
  const booking = useLoaderData();
  const { product_name, price, product_brand } = booking[0];

  return (
    <div className="m-4">
      <h2 className="text-3xl">Payment for {product_name}</h2>
      <p className="text-lg mt-5">
        Please pay <strong>${price}</strong> for your booking product (Product
        name: {product_name}, Brand: {product_brand})
      </p>
      <div className="mt-10 w-96">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking[0]}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
