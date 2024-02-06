import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const Tabbar = () => {
    const tabbar={myProfile:"Posts",editProfile:"Edit profile",changePassword:"Change password",savedPost:"Bookmarked"};
    const valueOfTab=Object.values(tabbar);
    const [currentTab,setCurrentTab]=useState(valueOfTab[0]);
    const navigate=useNavigate();
    useEffect(()=>{
        navigate("/dashboard/profile/myProfile")
    },[])

  return (
    <div>
      <div className="flex justify-evenly  z-0">
        {Object.entries(tabbar).map(([key, value]) => (
          <Link
            to={key === "post" ? "" : key}
            key={key}
            className={`${
              currentTab === value
                ? "bg-richblack-700 px-4 py-2 -sm:px-2 -sm:py-1 "
                : ""
            } cursor-pointer`}
            onClick={() => setCurrentTab(value)}
          >
            {value}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tabbar;
