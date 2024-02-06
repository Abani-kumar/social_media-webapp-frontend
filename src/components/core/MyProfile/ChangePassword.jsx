import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { changePassword } from "../../../services/operations/profileOpr";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const {token}=useSelector((state)=>state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit=async(data)=>{
    if(data.newPassword !==data.confirmPassword){
      toast.error("new password and confirm password must be same")
    }
    await changePassword(data,token);
  }
  return (
    <>
      <div className="text-white w-[48vw] -sm:w-[98vw] mt-6 mx-auto ">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col gap-2 mb-20"
        >
          <div>
            <label>Old password</label>
            <input
              placeholder="Enter old password"
              type="password"
              name="oldPassword"
              {...register("oldPassword", {
                required: "oldPassword is required.",
                  minLength: {
                    value: 6,
                    message: "password have atleast 6 character",
                  },
              })}
              className="bg-black w-[100%] border-[1px] border-richblack-50 py-2 px-2"
            />
            {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
          </div>
          <div>
            <label>New password</label>
            <input
              placeholder="Enter new password"
              name="newPassword"
              type="password"
              {...register("newPassword",{
                required:"newPassword is required",
                minLength:{
                  value:6,
                  message:"new password have atleast 6 character"
                }
              })}
              className="bg-black w-[100%] border-[1px] border-richblack-50 py-2 px-2"
            />
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
          </div>
          <div>
            <label>Confirm password</label>
            <input
              placeholder="Enter confirm password"
              name="confirmPassword"
              type="password"
              {...register("confirmPassword",{
                required:"confirmPassword is required",
                minLength:{
                  value:6,
                  message:"new confirm password have atleast 6 character"
                }
              })}
              className="bg-black w-[100%] border-[1px] border-richblack-50 py-2 px-2"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="text-center cursor-pointer bg-pure-greys-1000 w-[100%] py-2 mt-4 rounded-sm"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
