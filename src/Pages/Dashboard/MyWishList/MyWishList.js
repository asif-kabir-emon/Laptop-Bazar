import React from "react";

const MyWishList = () => {
  return (
    <div className="m-4">
      <h2 className="text-3xl mb-6">My Wish List</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Purchase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishList;
