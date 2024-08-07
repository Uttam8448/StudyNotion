import React from 'react'

const Video = ({videoURL}) => {
  return (
    <video autoPlay controls className='w-full h-[350px] border-richblack-700 border-[1px] p-4 rounded-lg bg-black'>
                        <source src={`${videoURL}`} type="video/mp4" className='border-richblack-700 border-2 p-2 rounded-lg'/>
    </video>
  )
}

export default Video