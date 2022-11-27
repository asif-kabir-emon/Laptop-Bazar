import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import BookingModal from "../../Shared/BookingModal/BookingModal";
import ProductCard from "../../Shared/ProductCard/ProductCard";

const AdvertiseProducts = () => {
  const [bookingItem, setBookingItem] = useState(null);
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://old-laptop-buy-sell-server.vercel.app/products/Advertise`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const closeModal = () => {
    setBookingItem(null);
  };

  return (
    <div className="my-10">
      <div className="flex justify-center mx-auto">
        <div className="grid lg:grid-cols-3 gap-7">
          {products.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      </div>
      {products.length === 0 && (
        <p className="text-center text-xl mt-5 mb-20">
          No Advertise Product available
        </p>
      )}
      {bookingItem && (
        <BookingModal
          title={`Book ${bookingItem.product_model}`}
          message={`If you want to purchase this product, please fill this form and submit.`}
          closeModel={closeModal}
          modalData={bookingItem}
        ></BookingModal>
      )}
    </div>
  );
};

export default AdvertiseProducts;
