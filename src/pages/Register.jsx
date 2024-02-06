import React from "react";
import { useSelector } from "react-redux";
import Signup from "./Signup";
import Otp from "./Otp";
import ProfilePicture from "./ProfilePicture";
import ConfirmRegistration from "./ConfirmRegistration";

const Register = () => {
  const { step } = useSelector((state) => state.auth);

  return (
    <div>
      {step===1 && <Signup/>}
      {step===2 && <Otp/>}
      {step===3 && <ProfilePicture/>}
      {step===4 && <ConfirmRegistration/>}
    </div>
  );
};

export default Register;
