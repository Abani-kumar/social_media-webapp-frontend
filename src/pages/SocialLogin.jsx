import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { passport } from "../services/api";
import { apiConnector } from "../services/apiConnector";
import { setToken, setUser } from "../redux/slices/auth";
import { useDispatch } from "react-redux";

const SocialLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function login() {
    try {
      const { data } = await apiConnector("GET", passport.USER_DETAILS);
      const { token, user } = data;

      if (!token || !user) {
        toast.error("You have no account with us");
        navigate("/signup");
      } else {
        dispatch(setToken(token));
        dispatch(setUser(user));
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard/feed");
      }
    } catch (error) {
      console.log("social login API ERROR...", error);
    }
  }

  useEffect(() => {
    login();
  }, []);

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <span className="loader"></span>
    </div>
  );
};

export default SocialLogin;
