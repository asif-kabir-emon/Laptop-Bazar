import { createBrowserRouter } from "react-router-dom";
import MainLayout1 from "../../Layout/MainLayout1";
import Home from "../../Pages/Home/Home/Home";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Blogs from "../../Pages/Blogs/Blogs";
import Page404 from "../../Pages/Page404/Page404";
import MainLayout2 from "../../Layout/MainLayout2";
import DashboardLayout from "../../Layout/DashboardLayout";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import AllSeller from "../../Pages/Dashboard/AllSeller/AllSeller";
import AllBuyer from "../../Pages/Dashboard/AllBuyer/AllBuyer";
import Products from "../../Pages/Products/Products";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import MyBuyers from "../../Pages/Dashboard/MyBuyers/MyBuyers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ReportedItem from "../../Pages/Dashboard/ReportedItem/ReportedItem";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout1></MainLayout1>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <Products></Products>
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          fetch(
            `https://old-laptop-buy-sell-server.vercel.app/products/category/${params.id}`
          ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/myOrders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/myProducts",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/dashboard/myBuyers",
        element: <MyBuyers></MyBuyers>,
      },
      {
        path: "/dashboard/addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/allSeller",
        element: <AllSeller></AllSeller>,
      },
      {
        path: "/dashboard/allBuyer",
        element: <AllBuyer></AllBuyer>,
      },
      {
        path: "/dashboard/reportedItem",
        element: <ReportedItem></ReportedItem>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: async ({ params }) =>
          fetch(
            `https://old-laptop-buy-sell-server.vercel.app/bookings/search_by_id/${params.id}`
          ),
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout2></MainLayout2>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element: <Page404></Page404>,
  },
]);
