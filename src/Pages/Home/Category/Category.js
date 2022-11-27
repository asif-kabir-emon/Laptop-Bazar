import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
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
        <Link to={`/category/1`}>
          <button>
            <div className="card card-compact w-52 border-2 shadow-md mx-2 my-2">
              <div className="card-body">
                <h2 className="text-3xl font-bold text-center">All</h2>
              </div>
            </div>
          </button>
        </Link>
        {categories.map((category) => (
          <Link to={`/category/${category._id}`} key={category._id}>
            <button>
              <div className="card card-compact w-52 border-2 shadow-md mx-2 my-2">
                <div className="card-body">
                  <h2 className="text-3xl font-bold text-center">
                    {category.name}
                  </h2>
                </div>
              </div>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
