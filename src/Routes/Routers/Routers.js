import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
  },
]);
