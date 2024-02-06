import React, { useEffect, useRef, useState } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { createPost } from "../../services/operations/postOpr";
import { useSelector } from "react-redux";
const CreateSection = ({ avatar }) => {
  const { token } = useSelector((state) => state.auth);
  const [showEmoji, setShowEmoji] = useState(false);
  const [input, setInput] = useState("");
  const imageInput = useRef(null);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews((prev)=>[...prev,...newImages]);
    const photo = Array.from(files).map((file) => file);
    setImages((prevImages) => [...prevImages, ...photo]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setPreviews(updatedImages);
    setImages(updatedImages);
  };

  function handleEmoji(e) {
    setInput((prev) => prev + e.emoji);
    setShowEmoji(false);
  }

  const formData = new FormData();

  function formDataAppend() {
    formData.append("content", JSON.stringify(input));
    for (let image of images) {
      // const file = new File([image], image.name);
      console.log("image", image);
      formData.append("images", image);
    }
  }
  function handleButtonClick(e) {
    e.preventDefault();
    imageInput.current.click();
  }

  async function handleCreatePost() {
    formDataAppend();

    if (!formData.has("content") && !formData.has("images")) {
      return;
    } else {
      await createPost(formData, token);
    }
    setInput("");
    setPreviews([])
    setImages([])
  }

  return (
    <div>
      <div className="-sm:relative sm:top-24 z-50  border-2 border-white flex justify-around items-center px-4 py-2">
        <div>
          <img
            src={avatar}
            alt="pic"
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="outline-none w-[50%] bg-richblack-1000"
          placeholder="Type to add something"
        />
        <CiFaceSmile
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-2xl font-extrabold cursor-pointer"
        />
        <form>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            ref={imageInput}
            className="hidden"
          />
          <button
            onClick={handleButtonClick}
            type="submit"
            className="text-2xl cursor-pointer"
          >
            +
          </button>
        </form>
        <div className="bg-pure-greys-1000 px-2 py-1 rounded-sm">
          <IoSend
            onClick={handleCreatePost}
            className="cursor-pointer text-2xl text-black"
          />
        </div>
      </div>

      {showEmoji ? (
        <div className="flex justify-center relative z-50">
          <EmojiPicker onEmojiClick={handleEmoji} />
        </div>
      ) : (
        ""
      )}

      <div
        className={`${
          images.length > 0
            ? "w-[40vw] h-x-auto mx-auto grid grid-cols-2 gap-x-4 mt-4 -sm:grid-cols-1"
            : ""
        }`}
      >
        {previews.map((preview, index) => (
          <div key={index} className="">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-[30%] h-[30%]"
            />
            <button onClick={() => removeImage(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSection;
