import React from "react";
import img1 from "../../../Assets/images/laptop1.webp";
import img2 from "../../../Assets/images/laptop2.webp";
import img3 from "../../../Assets/images/laptop3.webp";
import BannerItem from "../BannerItem/BannerItem";
import "./Banner.css";

const bannerData = [
  {
    image: img1,
    prev: 3,
    id: 1,
    next: 2,
  },
  {
    image: img2,
    prev: 1,
    id: 2,
    next: 3,
  },
  {
    image: img3,
    prev: 2,
    id: 3,
    next: 1,
  },
];

const Banner = () => {
  return (
    <div className="carousel m-3">
      {bannerData.map((slide) => (
        <BannerItem key={slide.id} slide={slide}></BannerItem>
      ))}
    </div>
  );
};

export default Banner;
