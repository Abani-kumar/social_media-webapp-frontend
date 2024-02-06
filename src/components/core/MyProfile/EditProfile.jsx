import React, { useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../../services/operations/profileOpr";
import { setUser } from "../../../redux/slices/auth";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const {token}=useSelector((state)=>state.auth);
  const [preview, setPreview] = useState(user.avatar);
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState(user.firstName ? user.firstName : "");
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : "");
  const [userName, setUserName] = useState(user.userName ? user.userName : "");
  const [tagLine, setTagLine] = useState(user.tagLine ? user.tagLine : "");
  const [shortBio, setShortBio] = useState(user.shortBio ? user.shortBio : "");
  const [portfolio, setPortfolio] = useState(user.portfolioUrl ? user.portfolioUrl : "" );
  const [isImageChange,setIsImageChange]=useState(false);


  const handleUploadImage = (e) => {
    const photo = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };

    if (photo) {
      reader.readAsDataURL(photo);
      setIsImageChange(true);
    }
    setFile(photo);
  };

  const isFormUpdated = () => {
    if (
      user.firstName !== firstName ||
      user.lastName !== lastName ||
      user.userName !== userName ||
      user.tagLine !== tagLine ||
      user.shortBio !== shortBio ||
      user.portfolioUrl !== portfolio ||
      isImageChange!==false
    ) {
      return true;
    } else {
      return false;
    }
  };

  const dispatch=useDispatch();
  
  const onsubmit=async(e)=>{
    e.preventDefault();
    if(isFormUpdated()){
      const formData=new FormData();
      if(firstName !==user.firstName){
        formData.append("firstName",firstName)
      }
      if(lastName!==user.lastName){
        formData.append("lastName",lastName)
      }
      if(userName!==user.userName){
        formData.append("userName",userName)
      }
      if(tagLine!==user.tagLine){
        formData.append("tagLine",tagLine)
      }
      if(shortBio!==user.shortBio){
        formData.append("shortBio",shortBio)
      }
      if(portfolio!==user.portfolioUrl){
        formData.append("portfolioUrl",portfolio)
      }
      if(isImageChange!==false){
        formData.append("profilePicture",file)
      }
      const result=await editProfile(formData,token);
      dispatch(setUser(result));
      localStorage.setItem("user",JSON.stringify(result));
    }
    else{
      console.log("No made changes")
      toast.error("No made changes to the form");
    }
    // return;
    
  }

  return (
    <>
      <div className="text-white w-[48vw] -sm:w-[98vw] mt-6 mx-auto ">
        <form onSubmit={onsubmit} className="flex flex-col gap-2 mb-20">
          <div>
            <div className="h-full flex flex-col justify-center items-center">
              <div className=" mb-6">
                <label className="relative cursor-pointer" htmlFor="fileInput">
                  <div
                    className={` ${
                      preview
                        ? "opacity-0"
                        : "absolute text-white text-4xl font-extralight mt-5 ml-7 "
                    }`}
                  >
                    +
                  </div>
                  <div className="relative h-20 w-20 border-4 border-pure-greys-1000 rounded-full ease-out duration-100">
                    {preview ? (
                      <img
                        src={preview}
                        className="h-[72px] w-[72px] rounded-full absolute object-cover mb-2"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <button className="px-[7px]  rounded-full border-none  bg-pure-greys-1000 ease-out duration-150 absolute right-[-4%] bottom-[0%]">
                    +
                  </button>
                </label>
              </div>
              <input
                type="file"
                className="relative hidden"
                id="fileInput"
                onChange={handleUploadImage}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <label>First name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="Enter firstName"
                  className=" bg-black w-[22vw] border-[1px] border-richblack-50 py-2 px-2"
                />
              </div>
              <div className="flex flex-col">
                <label>Last name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter lastName"
                  type="text"
                  className="bg-black w-[22vw] border-[1px] border-richblack-50 py-2 px-2"
                />
              </div>
            </div>
            <div>
              <div className="gap-2">
                <label>Username</label>
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter userName"
                  type="text"
                  className="bg-black w-[100%] border-[1px] border-richblack-50 py-2 px-2"
                />
              </div>
              <div className="gap-2">
                <label>Tagline</label>
                <input
                  value={tagLine}
                  onChange={(e) => setTagLine(e.target.value)}
                  placeholder="Enter tagLine"
                  type="text"
                  className="bg-black w-[100%] border-[1px] border-richblack-50 py-2 px-2"
                />
              </div>
              <div className="gap-2">
                <label>Short Bio</label>
                <input
                  value={shortBio}
                  onChange={(e) => setShortBio(e.target.value)}
                  type="text"
                  placeholder="Enter bio"
                  className="bg-black w-[100%] border-[1px] border-richblack-50 py-4 px-2"
                />
              </div>
              <div className="gap-2">
                <label>Portfolio URL</label>
                <input
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  type="text"
                  placeholder="Enter portfolio url"
                  className="bg-black w-[100%] border-[1px] border-richblack-50 py-2 px-2"
                />
              </div>
            </div>
          </div>

          <button type="submit"  className="bg-pure-greys-1000 w-full py-3 mt-4">
            Edit profile
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
