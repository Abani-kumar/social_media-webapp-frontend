import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createMessage,
  getMessage,
} from "../../../services/operations/messageOpr";
import { useSelector } from "react-redux";
import { getUserById } from "../../../services/operations/profileOpr";
import { IoMdSend } from "react-icons/io";
import IndivisualMessage from "./IndivisualMessage";
import io from "socket.io-client";

const Message = () => {
  const socket = io.connect("http://localhost:4000");

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  

  const helper = async () => {
    const result = await getMessage(id, token);
    setChats(result);
    const response = await getUserById(id, token);
    setUser(response);
    setLoading(false);
  };

  const messageSendHandler = async (e) => {
    e.preventDefault();
    socket.emit("createMessage", { id, message });
    await createMessage(id, message, token);
    setMessage("");
  };

  socket.on("recieveMessage",(data)=>{
    console.log("data",data);
    setChats([...chats,data.message]);
    console.log("charts:",chats)
  })

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    helper();
  }, []);
  return (
    <>
      <div className="w-[100%] h-[100%]">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="text-white flex flex-col justify-between h-[100%]">
            {/* top level */}

            <div className="mt-4 h-[10%]">
              <div className="flex gap-4 ml-2">
                <div>
                  <img
                    src={user.avatar}
                    className="w-[45px] h-[45px] rounded-full"
                  />
                </div>
                <div className="flex flex-col ">
                  <div>{user.userName}</div>
                  <div className="text-blue-1000">offline</div>
                </div>
              </div>
              <div className="border-b-[1px] border-richblack-200 mt-2"></div>
            </div>

            {/* Message */}
            <div
              className="h-[80%] overflow-x-scroll flex flex-col gap-2 ml-4 mr-4 mt-4 scroll"
              ref={chatContainerRef}
            >
              {chats.map((chat, index) => (
                <IndivisualMessage key={index} chat={chat} />
              ))}
            </div>
            {/* send message section */}

            <div className="mb-8">
              <div className="border-b-[1px] border-richblack-200 h-[10%] "></div>
              <div className="flex ml-12 mt-4 items-center gap-4">
                <input
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  spellCheck="false"
                  placeholder="Enter your message here"
                  className="w-[500px] px-4 py-2 rounded-2xl bg-richblack-700 text-richblack-50 outline-none"
                />
                <div onClick={messageSendHandler} className="cursor-pointer">
                  <IoMdSend className="text-3xl" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
