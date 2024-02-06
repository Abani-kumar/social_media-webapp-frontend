import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authOpr";
import { setSignup } from "../redux/slices/auth";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    const values = getValues();
    dispatch(setSignup(values));
    dispatch(sendOtp(data?.email, navigate));
  };

  return (
    <div>
      <div>
        <div className="max-w-maxContent text-white max-h-full ">
          <div className="border-b-[1px] border-b-richblack-100 w-[100vw] bg-richblack-1000 p-4 fixed top-0 z-10">
            <div className="max-w-[90vw] mx-auto mb-6 mt-4 flex justify-between">
              <div className="font-extrabold text-3xl">Register</div>
              <Link
                to="/"
                className="font-semibold border-[1px] border-richblack-100 p-3 hidden lg:block"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="mt-40 mb-8 flex flex-col gap-1 items-center">
            <div className="font-extrabold text-5xl">Register</div>
            <div className="font-extralight">
              Before we post, please create your account
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onsubmit)}
          className="mt-10 w-[60vw] -sm:w-[75vw] mx-auto flex flex-col justify-center items-center text-white gap-3 -sm:gap-5"
        >
          <div className="flex w-full -sm:flex-col justify-between">
            <div className="flex flex-col w-[48%] -sm:w-full gap-1">
              <label htmlFor="firstName">Firstname</label>
              <input
                className=" bg-richblack-900 border-[1px] w-full border-richblack-5 mx-auto py-2 px-1 focus:bg-richblack-900"
                id="firstName"
                placeholder="Enter your firstname..."
                type="text"
                name="firstName"
                {...register("firstName", {
                  required: "firstName is required.",
                })}
              />
              {errors.firstName && (
                <p className="text-red">{errors.firstName.message}</p>
              )}
            </div>

            <div className="flex flex-col w-[48%] -sm:w-full gap-1">
              <label htmlFor="lastName">Lastname</label>
              <input
                className=" bg-richblack-900 border-[1px] w-full border-richblack-5 mx-auto py-2 px-1 focus:bg-richblack-900"
                id="lastName"
                placeholder="Enter your firstname..."
                type="text"
                name="lastName"
                {...register("lastName", {
                  required: "lastName is required.",
                })}
              />
              {errors.lastName && (
                <p className="text-red">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="tagLine">Tagline</label>
            <input
              className=" bg-richblack-900 border-[1px] w-full border-richblack-5 mx-auto py-2 px-1 focus:bg-richblack-900"
              id="tagLine"
              placeholder="Enter a profile tagline..."
              type="text"
              name="tagLine"
              {...register("tagLine", {
                required: "tagLine is required.",
              })}
            />
            {errors.tagLine && (
              <p className="text-red">{errors.tagLine.message}</p>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="userName">Username</label>
            <input
              className=" bg-richblack-900 border-[1px] w-full border-richblack-5 mx-auto py-2 px-1 focus:bg-richblack-900"
              id="userName"
              placeholder="Enter a username..."
              type="text"
              name="userName"
              {...register("userName", {
                required: "userName is required.",
              })}
            />
            {errors.userName && (
              <p className="text-red">{errors.userName.message}</p>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email">Email</label>
            <input
              className=" bg-richblack-900 border-[1px] w-full border-richblack-5 mx-auto py-2 px-1 focus:bg-richblack-900"
              id="email"
              placeholder="Enter an email..."
              type="text"
              name="email"
              {...register("email", {
                required: "email is required.",
              })}
            />
            {errors.email && <p className="text-red">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col mt-2 w-full form-control">
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
            {errors.password && (
              <p className="text-red">{errors.password.message}</p>
            )}
          </div>

          <div className="mt-3 flex mr-auto">
            <label className="container">
              I agree to the terms and conditions
              <Controller
                name="checkbox"
                control={control}
                defaultValue={false}
                rules={{ required: "Checkbox is required" }}
                render={({ field }) => <input type="checkbox" {...field} />}
              />
              <span className="mark"></span>
            </label>
            {errors.checkbox && (
              <span className="text-red">{errors.checkbox.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-pure-greys-1000 w-full px-4 py-2 font-medium text-white border-[1px] border-white cursor-pointer"
          >
            Register
          </button>
        </form>

        <div className="text-white gap-4 w-[60vw] -sm:w-[75vw] mx-auto mt-2">
          <div className="flex gap-1 w-full mb-16">
            <div>Already registered?</div>
            <Link to="/" className="hover:underline">
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
