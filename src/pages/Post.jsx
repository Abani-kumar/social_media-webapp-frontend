import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/common/PostCard";
import { getPostById } from "../services/operations/postOpr";
import { useSelector } from "react-redux";
import { useEffect } from 'react'
import Comment from "../components/common/Comment";

const Card = () => {

  console.log("inside card")
  const [loading,setLoading]=useState(true);
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [post, setPost] = useState([]);
  const [comments,setComments] = useState([]);

  const helper = async () => {
    const result = await getPostById(id, token);
    setPost(result);
    setComments(result.comments);
    // console.log("comment",result.comments)
    setLoading(false)
  };
  
  useEffect(()=>{
    helper();
  },[]);
  
  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="w-[50vw] -sm:w-[98vw] mt-6 mx-auto text-white h-[100vh] mb-32 flex flex-col items-center">
          <div>
            <div className="mt-2 z-10">
              <Post post={post} isLinked={false}/>
            </div>
            <div>
              {comments.map((comment,index)=>(
                <Comment comment={comment} key={index}/>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Card;
