import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import googleLogo from "../assets/logo/7123025_logo_google_g_icon.png";
import githubLogo from "../assets/logo/github-mark-white.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authOpr";
import { useDispatch } from "react-redux";
import { passport } from "../services/api";
import {tokenValidation} from '../utils/tokenValidation'

const Login = () => {
  

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate=useNavigate();
  const token=localStorage.getItem("token");
  useEffect(()=>{
    tokenValidation();
    if(token){
      navigate("/dashboard/feed")
    }
  },[])

  const onsubmit = (data) => {
    dispatch(login(data,navigate));
  };

  const google = () => {
    window.open(passport.GOOGLE_LOGIN, "_self");
  };
  const github = () => {
    window.open(passport.GITHUB_LOGIN, "_self");
  };
  return (
    <div>
      <div className="w-[100vw] text-white ">
        <div className="border-b-[1px] border-b-richblack-100  bg-richblack-1000 p-4 sticky top-0 z-10">
          <div className="w-[90%] mx-auto mb-1 mt-2 flex justify-between ">
            <div className="font-bold lg:font-extrabold lg:text-3xl">Login</div>
            <Link
              to="/register"
              className="font-semibold border-[1px] border-richblack-100 p-3 hidden lg:block"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="mt-6 mb-8">
          <div className="font-bold text-3xl lg:font-extrabold lg:text-5xl text-center">
            Login
          </div>
          <p className="font-extralight text-center mt-2">
            Login to access your account
          </p>
        </div>
        <div className="w-[60vw] -sm:w-[75vw] mx-auto">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col items-center justify-center w-full "
          >
            <div className=" flex flex-col w-full ">
              <label htmlFor="email">Username or email</label>
              <input
                className=" bg-richblack-900 border-[1.5px] w-full border-richblack-5 mx-auto py-2 px-1 focus:bg-richblack-900"
                id="email"
                placeholder="Enter a username or email..."
                type="text"
                name="email"
                {...register("email", {
                  required: "Email is required.",
                })}
              />
              {errors.email && <p>{errors.email?.message}</p>}
            </div>
            <div className=" flex flex-col mt-2 w-full">
              <label htmlFor="password">Password</label>
              <input
                className=" bg-richblack-900 border-[1.5px] border-richblack-5 w-full mx-auto py-2 px-1 focus:bg-richblack-900"
                id="password"
                placeholder="Enter password..."
                type="password"
                name="password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "password have atleast 6 character",
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div className="mt-3 flex mr-auto">
              <label className="container">
                Remember me
                <input type="checkbox" />
                <span className="mark"></span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 bg-pure-greys-1000 w-full px-4 py-2 font-medium text-white border-[1px] border-white cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>

        <div className="flex items-center mt-4 mb-4 justify-center">
          <div className="w-[10vw] border-t border-gray-500"></div>
          <div className="mx-4">OR</div>
          <div className="w-[10vw] border-t border-gray-500"></div>
        </div>

        <div className="flex flex-col gap-4 w-[60vw] -sm:w-[75vw] mx-auto">
          <button
            onClick={google}
            className="flex gap-2 justify-center items-center mx-auto bg-richblack-900 border-[1.5px] border-richblack-5 w-full py-2"
          >
            <img src={googleLogo} alt="googlelogo" className="w-8 h-8" />
            <div>Login with Google</div>
          </button>

          <button
            onClick={github}
            className="flex gap-2 justify-center items-center mx-auto bg-richblack-900 border-[1.5px] border-richblack-5 w-[60vw] -sm:w-[75vw] py-2"
          >
            <img src={githubLogo} alt="githublogo" className="w-8 h-8" />
            <div>Login with GitHub</div>
          </button>

          <div className="flex gap-1 w-full mb-16">
          <div>Don't have an account?</div>
          <Link to="/register" className="hover:underline">
            Create an account
          </Link>
        </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
