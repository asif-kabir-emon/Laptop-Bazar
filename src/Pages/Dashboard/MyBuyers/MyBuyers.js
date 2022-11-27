import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../Contexts/UserContext";
import useTitle from "../../../Hooks/useTitle";

const MyBuyers = () => {
  useTitle("My Buyer");
  const { user } = useContext(AuthContext);
  const email = user.email;
  const { data: buyers = [], isLoading } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/find-buyers/${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="m-4">
      <h2 className="text-4xl mb-5">My Buyers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, index) => (
              <tr key={buyer._id}>
                <th>{index + 1}</th>
                <td>{buyer.buyer_name}</td>
                <td>{buyer.meeting_place}</td>
                <td>{buyer.buyer_email}</td>
                <td>{buyer.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {buyers.length === 0 && (
        <p className="text-center text-2xl my-20">No buyers</p>
      )}
    </div>
  );
};

export default MyBuyers;
