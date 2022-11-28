import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import useTitle from "../../../Hooks/useTitle";

const ReportedItem = () => {
  useTitle("Reported Items");

  //   const { data: reportedProduct, isLoading } = useQuery({
  //     queryKey: ["reportedProduct"],
  //     queryFn: async () => {
  //       const res = await fetch(``);
  //       const data = await res.json();
  //       return data;
  //     },
  //   });

  //   if (isLoading) {
  //     return <LoadingSpinner></LoadingSpinner>;
  //   }

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
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                <td>
                  <label className="btn btn-xs btn-error text-white normal-case">
                    Delete Item
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportedItem;
