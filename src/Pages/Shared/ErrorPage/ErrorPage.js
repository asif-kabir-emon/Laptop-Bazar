import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="min-h-screen text-center">
      <h2 className="text-red-500 text-2xl pt-20">Something went wrong</h2>
      <p className="text-red-700 my-2">{error.statusText || error.message}</p>
      <p className="text-red-700 text-xl mt-4">
        Please Go to
        <Link to="/home" className="underline ml-2">
          Home Page
        </Link>
        , or
        <Link to="/home" className="underline mx-2">
          Log out
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
