import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import verifiedLogo from "../../../Assets/icons/verify.png";
import BookingModal from "../../Shared/BookingModal/BookingModal";
import ProductCard from "../../Shared/ProductCard/ProductCard";

const AdvertiseProducts = () => {
  const [bookingItem, setBookingItem] = useState(null);
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/products/Advertise`);
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
      <div className="flex justify-center md:justify-start">
        <div className="grid lg:grid-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      </div>
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
