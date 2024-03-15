import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
// import { setLoading } from "../../redux/slices/post";
import { postApi } from "../api";
import { setLoading } from "../../redux/slices/post";

export async function mypost(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", postApi.ALL_POST, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("my post response", response);
    if (!response.data.success) {
      throw new Error("response.data.message");
    }
    result = response.data.post;
    toast.success("post fetched successfully");
  } catch (error) {
    console.log("MYPOST API ERROR.....", error);
    toast.error("post couldnot fetched");
  }
  toast.dismiss(toastId);
  return result;
}

export async function postFeed(token) {
  const toastId = toast.loading("Fetching post listen...");
  let result = [];
  try {
    const response = await apiConnector("GET", postApi.POST_LISTEN, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("post listen response", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.post;
    toast.success("post fetched successfully");
  } catch (error) {
    console.log("POSTLISTEN API ERROR.....", error.response);
    toast.error("error in fetching feed");
  }
  toast.dismiss(toastId);
  return result;
}

export async function likePost(id,token) {
  const toastId = toast.loading("post like...");
  console.log(`${postApi.LIKE_POST}/${id}`);
  try {
    const response = await apiConnector("POST", `${postApi.LIKE_POST}/${id}`, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("post like response", response);
    if (!response.data.success) {
      throw new Error("response.data.message");
    }
    toast.success("post liked successfully")
  }catch (error){
    console.log("POSTLIKE API ERROR.....", error);
    toast.error("post like error");
  }
  toast.dismiss(toastId);
}

export async function unLikePost(id,token) {
  const toastId = toast.loading("post like...");
  console.log(`${postApi.UNLIKE_POST}/${id}`);
  try {
    const response = await apiConnector("POST", `${postApi.UNLIKE_POST}/${id}`, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("post unlike response", response);
    if (!response.data.success) {
      throw new Error("response.data.message");
    }
    toast.success("post unliked successfully")
  }catch (error){
    console.log("POSTUNLIKE API ERROR.....", error);
    toast.error("post unlike error");
  }
  toast.dismiss(toastId);
}

export async function savePost(id,token) {
  const toastId = toast.loading("post like...");
  try {
    const response = await apiConnector("POST", `${postApi.SAVE_POST}/${id}`, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("post save response", response);
    if (!response.data.success) {
      throw new Error("response.data.message");
    }
    toast.success("post saved successfully")
  }catch (error){
    console.log("POSTSAVE API ERROR.....", error);
    toast.error("post save error");
  }
  toast.dismiss(toastId);
}

export async function unsavePost(id,token) {
  const toastId = toast.loading("post like...");
  try {
    const response = await apiConnector("POST", `${postApi.UNSAVE_POST}/${id}`, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("post unsave response", response);
    if (!response.data.success) {
      throw new Error("response.data.message");
    }
    toast.success("post unsaved successfully")
  }catch (error){
    console.log("POSTUNSAVE API ERROR.....", error);
    toast.error("post unsave error");
  }
  toast.dismiss(toastId);
}

export async function createPost(formData,token){
  const toastId=toast.loading("Loading...");
  try{
    const response=await apiConnector("POST",postApi.CREATE_POST,formData,{
      Authorization: `Bearer ${token}`,
    })
    console.log("post create response", response);
    if (!response.data.success) {
      throw new Error("response.data.message");
    }
    toast.success("post create successfully");

  }
  catch(error){
    console.log("post created error",error)
    toast.error("failed to create post")
  }
  toast.dismiss(toastId)
}

export async function getPostById(id,token){
  const toastId=toast.loading("Loading...");
  let result=[];
  try{
    // console.log(id)
    const response=await apiConnector("POST",postApi.POSTBY_ID,{id:id},{
      Authorization: `Bearer ${token}`,
    });

    console.log("GETPOSTBYID API RESPONSE",response.data.post);

    result=response.data.post;
    toast.success("post fetched successfully")

  }
  catch(error){
    console.log("specific post error",error)
    toast.error("failed to fetched post")
  }
  toast.dismiss(toastId);
  return result;
}

export async function getUserAndPostById(id,token){
  const toastId=toast.loading("Loading...");
  let result=[]
  try{
    const response=await apiConnector("POST",postApi.USERANDPOSTBY_ID,{id:id},{
      Authorization: `Bearer ${token}`,
    });
    console.log("GET POST AND USER BY ID API RESPONSE",response);
    toast.success("post and user fetched successfully");
    result=response.data;
  }
  catch(error){
    console.log(error);
    toast.error(error.response.message);
  }
  toast.dismiss(toastId);
  return result;
}

// export async function getPostOfUser(userId,token){
//   const toastId=toast.loading("Loading...");
//   let result=[];
//   try{
//     const response=await apiConnector("POST",postApi.USER_POST,userId,{
//       Authorization: `Bearer ${token}`,
//     });

//     console.log("USER POST API RESPONSE",response);
//     if(!response.data.success){
//       throw new Error(response.data.message);
//     }
//     result=response.data
//     toast.success("user post fetched successfully");
//   }
//   catch(error){
//     console.log(error);
//     toast.error(error.data?.message)
//   }
//   return result;
// }
