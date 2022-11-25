import React from "react";

const BannerItem = ({ slide }) => {
  const { id, image, prev, next } = slide;
  return (
    <div id={`slide${id}`} className="carousel-item relative w-full">
      <div className="carousel-img">
        <img src={image} className="w-full rounded-xl" alt="" />
      </div>
      <div className="absolute flex transform -translate-y-1/2 left-12 md:left-20 top-1/3 md:top-1/4">
        <h1 className="text-3xl md:text-6xl font-bold text-white">
          Sell / Buy Used
          <span className="block pt-2">Laptop</span>
        </h1>
      </div>
      <div className="hidden absolute md:flex transform -translate-y-1/2 w-2/5 left-20 top-1/2">
        <p className="text-xl text-white">
          Laptop Bazar is the well-known platform to buy and sell used Laptop in
          a great deal.
        </p>
      </div>
      <div className="hidden absolute md:flex justify-start transform -translate-y-1/2 w-2/5 left-20 top-3/4">
        <button className="btn btn-outline btn-warning">
          Read More About Us
        </button>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-1/3 md:left-5 md:right-5 bottom-0">
        <a href={`#slide${prev}`} className="btn btn-circle mr-3">
          ❮
        </a>
        <a href={`#slide${next}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
};

export default BannerItem;
