import React from "react";
import { useLoaderData } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import ProductCard from "../Shared/ProductCard/ProductCard";

const Products = () => {
  const data = useLoaderData();
  const products = data.result;
  useTitle(`${data.name} Brand`);

  return (
    <div className="my-10 mx-7 md:mx-3">
      <h2 className="text-3xl font-semibold">Brand Name: {data.name} </h2>
      <h2 className="text-2xl my-2">Total Product: {products.length} </h2>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
