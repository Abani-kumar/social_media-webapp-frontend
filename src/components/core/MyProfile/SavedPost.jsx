import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { savedPost } from '../../../services/operations/profileOpr';
import Post from '../../common/PostCard';

const SavedPost = () => {
  const {token}=useSelector((state)=>state.auth);
  const [post,setPost]=useState([])
  const helper=async()=>{
    let result=await savedPost(token);
    console.log(result)
    setPost(result);
  }

  useEffect(()=>{
    helper()
  },[])
  return (
    <>
      <div className="text-white w-[48vw] -sm:w-[98vw] mt-6 mx-auto ">
        <div className="mt-2 z-10">
          {post?.map((post, index) => (
            <Post id={post._id} post={post} key={index} link={"profile/savedPost"} isLinked={true}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default SavedPost