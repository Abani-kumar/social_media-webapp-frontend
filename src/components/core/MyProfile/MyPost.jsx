import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { mypost } from "../../../services/operations/postOpr";
import Post from "../../common/PostCard";

const MyPost = () => {
  const { token } = useSelector((state) => state.auth);
  const [post,setPost]=useState([])
  async function helper() {
    let result=await mypost(token);
    setPost(result);
  }

  useEffect(() => {
    helper();
  }, []);
  return (
    <div className="w-[50vw] -sm:w-[98vw] mt-6 mx-auto ">
      <div className="mt-2 z-10">
        {post?.map((post, index) => (
          <Post id={post._id} post={post} key={index} link={"profile"} isLinked={true}/>
        ))}
      </div>
    </div>
  );
};

export default MyPost;
