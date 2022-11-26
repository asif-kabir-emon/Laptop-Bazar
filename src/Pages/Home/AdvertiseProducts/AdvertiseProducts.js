import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";

const AdvertiseProducts = () => {
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

  return (
    <div className="my-10">
      <div className="flex justify-center md:justify-start">
        <div className="grid lg:grid-3 gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="card card-compact w-96 bg-base-100 border-2 shadow-xl"
            >
              <figure>
                <img src={product.image} alt={product.product_model} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Model: {product.product_model}{" "}
                  {product.isAvailable ? (
                    <span className="text-xs ml-3 px-2 py-1 bg-green-700 text-white rounded-xl">
                      Available
                    </span>
                  ) : (
                    <span className="text-xs ml-3 px-2 py-1 bg-red-700 text-white rounded-xl">
                      Sold
                    </span>
                  )}
                </h2>
                <div className="flex text-lg justify-between item-center">
                  <span>Brand: {product.brand_name}</span>
                  <span>Condition: {product.product_codition}</span>
                </div>
                <div className="card-actions justify-center">
                  <button className="btn btn-info normal-case">
                    See in Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertiseProducts;
