import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { postApi, profileApi } from "../api";

export async function editProfile(formData, token) {
  const toastId = toast.loading("Loading...");
  let result=[];
  try {
    const response = await apiConnector("POST",profileApi.UPDATE_PROFILE,formData,{
        Authorization: `Bearer ${token}`,
    });
    console.log("edit profile response.....",response);
    if(!response.data.success){
        throw new Error(response.data.message)
    }
    result=response.data.updatedUserDetails
    toast.success("profile updated successfully")
  } catch (error) {
    console.log("PROFILE UPDATE API ERROR.....", error.response);
    toast.error(error.response.data.Message);
  }
  toast.dismiss(toastId)
  return result;
}

export async function changePassword(data,token){
  const toastId=toast.loading("Loading...")
  try{
    const response=await apiConnector("POST",profileApi.CHANGE_PASSWORD,{password:data.oldPassword,newPassword:data.newPassword},{
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE PASSWORD API RESPONSE",response)
    if(!response.data.success){
      throw new Error(response.data.message)
    }
    toast.success("password updated successfully")
  }
  catch(error){
    console.log("CHANGE PASSWORD API ERROR",error.response)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export async function savedPost(token){
  const toastId=toast.loading("Loading....");
  let result=[];
  try{
    const response=await apiConnector("GET",postApi.ALLSAVE_POST,null,{Authorization: `Bearer ${token}`});
    
    console.log("SAVED POST API RESPONSE",response);

    if(!response.data.success){
      throw new Error(response.data.message)
    }
    result=response.data.savePost;
    toast.success("saved post fetched successfully")
  }
  catch(error){
    console.log("SAVED POST API ERROR",error.response)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId);
  return result;
}