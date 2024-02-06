import React, { useEffect, useState } from "react";
import ProfileCard from "../common/ProfileCard";
import { useSelector } from "react-redux";
import Hashtag from "../common/Hashtag";
import Navbar from "../common/Navbar";
import { Link, Outlet } from "react-router-dom";
import Tabbar from "../core/MyProfile/Tabbar";

const MyProfile = () => {
  const {user}=useSelector((state)=>state.auth)
  // console.log("user",user)
  
  const avatar = user?.avatar;
  const name = user?.firstName + " " + user?.lastName;
  const tagLine = user?.tagLine;
  const shortBio = user?.shortBio;
  const portFolio = user?.portfolioUrl;
  const email = user?.email;
  const follower = user?.follower;
  const following = user?.following;



  return (
    <div>
      <div className="text-white w-[100vw]">
        <Navbar header={"My profile"}/>

        <div className="flex justify-between -sm:flex-col">

          {/* profile section */}
          <div className="sticky top-0 z-20 w-[20vw] -sm:w-[90vw]">
            <div>
              <ProfileCard
                avatar={avatar}
                name={name}
                tagLine={tagLine}
                shortBio={shortBio}
                portFolio={portFolio}
                email={email}
                follower={follower}
                following={following}
                buttonText="All Post"
                link="/dashboard/feed"
              />
            </div>
          </div>

          {/* Post and other section */}
          <div className="w-[60vw] -sm:w-[98vw] mt-6">
             <Tabbar/>
             <Outlet/>
          </div>
      
          {/* Hashtag section */}
          <div className="sticky-0 top-0 z-20 -sm:hidden">
            <div className="mr-8 mt-6">
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
      </div>
    </div>
  );
};

export default MyProfile;
