import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/UserContext";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { setAccountType, gLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.state?.pathname || "/";

  const handleGoogleLogin = () => {
    gLogin()
      .then((result) => {
        const user = result.user;
        setAccountType("buyer");
        creatUser(user.email, user.displayName);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const creatUser = (email, name) => {
    const user = {
      email: email,
      name: name,
      account_type: "buyer",
      isAdmin: false,
      isVerified: false,
    };
    fetch(`http://localhost:4000/userFindCreate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getToken(email);
      });
  };

  const getToken = (email) => {
    fetch(`http://localhost:4000/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("access_token", data.accessToken);
        navigate(from, { replace: true });
        toast.success("successfully login");
      });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn btn-outline btn-success w-full"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default SocialLogin;
