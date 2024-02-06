import React, { useState } from "react";
import { formattedDate } from "../../utils/dateFormatter";
import { CiHeart } from "react-icons/ci";
import { FaCommentDots } from "react-icons/fa";
import CreateSubComment from "./CreateSubComment";
import SubComment from "./SubComment";
import { RiArrowDropDownFill } from "react-icons/ri";

const Comment = ({comment}) => {
    const [showSubComment,setShowSubComment]=useState(false);
    const [showNestedComment,setShowNestedComment]=useState(false);
    const date=formattedDate(comment.createdAt);
    function handleSubComment(){
      // e.preventDefault()
      setShowSubComment(!showSubComment)
    }


    function subCommentHandler(){
      setShowNestedComment(!showNestedComment);
    }
  return (
    <>
      <div className="w-[50vw] text-white flex flex-col mt-2 ml-20">
        {/* <div className="w-[90%] border-b border-solid border-richblack-500"></div> */}
          <div className="flex gap-4 mt-4 mb-4">
            <div>
              <img src={comment.user?.avatar} className="w-[40px] h-[40px] rounded-full "/>
            </div>
            <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4">
               <div className="text-2xl">{comment.user.userName}</div>
               <div className="text-richblack-300">{date}</div>
             </div>
             <div className="text-richblack-100">
                {comment.content}
             </div>
             <div className="flex gap-4 ">
               <div onClick={handleSubComment} className="cursor-pointer"><FaCommentDots/></div>
               <div onClick={subCommentHandler} className="cursor-pointer text-blue-1000">{comment.subComment?.length} replies</div>
               {showNestedComment && <div className="text-white text-3xl"><RiArrowDropDownFill/></div>}
             </div>
            </div>
          </div>
          {
              showNestedComment && comment.subComment.map((subcomment,index)=>(
                <SubComment subcomment={subcomment} key={index}/>
              ))
          }
          {showSubComment && <CreateSubComment reply={comment.user.userName} cancel={"cancel"} setShowSubComment={setShowSubComment} parentCommentId={comment._id}/>}
        {/* <div className="w-[90%] border-b border-solid border-richblack-500"></div> */}
      </div>
    </>
  );
};

export default Comment;
