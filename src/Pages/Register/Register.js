import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/UserContext";
import useTitle from "../../Hooks/useTitle";
import signupImage from "../../Assets/images/signUp.webp";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Register = () => {
  useTitle("Sign Up");
  const { registerUser, updateUser, setAccountType } = useContext(AuthContext);
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
    const user = {
      email: data.email,
      name: data.name,
      account_type: data.type,
      isAdmin: false,
    };

    registerUser(data.email, data.password)
      .then(() => {
        setErrorMessage("");
        updateUserInfo(data.name);
        setAccountType(data.type);
        creatUser(user);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error("failed to register");
      });
  };

  const updateUserInfo = (name) => {
    updateUser({ displayName: name })
      .then(() => {
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  };

  const creatUser = (user) => {
    fetch(`http://localhost:4000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          getToken(user.email);
        }
      });
  };

  const getToken = (email) => {
    fetch(`http://localhost:4000/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("access_token", data.accessToken);
          navigate(from, { replace: true });
          toast.success("successfully register");
        }
      });
  };

  return (
    <div>
      <div className="hero py-10 lg:py-18">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex justify-center">
            <img src={signupImage} alt="sign up" className="w-52 md:w-96" />
          </div>
          <div className="card shadow-xl border-2 bg-base-100 mx-5 mt-5">
            <div className="card-body md:w-96">
              <p className="text-center text-3xl md:text-4xl mb-2">Register</p>
              <p className="text-center text-sm text-red-500">{errorMessage}</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Enter Your Name"
                    className="input input-bordered w-full"
                  />
                  {errors.name && (
                    <span className="mt-2 text-red-500">
                      Name is required to Register
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Account Type</span>
                  </label>
                  <select
                    {...register("type", { required: true })}
                    className="input input-bordered w-full"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
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
                      Valid email is required to register
                    </span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: "Password at least in 6 characters",
                      minLength: {
                        value: 6,
                        message: "Password must be 6 chararcter or longer",
                      },
                      pattern: {
                        value:
                          /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/i,
                        message: "Password must be strong",
                      },
                    })}
                    type="password"
                    placeholder="Enter Your Password"
                    className="input input-bordered w-full"
                  />
                  {errors.password && (
                    <p role="alert" className="my-1 text-sm text-red-600">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
                <div className="form-control mt-5">
                  <input type="submit" value="Sign Up" className="btn" />
                </div>
              </form>
              <p className="text-sm text-center mt-2">
                <span> Already have an account?</span>
                <Link to="/login" className="text-primary mx-1">
                  Please Log in
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

export default Register;
