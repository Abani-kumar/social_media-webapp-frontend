import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../redux/slices/auth";
import { picture } from "../services/operations/authOpr";

const ProfilePicture = () => {
  const dispatch = useDispatch();
  const { signup } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePresent, setImagePresent] = useState(true);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
      setImagePresent(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    setFile(file);
  };

  const uploadImage = (e) => {
    const formdata = new FormData();
    e.preventDefault();
    if (file === null) {
      setImagePresent(false);
      return;
    }
    formdata.append("profilePicture", file);
    formdata.append("email", signup.email);

    dispatch(picture(formdata));
  };
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center text-white">
      <h1 className="text-3xl">Upload your profile photo</h1>
      <form onSubmit={uploadImage}>
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
          {imagePresent ? null : (
            <p className="text-red">please upload image</p>
          )}
        </div>

        <div className="w-[20vw] flex justify-between -sm:w-[50vw]">
          <button
            type="submit"
            className="border-[1px] bg-pure-greys-1000 px-4 py-2 -sm:px-2 -sm:py-1 rounded-md"
          >
            upload
          </button>
          <button
            onClick={() => dispatch(setStep(4))}
            className="border-[1px] bg-pure-greys-1000 px-4 py-2 -sm:px-2 -sm:py-1 rounded-md"
          >
            skip for now
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePicture;
