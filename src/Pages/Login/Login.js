import React, { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/UserContext";
import useTitle from "../../Hooks/useTitle";
import loginImage from "../../Assets/images/login.webp";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  useTitle("Login");
  const { setAccountType, epLogin } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    epLogin(data.email, data.password)
      .then(() => {
        setErrorMessage("");
        fetch(
          `https://old-laptop-buy-sell-server.vercel.app/users/${data.email}`
        )
          .then((res) => res.json())
          .then((getData) => {
            // console.log(getData[0].account_type);
            setAccountType(getData[0].account_type);
          });
        getToken(data.email);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error("failed to login");
      });
  };

  const getToken = (email) => {
    fetch(`https://old-laptop-buy-sell-server.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("access_token", data.accessToken);
        navigate(from, { replace: true });
        toast.success("successfully login");
      });
  };

  return (
    <div>
      <div className="hero py-10 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex justify-center">
            <img src={loginImage} alt="login" className="w-52 md:w-96" />
          </div>
          <div className="card shadow-xl border-2 bg-base-100 mx-5 mt-2">
            <div className="card-body md:w-96">
              <p className="text-center text-3xl md:text-4xl mb-2">Login</p>
              <p className="text-center text-sm text-red-500">{errorMessage}</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Enter Your Email"
                    className="input input-bordered w-full"
                  />
                  {errors.email && (
                    <span className="mt-2 text-red-500">
                      Email is required to login
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="Enter Your Password"
                    className="input input-bordered w-full"
                  />
                  {errors.password && (
                    <span className="mt-2 text-red-500">
                      Password is required to login
                    </span>
                  )}
                </div>
                <div className="form-control mt-5">
                  <input type="submit" value="Login" className="btn" />
                </div>
              </form>
              <p className="text-sm text-center mt-2">
                <span> New to Laptop Bazar?</span>
                <Link to="/register" className="text-primary mx-1">
                  Create new accoount
                </Link>
              </p>
              <div className="divider">OR</div>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
