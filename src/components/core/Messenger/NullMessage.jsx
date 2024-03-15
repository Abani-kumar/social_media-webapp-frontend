import React from 'react'
import { SiMessenger } from "react-icons/si";

const NullMessage = () => {
  return (
    <>
      <div className='w-[100%] h-[100%] flex justify-center items-center '>
        <div >
          <SiMessenger className='text-[250px] line-1 text-black'/>
        </div>
      </div>
    </>
  )
}

export default NullMessage