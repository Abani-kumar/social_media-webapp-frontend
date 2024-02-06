import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFeed } from "../../../services/operations/postOpr";
import Post from "../../common/PostCard";
import post, { setLoading } from "../../../redux/slices/post";
import { useEffect } from "react";

const Feed = () => {
  const { token } = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading,setLoading]=useState(false)

  
  async function helper() {
    setLoading(true)
    const result = await postFeed(token);
    setPosts(result);
    setLoading(false)
  }
  useEffect(() => {
    helper();
  },[]);

  const link="feed";
  
  return (
    <>
      {
        loading===true ?(<div className="loader"></div>) :
        (posts?.length===0?(<div className="flex justify-center items-center w-[100%] h-[100%] text-white text-4xl">No post available</div>):(<div className="mt-2 z-10">
        {posts?.map((post, index) => (
          <Post id={post._id} post={post} key={index} link={link}/>
        ))}
      </div>))
      }

    </>
  );
};

export default Feed;
