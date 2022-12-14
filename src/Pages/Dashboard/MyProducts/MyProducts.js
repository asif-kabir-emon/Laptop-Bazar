import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../Contexts/UserContext";
import useTitle from "../../../Hooks/useTitle";

const MyProducts = () => {
  useTitle("My Product");
  const { user } = useContext(AuthContext);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [advertiseProduct, setAdvertiseProduct] = useState(null);
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://old-laptop-buy-sell-server.vercel.app/products/${user?.email}`,
        {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const closeModel = () => {
    setDeleteProduct(null);
    setAdvertiseProduct(null);
  };

  const handleDeleteProduct = (id) => {
    fetch(`https://old-laptop-buy-sell-server.vercel.app/products/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount > 0) {
          toast.success("Successfully Delete");
          refetch();
          closeModel();
        }
      });
  };

  const handleAdvertiseProduct = (id) => {
    fetch(
      `https://old-laptop-buy-sell-server.vercel.app/products/advertise/${id}`,
      {
        method: "PATCH",
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Successfully Advertise");
          refetch();
          closeModel();
        }
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl mb-4">My Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Brand Name</th>
              <th>Selling Price</th>
              <th>Availabe</th>
              <th>Advertise</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <th>{product.product_model}</th>
                <td>{product.brand_name}</td>
                <td>${product.selling_price}</td>
                <td>
                  {product.isBooked === false && (
                    <span className="bg-green-500 px-2 py-1 rounded-lg text-sm">
                      Available
                    </span>
                  )}
                  {product.isBooked === true && product.isSold === false && (
                    <span className="bg-orange-500 px-2 py-1 rounded-lg text-sm">
                      Booked
                    </span>
                  )}
                  {product.isBooked === true && product.isSold === true && (
                    <span className="bg-red-500 px-2 py-1 rounded-lg text-sm">
                      Sold
                    </span>
                  )}
                </td>
                <td>
                  {product.isAdertise === false && product.isBooked === false && (
                    <label
                      htmlFor="confirmation-modal"
                      onClick={() => {
                        setAdvertiseProduct(product);
                      }}
                      className="btn btn-xs btn-outline btn-secondary rounded-lg normal-case"
                    >
                      Advertise
                    </label>
                  )}
                  {product.isAdertise === true &&
                    product.isBooked === false && (
                      <span className="bg-green-500 px-2 py-1 rounded-lg text-sm">
                        Advertised
                      </span>
                    )}
                  {product.isBooked === true && <span></span>}
                </td>
                <td>
                  {product._id && (
                    <label
                      htmlFor="confirmation-modal"
                      onClick={() => {
                        setDeleteProduct(product);
                      }}
                      className="btn btn-xs border-0 bg-red-500 hover:bg-red-700 rounded-lg normal-case"
                    >
                      Detete
                    </label>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {deleteProduct && (
          <ConfirmationModal
            title={`Are you sure you want to delete?`}
            message={`If you delete product named ${deleteProduct.product_model} (brand - ${deleteProduct.brand_name}), you cannot be undone`}
            closeModel={closeModel}
            successAction={handleDeleteProduct}
            modalData={deleteProduct}
          ></ConfirmationModal>
        )}
        {advertiseProduct && (
          <ConfirmationModal
            title={`Are you want to advertise your product?`}
            message={``}
            closeModel={closeModel}
            successAction={handleAdvertiseProduct}
            modalData={advertiseProduct}
          ></ConfirmationModal>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
