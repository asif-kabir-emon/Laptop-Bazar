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
          fetch(`http://localhost:4000/products/category/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/myProducts",
        element: <MyProducts></MyProducts>,
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
