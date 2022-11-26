import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";

const Category = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/categories`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="my-10">
      <h2 className="text-center text-4xl md:text-5xl text-orange-500">
        Categoires
      </h2>
      <p className="text-center text-lg my-2">
        Please Choice a Laptop Brand to see.
      </p>
      <div className="flex justify-center flex-wrap">
        <div className="card card-compact w-52 border-2 mx-2 my-2">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center">All</h2>
          </div>
        </div>
        {categories.map((category) => (
          <div
            key={category._id}
            className="card card-compact w-52 border-2 mx-2 my-2"
          >
            <div className="card-body">
              <h2 className="text-3xl font-bold text-center">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
