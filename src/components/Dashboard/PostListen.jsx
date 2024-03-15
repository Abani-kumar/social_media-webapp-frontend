import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { useSelector } from "react-redux";
import ProfileCard from "../common/ProfileCard";
import Hashtag from "../common/Hashtag";
import CreateSection from "../common/CreateSection";
import { Outlet } from "react-router-dom";

const PostListen = () => {

  const {user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.post);
  const avatar = user?.avatar;
  const name = user?.lastName
    ? user?.firstName + " " + user?.lastName
    : user?.firstName;
  const tagLine = user?.tagLine;
  const email = user?.email;


  return (
    <div className="h-full">
    
        {
          loading ?(<div className="h-[100vh] flex items-center justify-center"><div className="loader"></div></div>):(<div className="text-white w-[100vw]   h-full">
          <Navbar header={"All Posts"} />
           
          <div className="flex justify-between -sm:flex-col ">
            {/* profile section */}
            <div className="z-20 w-[20vw] -sm:w-[90vw]">
              <ProfileCard
                avatar={avatar}
                name={name}
                tagLine={tagLine}
                email={email}
                buttonText="View Profile"
                link="/dashboard/profile"
              />
            </div>

            

            {/* Post and other section */}
            <div className="w-[50vw] -sm:w-[98vw] mt-6 ">
              <div>
                <CreateSection avatar={user.avatar}/>
              </div>
              <Outlet/>
            </div>

            {/* Hashtag section */}
            <div className="w-[20vw] -sm:hidden">
              <div className="sticky top-24 mr-8 mt-6">
                <Hashtag
                  tag1={"javascript"}
                  tag2={"typescript"}
                  tag3={"java"}
                  tag4={"python"}
                  tag5={"react"}
                />
              </div>
            </div>
          </div>
        </div>)
        }
    </div>
  );
};

export default PostListen;
