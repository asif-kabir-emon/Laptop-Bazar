import React from "react";
import verifiedLogo from "../../../Assets/icons/verify.png";
import { useQuery } from "@tanstack/react-query";

const ProductCard = ({ product }) => {
  const { data: user = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4000/users/${product.user_email}`
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="my-10">
      <div
        key={product._id}
        className="card card-compact w-96 bg-base-100 border-2 shadow-xl"
      >
        <figure>
          <img src={product.image} alt={product.product_model} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Model: {product.product_model}</h2>
          <p className="text-lg">
            <b>Brand:</b> {product.brand_name}
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
            <b>Post time:</b> {product.posting_date}
          </p>
          <div className="text-m flex justify-start items-center">
            <span>
              <b>Seller Name:</b> {product.seller_name}
            </span>
            {user[0].isVerified && (
              <img src={verifiedLogo} alt="verified" className="w-4 ml-1" />
            )}
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-md normal-case my-5 px-10">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
