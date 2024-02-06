import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileCard = ({
  avatar,
  name,
  tagLine,
  shortBio,
  portFolio,
  email,
  follower,
  following,
  buttonText,
  link
}) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  function handleLogout() {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("logout successfully")
    navigate("/");
  }
  return (
    <div className="fixed -sm:sticky text-richblack-100 w-[20vw] mt-6 ml-8 -sm:ml-4 -sm:w-[98vw] flex flex-col gap-4 ">
      <div className="relative border-[1px] border-white flex flex-col ">
        <div className="mt-4 ml-4 -sm:ml-6">
          <img
            src={avatar}
            alt="picture"
            className="w-[60px] h-[60px] rounded-full border-2 border-pure-greys-1000"
          />
        </div>
        <div className="ml-2 w-full -sm:ml-6">
          <div className="mt-4 font-extrabold text-white">{name}</div>
          {portFolio ? (
            <p className="fontWeight-extralight text-sm">{tagLine}</p>
          ) : (
            <div>{email}</div>
          )}
          <div className="border-t-[2px] text-white border-solid w-[18vw] -sm:w-[80vw] mt-2  mb-2"></div>
          {shortBio ? (
            <div className="mt-3 flex flex-col gap-1">
              <div className="text-white font-extrabold">Short Bio</div>
              <div className="text-sm">{shortBio}</div>
            </div>
          ) : (
            <p className="font-extralight text-sm">{tagLine}</p>
          )}
          {portFolio ? (
            <div className="mt-4 flex flex-col">
              <div className="text-white font-extrabold">Public link</div>
              <div className="flex flex-col gap-1 text-pure-greys-1000 text-sm">
                <div>{email}</div>
                <div>{portFolio}</div>
              </div>
            </div>
          ) : (
            ""
          )}
          {follower ? (
            <div className="mt-4 flex gap-3">
              <div className="flex gap-1">
                <div className="text-white font-extrabold">
                  {follower?.length}
                </div>
                <div>Followers</div>
              </div>
              <div className="flex gap-1">
                <div className="text-white font-extrabold">
                  {following?.length}
                </div>
                <div>Following</div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="mt-3 mb-3">
            <Link to={link} className="text-white bg-pure-greys-1000 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2">
              {buttonText}
            </Link>
          </div>
        </div>
      </div>

      <div
        onClick={handleLogout}
        className="relative flex gap-2 border-black border-2 px-4 py-3 bg-pure-greys-1000 items-center text-white cursor-pointer rounded-md"
      >
        <div>
          <LuLogOut />
        </div>
        <div>logout</div>
      </div>
    </div>
  );
};

export default ProfileCard;
