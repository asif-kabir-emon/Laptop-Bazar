import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import useTitle from "../../../Hooks/useTitle";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Contexts/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const AddProduct = () => {
  useTitle("Add Product");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/categories");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const imageHostKey = process.env.REACT_APP_imageHostKey;

  const onSubmit = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const product = {
            user_email: user?.email,
            seller_name: user?.displayName,
            posting_date: format(new Date(), "PP"),
            brand_name: data.brand_name.split(" ")[0],
            category_id: data.brand_name.split(" ")[1],
            product_model: data.product_model,
            os: data.os,
            display_size: data.display_size,
            processor: data.processor,
            graphics: data.graphics,
            ram_space: data.ram_space,
            storage_type: data.storage_type,
            storage_space: data.storage_space,
            purchase_duration: data.purchase_duration,
            buying_price: data.buying_price,
            selling_price: data.selling_price,
            product_codition: data.product_codition,
            mobile: data.mobile,
            location: data.location,
            description: data.description,
            image: imgData.data.url,
            isAdertise: false,
            isAvailable: true,
            isBooked: false,
          };
          console.log(product);

          fetch("http://localhost:4000/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              if (data.acknowledged) {
                toast.success("successfully added your product for selling");
                navigate("/dashboard/myProducts", { replace: true });
              }
            });
        }
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl mb-4">Add Product</h2>
      <div className="md:w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Brand Name</span>
            </label>
            <select
              {...register("brand_name", { required: true })}
              className="select select-primary w-full"
            >
              {categories.map((category) => (
                <option
                  key={category._id}
                  value={`${category.name} ${category._id}`}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Model</span>
            </label>
            <input
              {...register("product_model", { required: true })}
              type="text"
              placeholder="Enter Product Name / Model"
              className="input input-bordered input-primary w-full"
            />
            {errors.product_model && (
              <span className="mt-2 text-red-500">
                Valid Product Name is Required
              </span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Operating System</span>
            </label>
            <select
              {...register("os", { required: true })}
              className="select select-primary w-full"
            >
              <option value="windows">Windows</option>
              <option value="linux">Linux</option>
              <option value="mac os">Mac os</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Display Size</span>
            </label>
            <select
              {...register("display_size", { required: true })}
              className="select select-primary w-full"
            >
              <option value="13">13 inchi</option>
              <option value="14">14 inchi</option>
              <option value="15">15 inchi</option>
              <option value="16">16 inchi</option>
              <option value="17">17 inchi</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Processor</span>
            </label>
            <input
              {...register("processor", { required: true, minLength: 6 })}
              type="text"
              placeholder="Enter Processor Model"
              className="input input-bordered input-primary w-full"
            />
            {errors.processor && (
              <span className="mt-2 text-red-500">Processor is Required</span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Graphics</span>
            </label>
            <input
              {...register("graphics", { required: true, minLength: 6 })}
              type="text"
              placeholder="Enter Graphics Model"
              className="input input-bordered input-primary w-full"
            />
            {errors.graphics && (
              <span className="mt-2 text-red-500">Graphics is Required</span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Ram (in GB)</span>
            </label>
            <select
              {...register("ram_space", { required: true })}
              className="select select-primary w-full"
            >
              <option value="4 GB">4 GB</option>
              <option value="6 GB">6 GB</option>
              <option value="8 GB">8 GB</option>
              <option value="12 GB">12 GB</option>
              <option value="16 GB">16 GB</option>
              <option value="24 GB">24 GB</option>
              <option value="36 GB">36 GB</option>
              <option value="48 GB">48 GB</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Storage Type</span>
            </label>
            <select
              {...register("storage_type", { required: true })}
              className="select select-primary w-full"
            >
              <option value="HD">HD</option>
              <option value="SSD">SSD</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Storage (in GB)</span>
            </label>
            <select
              {...register("storage_space", { required: true })}
              className="select select-primary w-full"
            >
              <option value="128 GB">128 GB</option>
              <option value="256 GB">256 GB</option>
              <option value="512 GB">512 GB</option>
              <option value="1 TB">1 TB</option>
              <option value="2 TB">2 TB</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Duration of Purchase</span>
            </label>
            <input
              {...register("purchase_duration", {
                required: true,
                minLength: 1,
              })}
              type="text"
              placeholder="Enter Duration of Purchase (in Year)"
              className="input input-bordered input-primary w-full"
            />
            {errors.purchase_duration && (
              <span className="mt-2 text-red-500">
                Duration Purchase (in Year) is Required
              </span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Buying Price</span>
            </label>
            <input
              {...register("buying_price", { required: true, minLength: 1 })}
              type="text"
              placeholder="Enter Buying Price (in dollor)"
              className="input input-bordered input-primary w-full"
            />
            {errors.buying_price && (
              <span className="mt-2 text-red-500">
                Buying Price is Required
              </span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Selling Price</span>
            </label>
            <input
              {...register("selling_price", { required: true, minLength: 1 })}
              type="text"
              placeholder="Enter Selling Price (in dollor)"
              className="input input-bordered input-primary w-full"
            />
            {errors.selling_price && (
              <span className="mt-2 text-red-500">
                Selling Price is Required
              </span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Condition of Product</span>
            </label>
            <select
              {...register("product_codition", { required: true })}
              className="select select-primary w-full"
            >
              <option value="fair">Fair</option>
              <option value="good">Good</option>
              <option value="excellent">Excellent</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Photo</span>
            </label>
            <input
              {...register("img", { required: true })}
              type="file"
              placeholder="Upload Doctor Photo"
              className="file-input file-input-bordered w-full"
            />
            {errors.file && errors.file.type === "required" && (
              <span className="text-xs text-red-500 my-2">
                Please Select Your Image
              </span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Mobile Number</span>
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
              placeholder="Enter Phone Number"
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
              <span className="label-text">Meeting Location</span>
            </label>
            <input
              {...register("location", { required: true, minLength: 6 })}
              type="text"
              placeholder="Enter Your Location (address)"
              className="input input-bordered input-primary w-full"
            />
            {errors.location && (
              <span className="mt-2 text-red-500">Location is Required</span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description", { required: true, minLength: 10 })}
              type="text"
              placeholder="Write Description about Product"
              className="textarea textarea-bordered textarea-primary h-24 w-full"
            ></textarea>
            {errors.description && (
              <span className="mt-2 text-red-500">
                Description is Required (minimum in 20 characters)
              </span>
            )}
          </div>

          <div className="form-control mt-5">
            <input type="submit" value="Submit" className="btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
