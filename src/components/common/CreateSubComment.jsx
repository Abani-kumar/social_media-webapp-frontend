import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSubComment } from "../../services/operations/commentOpr";
import toast from "react-hot-toast";

const CreateSubComment = ({reply,cancel,setShowSubComment,parentCommentId}) => {
  
  const { user,token } = useSelector((state) => state.auth);
  const [input, setInput] = useState("");


  const handleCreateSubComment=async()=>{

    if(input===""){
      toast.error("you don't write anything")
    }
    else{
      await createSubComment(token,parentCommentId,input);
      setShowSubComment(false);
      setInput("")
    }

  }

  
  return (
    <>
      <div className="w-[50vw] text-white bg-richblack-600 px-6 py-3 rounded-sm mt-4">
        <div className=" flex justify-between">
          <div className="w-[10%]">
            <img src={user?.avatar} alt="userPic" className="w-[40px] h-[40px] rounded-full"/>
          </div>
          <div className="w-[90%] flex flex-col">
            <div className="flex gap-1 text-blue-1000">
              <div>replying to @</div>
              <div>{reply}</div>
            </div>
            <div>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-black w-[100%] outline-none py-2 px-1 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-6 justify-end mt-2">
          {cancel && <button onClick={()=>setShowSubComment(false)} className="bg-richblack-900 text-2xl text-blue-1000 px-1 rounded-sm">cancel</button>}
          <button onClick={handleCreateSubComment} className="bg-richblack-900 text-2xl text-blue-1000 px-1 rounded-sm">reply</button>
        </div>
      </div>
    </>
  );
};

export default CreateSubComment;
