import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileTab = ({profile,setCurrentTab,currentTab}) => {

  
  // console.log("PROFILE",profile)
  const navigate=useNavigate();
    const {user}=useSelector((state)=>state.auth);
    const person=profile.participants.filter((participant)=>{
        return user._id!=participant._id
    })

    const HandleUserMessage=()=>{
      navigate(`/dashboard/messenger/${person[0]._id}`);
      setCurrentTab(profile._id)
    }
  return (
    <>
      <div >
         <div className={`flex gap-4 cursor-pointer ${currentTab==profile._id ?"bg-richblue-500 -z-0 rounded-sm px-2 py-1":""}`} onClick={HandleUserMessage} >
            <div className='ml-2'>
              <img src={person[0].avatar} alt='person' className='w-[40px] h-[40px] rounded-full'/>
            </div>
            <div className='flex flex-col'>
              <div className='text-md'>{person[0].userName}</div>
              <div className='text-blue-1000 text-sm'>{profile?.content}</div>
            </div>
         </div>
      </div>
    </>
  )
}

export default ProfileTab