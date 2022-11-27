import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Contexts/UserContext";
import NavBar from "../Pages/Shared/NavBar/NavBar";

const DashboardLayout = () => {
  const { accountType } = useContext(AuthContext);
  return (
    <div className="mx-auto min-h-screen bg-slate-100">
      <NavBar></NavBar>
      <div>
        <div className="drawer drawer-mobile">
          <input
            id="dashboard-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content flex flex-col mx-3">
            <Outlet></Outlet>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="dashboard-drawer"
              className="drawer-overlay"
            ></label>
            <ul className="menu pl-4 w-60 bg-white hidden md:block text-base-content">
              {accountType === "buyer" && (
                <>
                  <li>
                    <Link to="/dashboard/myOrders">My Orders</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/myWishList">My Wish List</Link>
                  </li>
                </>
              )}
              {accountType === "seller" && (
                <>
                  <li>
                    <Link to="/dashboard/myProducts">My Products</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/MyBuyers">My Buyers</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addProduct">Add Product</Link>
                  </li>
                </>
              )}
              {accountType === "admin" && (
                <>
                  <li>
                    <Link to="/dashboard/allSeller">All Sellers</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/allBuyer">All Buyers</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
