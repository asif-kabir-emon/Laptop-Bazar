import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/laptop_logo.jpg";
import { AuthContext } from "../../../Contexts/UserContext";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("log out");
        localStorage.setItem("access_token", "");
      })
      .catch((error) => {
        toast.error("log out problem");
      });
  };

  const navbarItems = (
    <>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
      {user?.uid ? (
        <>
          <button
            onClick={handleLogOut}
            className="btn btn-sm btn-outline normal-case"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-16 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact text-lg dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navbarItems}
          </ul>
        </div>
        <Link
          to="/home"
          className="normal-case text-xl flex shrink-0 items-center"
        >
          <img src={logo} alt="" className="h-20 md:h-14" />
          <span className="block">Laptop Bazar</span>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 items-center">
            {navbarItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
