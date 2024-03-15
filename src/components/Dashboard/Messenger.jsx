import React, { useEffect, useState } from "react";
import { getConversation } from "../../services/operations/messageOpr";
import { useSelector } from "react-redux";
import Sidebar from "../core/Messenger/Sidebar";
import { Outlet } from "react-router-dom";
import io from 'socket.io-client'

const Messenger = () => {
  const socket = io.connect("http://localhost:4000");
  const { token,user } = useSelector((state) => state.auth);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(user)

  const helper = async () => {
    const result =await getConversation(token);
    setConversation(result);
    // console.log("conversation", conversation);
    setLoading(false);
  };

  useEffect(()=>{
    socket.emit("userJoined",user._id);

    return ()=>{
      socket.emit("disconnected")
    }
  },[])

  useEffect(() => {
    helper();
  }, []);
  return (
    <>
      {loading===true ? (
        <div className="loader"></div>
      ) : (
        <div className="text-white w-[100vw] h-[100vh] flex justify-between overflow-hidden">
          <div className="w-[30%] h-[100%]">
            <Sidebar conversation={conversation}/>
          </div>
          <div className="w-[70%]">
            <Outlet/>
          </div>
        </div>
      )}
    </>
  );
};

export default Messenger;
