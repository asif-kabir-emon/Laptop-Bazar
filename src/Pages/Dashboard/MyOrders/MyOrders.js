import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../Contexts/UserContext";
import useTitle from "../../../Hooks/useTitle";

const MyOrders = () => {
  useTitle("My Orders");
  const { user } = useContext(AuthContext);
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(
        `https://old-laptop-buy-sell-server.vercel.app/bookings/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        }
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
      <h2 className="text-4xl mb-4">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={order.product_image} alt="Product_Image" />
                    </div>
                  </div>
                </td>
                <td>{order.product_name}</td>
                <td>{order.product_brand}</td>
                <td>${order.price}</td>
                <td>
                  {order.isPaid ? (
                    <span className="text-green-500 rounded">Paid</span>
                  ) : (
                    <Link to={`/dashboard/payment/${order._id}`}>
                      <button className="btn btn-sm btn-primary">
                        Pay Now
                      </button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-center text-3xl my-10 md:my-16">
            No order Makes Yet
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
