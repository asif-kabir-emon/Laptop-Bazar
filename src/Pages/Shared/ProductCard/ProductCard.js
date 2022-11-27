import React, { useState } from "react";
import verifiedLogo from "../../../Assets/icons/verify.png";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import BookingModal from "../BookingModal/BookingModal";

const ProductCard = ({ product }) => {
  const [bookingItem, setBookingItem] = useState(null);
  const { data: user = [], isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4000/users/${product.user_email}`
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
      <div className="card card-compact w-80 bg-base-100 border-2 shadow-xl">
        <figure>
          <img src={product.image} alt={product.product_model} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Model: {product.product_model}</h2>
          <p className="text-lg">
            <b>Brand:</b> {product.brand_name}
          </p>
          <p className="text-md">
            <b>Display Size:</b> {product.display_size}
          </p>
          <p className="text-md">
            <b>Processor:</b> {product.processor}
          </p>
          <p className="text-md">
            <b>Ram:</b> {product.ram_space}
          </p>
          <p className="text-md">
            <b>Storage:</b> {product.storage_type} {product.storage_space}
          </p>
          <p className="text-md">
            <b>Location:</b> {product.location}
          </p>
          <p className="text-md">
            <b>Resell Price:</b> ${product.selling_price}
          </p>
          <p className="text-md">
            <b>Orginal Price:</b> ${product.buying_price}
          </p>
          <p className="text-md">
            <b>Year of use:</b> {product.purchase_duration}
          </p>
          <p>
            <b>Product condition:</b> {product.product_codition}
          </p>
          <p className="text-md">
            <b>Post date:</b> {product.posting_date}
          </p>
          <div className="text-m flex justify-start items-center">
            <span>
              <b>Seller Name:</b> {product.seller_name}
            </span>
            {user[0]?.isVerified && (
              <img src={verifiedLogo} alt="verified" className="w-4 ml-1" />
            )}
          </div>
          <div className="card-actions justify-center">
            <label
              htmlFor="booking-modal"
              onClick={() => {
                setBookingItem(product);
              }}
              className="btn btn-md normal-case my-5 px-10"
            >
              Book Now
            </label>
          </div>
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

export default ProductCard;
