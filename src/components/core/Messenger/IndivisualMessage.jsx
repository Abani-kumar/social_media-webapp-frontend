import React, { useEffect, useState } from "react";
import MessageCard from "./MessageCard";
import { useSelector } from "react-redux";
import { formattedDate } from "../../../utils/dateFormatter";

const IndivisualMessage = ({ chat }) => {
  const { user } = useSelector((state) => state.auth);
  // console.log(chat);
  // console.log(user)
  const [sent, setSent] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const date = formattedDate(chat.createdAt);
    setTime(date);
    if (chat.sender != user?._id) {
      setSent("friend");
    } else {
      setSent("me");
    }
  }, []);

  return (
    <>
      <div>
        <MessageCard
          sent={sent}
          content={chat?.content}
          time={time}
        />
      </div>  
    </>
  );
};

export default IndivisualMessage;
