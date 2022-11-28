import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const ReportedItemOne = ({ reportItem, index, refetch }) => {
  const [deleteProduct, setDeleteProduct] = useState(null);
  const { data: product = [], isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await fetch(
        `https://old-laptop-buy-sell-server.vercel.app/products/useID/${reportItem.product_id}`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const closeModal = () => {
    setDeleteProduct(null);
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
          closeModal();
        }
      });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={product.image} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
      </td>
      <td>{product.product_model}</td>
      <td>
        <label
          htmlFor="confirmation-modal"
          onClick={() => {
            setDeleteProduct(product);
          }}
          className="btn btn-xs btn-error text-white normal-case"
        >
          Delete Item
        </label>
      </td>
      {deleteProduct && (
        <ConfirmationModal
          title={`Are you sure you want to delete the product?`}
          message={``}
          closeModel={closeModal}
          successAction={handleDeleteProduct}
          modalData={deleteProduct}
        ></ConfirmationModal>
      )}
    </tr>
  );
};

export default ReportedItemOne;
