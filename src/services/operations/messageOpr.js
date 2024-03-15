import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { messageApi } from "../api";

export async function getConversation(token){
    const toastId=toast.loading("Loading...");
    let result=[];
    try{
        const response=await apiConnector("GET",messageApi.GET_CONVERSATION,null,{
            Authorization: `Bearer ${token}`,
        });

        console.log("GET CONVERSATION API RESPONSE",response);
        toast.success("successfully get all conversation");
        result=response.data?.allConversation;
    }
    catch(error){
        console.log(error);
        toast.error(error.response?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export async function getMessage(id,token){
    const toastId=toast.loading("Loading...");
    let result=[];
    try{
        const response=await apiConnector("GET",`${messageApi.GET_MESSAGE}/${id}`,null,{
            Authorization: `Bearer ${token}`,
        });
        console.log("GET MESSAGE API RESPONSE",response);
        toast.success("successfully fetched all message");
        result=response?.data?.message;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.message);
    }
    toast.dismiss(toastId);
    return result;
}

export async function createMessage(recipient,content,token){
    const toastId=toast.loading("Loading...");
    try{
        const response=await apiConnector("POST",messageApi.CREATE_MESSAGE,{recipient,content},{
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE MESSAGE API RESPONSE",response);
        toast.success("successfully create message");
    }
    catch(error){
        console.log(error);
        toast.error("error in creating message")
    }
    toast.dismiss(toastId);
}