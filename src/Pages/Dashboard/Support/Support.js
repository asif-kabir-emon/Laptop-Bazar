import React from "react";
import icon1 from "../../../Assets/icons/customer-support-1.png";
import icon2 from "../../../Assets/icons/customer-support-2.png";

const Support = () => {
  const supportItem = [
    {
      id: "1",
      title: "technical support",
      icon: icon1,
    },
    {
      id: "2",
      title: "24/7 hotline",
      icon: icon2,
    },
  ];
  return (
    <div className="my-10 mx-3">
      <h2 className="text-orange-600 text-center text-4xl md:text-5xl">
        Our Services
      </h2>
      <p className="text-center text-lg my-3">
        We support you after purchase a second-hand laptop until 6 months.
        <br />
        Our help you if there any types problem with purchasing laptop by giving
        technical services from sellers.
      </p>
      <div className="my-5 flex flex-wrap justify-center">
        {supportItem.map((item) => (
          <div
            key={item.id}
            className="card card-compact mx-5 my-5 w-52 py-3 bg-base-100 border-2 shadow-sm"
          >
            <figure className="px-10 ">
              <img src={item.icon} alt={item.title} />
            </figure>
            <div className="card-body">
              <h2 className="text-center mt-2 text-xl font-bold">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
