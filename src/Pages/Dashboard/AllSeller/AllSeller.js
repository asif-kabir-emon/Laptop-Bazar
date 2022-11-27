import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import useTitle from "../../../Hooks/useTitle";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import verifiedIcon from "../../../Assets/icons/verified.png";

const AllSeller = () => {
  useTitle("All Seller");
  const account_type = "seller";
  const [deleteUser, SetDeleteUser] = useState(null);
  const [verifyUser, SetVerifyUser] = useState(null);
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4000/users/findUserByType/${account_type}`,
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

  const closeModel = () => {
    SetDeleteUser(null);
    SetVerifyUser(null);
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((req) => req.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount > 0) {
          toast.success("Successfully Delete");
          refetch();
        }
      });
  };

  const handleVerify = (id) => {
    fetch(`http://localhost:4000/users/verifyUser/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((req) => req.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Successfully make user verified");
          refetch();
        }
      });
  };

  return (
    <div className="m-4">
      <h2 className="text-3xl mb-5">All Seller</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Verified</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, index) => (
                <tr key={seller._id}>
                  <th>{index + 1}</th>
                  <td>{seller.name}</td>
                  <td>{seller?.email}</td>
                  <td>
                    {seller?.isVerified ? (
                      <img
                        src={verifiedIcon}
                        alt="verified"
                        className="w-6 ml-4"
                      />
                    ) : (
                      <label
                        onClick={() => {
                          SetVerifyUser(seller);
                        }}
                        htmlFor="confirmation-modal"
                        className="btn btn-xs btn-outline btn-primary rounded-lg normal-case"
                      >
                        Verify Now
                      </label>
                    )}
                  </td>
                  <td>
                    {
                      <label
                        htmlFor="confirmation-modal"
                        onClick={() => {
                          SetDeleteUser(seller);
                        }}
                        className="btn btn-xs border-0 bg-red-500 hover:bg-red-700 rounded-lg normal-case"
                      >
                        Delete
                      </label>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {deleteUser && (
            <ConfirmationModal
              title={`Are you sure you want to delete?`}
              message={`If you delete user with email ${deleteUser.email}, you cannot be undone.`}
              closeModel={closeModel}
              successAction={handleDeleteUser}
              modalData={deleteUser}
            ></ConfirmationModal>
          )}
          {verifyUser && (
            <ConfirmationModal
              title={`Do you verify User with email ${verifyUser.email}`}
              message={``}
              closeModel={closeModel}
              successAction={handleVerify}
              modalData={verifyUser}
            ></ConfirmationModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllSeller;
