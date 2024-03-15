import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authApi } from "../api";
import {
  setToken,
  setLoading,
  setStep,
  setSignup,
  setUser,
} from "../../redux/slices/auth";

const { SENDOTP_API, SIGNUP_API, LOGIN_API, PICTURE_API } = authApi;

//SendOtp

export function sendOtp(email) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
      });

      // console.log("Send otp response", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP send successfully");
      dispatch(setStep(2));
    } catch (error) {
      console.log("SENDOTP API ERROR...", error);
      toast.error("otp couldnot send");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//signup
export function signUp(signup, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName: signup.firstName,
        lastName: signup.lastName,
        tagLine: signup.tagLine,
        userName: signup.userName,
        email: signup.email,
        password: signup.password,
        otp: otp,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setStep(3));
      toast.success("user registered successfully");
    } catch (error) {
      console.log("SIGNUP API ERROR...", error);
      toast.error("signup failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//profile picture

export function picture(formdata) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", PICTURE_API, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("profilepicture response", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setStep(4));
      dispatch(setSignup(null));
      toast.success("profilepicture saved successfully");
    } catch (error) {
      console.log("ProfilePicture API ERROR...", error);
      toast.error("ProfilePicture failed to upload");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(data,navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email: data.email,
        password: data.password,
      });

      console.log("LOGIN API RESPONSE.......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("user loged in successfully");
      navigate("/dashboard/feed");
    } catch (error) {
      console.log("login API ERROR...", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// export function logout(dispatch){
//   dispatch(setToken(null));
//   dispatch(setUser(null));
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   toast.success("logout successfully")
//   navigate("/");
// }

