import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/UserContext";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BookingModal = ({ title, message, closeModel, modalData }) => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const bookingInfo = {
      buyer_name: user?.displayName,
      buyer_email: user?.email,
      seller_email: modalData.user_email,
      product_image: modalData.image,
      product_id: modalData._id,
      product_name: modalData.product_model,
      product_brand: modalData.brand_name,
      price: modalData.selling_price,
      mobile: data.mobile,
      meeting_place: data.meeting_place,
      isPaid: false,
    };
    console.log(bookingInfo);

    fetch(`http://localhost:4000/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("succesfully booked");
          closeModel();
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue={user?.displayName}
              disabled
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue={user?.email}
              disabled
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Item Name (that you gonna booking)
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue={modalData?.product_model}
              disabled
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Brand Name (that you gonna booking)
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue={modalData?.brand_name}
              disabled
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue={`$ ${modalData?.selling_price}`}
              disabled
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Mobile Number</span>
              </label>
              <input
                {...register("mobile", {
                  required: "Contact Number is Required",
                  minLength: {
                    value: 10,
                    message: "Contact Number contains at least 10 digit",
                  },
                  pattern: {
                    value: /0(?=.*[0-9])/i,
                    message: "Mobile Number start with 0",
                  },
                })}
                type="tel"
                placeholder="Enter Your Mobile Number"
                className="input input-bordered input-primary w-full"
              />
              {errors.mobile && (
                <span className="mt-2 text-red-500">
                  {errors.mobile?.message}
                </span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Meeting Place (for meeting with seller)
                </span>
              </label>
              <input
                {...register("meeting_place", {
                  required: true,
                  minLength: 6,
                })}
                type="text"
                placeholder="Enter Meeting Place"
                className="input input-bordered input-primary w-full"
              />
              {errors.meeting_place && (
                <span className="mt-2 text-red-500">
                  Meeting Place (more than 6 characters) is Required
                </span>
              )}
            </div>
            <div className="modal-action">
              <input type="submit" value="submit" className="btn px-8" />
              <button onClick={closeModel} className="btn btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
