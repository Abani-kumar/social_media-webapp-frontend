import React, { useState } from "react";
import ProfileTab from "./ProfileTab";
import { useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";

const Sidebar = ({ conversation }) => {
  const [currentTab,setCurrentTab]=useState();
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="flex w-[100%] h-[100%]">
        <div className="w-[20%] bg-richblack-800 flex flex-col justify-between ">
          <div className="ml-2 text-2xl mt-4">
            <CiLogout className="font-extrabold text-2xl" />
          </div>
          <div className=" ml-2 mb-16 relative">
            <div className="">
              <div className="bg-caribbeangreen-300 w-[10px] h-[10px] rounded-full inline-block border-[1px] border-white absolute ml-8 z-10 "></div>
              <img
                src={user?.avatar}
                alt="pp"
                className="w-[40px] h-[40px] rounded-full absolute"
              />
            </div>
          </div>
        </div>
        <div className="w-[85%] flex justify-between">
          <div className="w-[100%] flex flex-col ml-2 mt-4 gap-8">
            {conversation.map((profile, index) => (
              <ProfileTab profile={profile} key={index} setCurrentTab={setCurrentTab} currentTab={currentTab}/>
            ))}
          </div>
          <div className="border-r-[1px] border-richblack-200"></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
