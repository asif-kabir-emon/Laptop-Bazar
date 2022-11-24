import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import NavBar from "../Pages/Shared/NavBar/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer className="m-5"></Footer>
    </div>
  );
};

export default MainLayout;
