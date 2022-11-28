import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import useTitle from "../../../Hooks/useTitle";
import ReportedItemOne from "./ReportedItemOne";

const ReportedItem = () => {
  useTitle("Reported Items");

  const {
    data: reportedProduct,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedProduct"],
    queryFn: async () => {
      const res = await fetch(
        `https://old-laptop-buy-sell-server.vercel.app/reports`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="m-4">
      <h2 className="text-3xl mb-5">Reported Items</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportedProduct.map((product, index) => (
                <ReportedItemOne
                  key={product._id}
                  reportItem={product}
                  index={index}
                  refetch={refetch}
                ></ReportedItemOne>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportedItem;
