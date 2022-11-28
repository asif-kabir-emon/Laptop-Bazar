import React, { useState } from "react";
import verifiedLogo from "../../../Assets/icons/verify.png";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import BookingModal from "../BookingModal/BookingModal";
import reportIcon from "../../../Assets/icons/sad-face.png";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const [bookingItem, setBookingItem] = useState(null);
  const [reportItem, setReportItem] = useState(null);
  const {
    data: user = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", product.user_email],
    queryFn: async () => {
      const res = await fetch(
        `https://old-laptop-buy-sell-server.vercel.app/users/${product.user_email}`
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
    setReportItem(null);
  };

  const handleReportProduct = (id) => {
    const reportedProduct = {};
    // fetch(`https://old-laptop-buy-sell-server.vercel.app/products/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     authorization: `bearer ${localStorage.getItem("access_token")}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     if (data.deletedCount > 0) {
    //       toast.success("successfully reported");
    //       refetch();
    //       closeModal();
    //     }
    //   });
  };

  return (
    <div>
      <div className="card card-compact bg-base-100 border-2 shadow-xl">
        <figure>
          <img
            src={product.image}
            alt={product.product_model}
            className="h-96"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title items-start">
            <span>Model: {product.product_model}</span>
            {/* {product.isBooked ? (
              <span className="text-xs ml-3 px-2 py-1 bg-red-700 text-white rounded-xl">
                Booked
              </span>
            ) : (
              <span className="text-xs ml-3 px-2 py-1 bg-green-700 text-white rounded-xl">
                Available
              </span>
            )} */}
            {product.isBooked === false && (
              <span className="bg-green-500 px-2 py-1 text-xs text-white rounded-xl">
                Available
              </span>
            )}
            {product.isBooked === true && product.isSold === false && (
              <span className="bg-orange-500 px-2 py-1 text-xs text-white rounded-xl">
                Booked
              </span>
            )}
            {product.isBooked === true && product.isSold === true && (
              <span className="bg-red-500 px-2 py-1 text-xs text-white rounded-xl">
                Sold
              </span>
            )}
          </h2>
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
            {user[0]?.isVerified ? (
              <img src={verifiedLogo} alt="verified" className="w-4 ml-1" />
            ) : (
              <span></span>
            )}
          </div>
          <div className="card-actions justify-center">
            <label
              htmlFor="booking-modal"
              onClick={() => {
                setBookingItem(product);
              }}
              className={`btn btn-md normal-case my-5 px-10 ${
                product.isBooked && "btn-disabled "
              }`}
            >
              Book Now
            </label>
            <label
              htmlFor="confirmation-modal"
              onClick={() => {
                setReportItem(product);
              }}
              className="btn bg-white hover:bg-red-400 btn-md normal-case my-5"
            >
              <img src={reportIcon} alt="" className="w-6" />
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
      {reportItem && (
        <ConfirmationModal
          title={`Are you sure report about this product`}
          message={``}
          closeModel={closeModal}
          successAction={handleReportProduct}
          modalData={reportItem}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ProductCard;
