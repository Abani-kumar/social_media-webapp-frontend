import React from 'react'
import { formattedDate } from '../../utils/dateFormatter'

const SubComment = ({subcomment}) => {
  const date=formattedDate(subcomment?.createdAt);
  return (
    <>
      <div className='w-[40vw] text-white flex flex-col mt-2 mb-2 ml-12'>
        {/* <div className="w-[90%] border-b border-solid border-richblack-500"></div> */}
        <div className="flex gap-4 mt-4 mb-4">
            <div>
              <img src={subcomment?.user?.avatar} className="w-[40px] h-[40px] rounded-full "/>
            </div>
            <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4">
               <div className="text-2xl">{subcomment?.user?.userName}</div>
               <div className="text-richblack-300">{date}</div>
             </div>
             <div className="text-richblack-100">
                {subcomment.content}
             </div>
            </div>
        </div>
        {/* <div className="w-[90%] border-b border-solid border-richblack-500"></div> */}
      </div>
    </>
  )
}

export default SubComment