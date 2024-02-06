import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../redux/slices/auth";
import { sendOtp, signUp } from "../services/operations/authOpr";
import ProfilePicture from "./ProfilePicture";

const Otp = ({ values, file }) => {
  const navigate = useNavigate();
  const { signup, loading } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(signUp(signup, otp, navigate));
  };

  const handleOtp = () => {
    dispatch(sendOtp(signup.email));
  };

  return (
    <div>
      <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center text-white">
        {loading ? (
          <span className="loader"></span>
        ) : (
          <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
              Verify Email
            </h1>
            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
              `A verification code is sent to your mail .Enter the code below`
            </p>
            <form onSubmit={handleSubmit}>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />

              <button
                type="submit"
                className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
              >
                Verify Email
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => dispatch(setStep(1))}>
                <p className="text-richblack-5 flex items-center gap-x-2">
                  <BiArrowBack /> Back To Signup
                </p>
              </button>
              <button
                onClick={handleOtp}
                className="flex items-center text-blue-100 gap-x-2"
              >
                <RxCountdownTimer />
                Resend it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Otp;
