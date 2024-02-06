import React from "react";
import { Link } from "react-router-dom";

const ConfirmRegistration = () => {
  return (
    <div className="h-[100vh] w-full text-white">
      <div className="h-full flex flex-col justify-center items-center ">
        <h2 className="text-3xl">
          Your Registration Completed Successfully,login to seemlessly
          experience Tweetbeat
        </h2>
        <Link
          to="/"
          className="border-2 border-richblack-5 bg-pure-greys-1000 px-4 py-2 rounded-sm mt-3 cursor-pointer"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default ConfirmRegistration;
