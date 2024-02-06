import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { commentApi } from "../api";



export async function createComment(token,postId,content){
    const toastId=toast.loading("Loading...");
    try{
        const response=await apiConnector("POST",commentApi.CREATE_COMMENT,{postId:postId,content:content},{
            Authorization: `Bearer ${token}`,
        });
        console.log("CREATE COMMENT API RESPONSE",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("create comment successfully");
    }
    catch(error){
        console.log("CREATE COMMENT API ERROR",error.response);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
}

export async function createSubComment(token,parentCommentId,content){
    const toastId=toast.loading("Loading...");
    try{
        const response=await apiConnector("POST",commentApi.CREATE_SUBCOMMENT,{parentCommentId:parentCommentId,content:content},{
            Authorization: `Bearer ${token}`,
        });
        console.log("CREATE COMMENT API RESPONSE",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("create subcomment successfully");
    }
    catch(error){
        console.log("CREATE COMMENT API ERROR",error.response);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
}