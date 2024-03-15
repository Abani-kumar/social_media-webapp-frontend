import { useState } from "react";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiMessengerLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Navbar = ({header}) => {
  const navigate=useNavigate();
  const [searchvalue, setSearchvalue] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    console.log(searchvalue);
    setSearchvalue("");
  };
  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="relative w-full border-b-[1px] border-b-richblack-100  bg-richblack-1000 p-2 z-20">
        <div className="w-[90%] mx-auto mb-1 mt-2 flex -sm:justify-between sm:justify-between items-center">
          <div className="font-bold lg:font-extrabold lg:text-3xl -sm:text-xl -sm:w-[30%]">
            {header}
          </div>

          <div className="flex gap-4 items-center justify-center -sm:w-[65%] -sm:gap-1">
            <div className="flex items-center justify-center -sm:w-[80%]">
              <div className="flex border-2 border-gray-200 rounded -sm:w-full">
                <input
                  onChange={(e) => setSearchvalue(e.target.value)}
                  value={searchvalue}
                  type="text"
                  className="px-4 py-2 w-[20vw] bg-richblack-900 -sm:w-[80%]"
                  placeholder="Search..."
                />
                <button
                  className="px-4 text-white bg-gray-600 border-l -sm:w-[20%]"
                  onClick={searchHandler}
                >
                  <CiSearch />
                </button>
              </div>
            </div>
            <div className=" relative text-3xl">
              <IoMdNotificationsOutline />
            </div>
            <div onClick={()=>navigate("/dashboard/messenger")} className="flex border-white border-2 px-4 py-2 gap-1 justify-center items-center cursor-pointer -sm:hidden">
              <div>
                <RiMessengerLine className="text-2xl"/>
              </div>
              <div>Messenger</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between -sm:flex-col"></div>
    </div>
  );
};

export default Navbar;
