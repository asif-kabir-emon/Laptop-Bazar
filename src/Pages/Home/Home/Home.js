import React from "react";
import useTitle from "../../../Hooks/useTitle";
import Support from "../../Dashboard/Support/Support";
import AdvertiseProducts from "../AdvertiseProducts/AdvertiseProducts";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banner></Banner>
      <div className="my-10 mx-3">
        <h2 className="text-center text-orange-700 text-4xl md:text-5xl">
          Advertise Products
        </h2>
        <AdvertiseProducts></AdvertiseProducts>
      </div>
      <Category></Category>
      <Support></Support>
    </div>
  );
};

export default Home;
