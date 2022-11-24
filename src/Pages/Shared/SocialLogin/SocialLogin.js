import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext, { AuthContext } from "../../../Contexts/UserContext";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { gLogin } = UserContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.state?.pathname || "/";

  const handleGoogleLogin = () => {
    gLogin()
      .then(() => {
        toast.success("successfully login");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
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
