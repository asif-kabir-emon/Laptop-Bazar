import React from "react";
import errorImage from "../../Assets/images/404.webp";

const Page404 = () => {
  return (
    <div className="min-h-screen pt-32 text-center">
      <div className="flex justify-center mx-10">
        <img src={errorImage} alt="404 error" />
      </div>
      <p className="text-4xl pt-10 text-red-500 font-bold">Page Not Found</p>
    </div>
  );
};

export default Page404;
