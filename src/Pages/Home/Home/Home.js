import React from "react";
import useTitle from "../../../Hooks/useTitle";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
    </div>
  );
};

export default Home;
