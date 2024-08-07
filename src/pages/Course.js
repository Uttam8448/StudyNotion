import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {courseEndpoints} from '../services/apis';
import { apiConnector } from '../services/apiconnector';
import { useSelector } from 'react-redux';
import Video from '../components/core/Course/Video';
import Section from '../components/core/Course/Section';

const Course = () => {
    const {courseId}=useParams();
    const [videoURL,setVideoURL]=useState(null);
    const [course,setCourse]=useState([]);
    const [data,setData]=useState([]);
    async function fetchCourse(){
        try{
            console.log("COURSE ID ",courseId)
            const result=await apiConnector("POST",
                courseEndpoints.COURSE_DETAILS_API,
                {courseId:courseId}
            )
            setCourse(result?.data);
            setData(result?.data?.data?.courseContent);
            setVideoURL(result?.data?.data?.courseContent[0]?.SubSection[0]?.videoUrl);
        }catch(error){

        }
    }

    useEffect(()=>{
        fetchCourse();
    },[courseId])

  return (
    <div className='w-full min-h-screen flex justify-between mt-5 text-richblack-25'>
        <div className='w-[50%] h-screen p-2 flex-col '>
            <div className='flex-col'>
        
            {
                data.length>0
                ?
                data.map((section)=>(
                <Section section={section} setVideoURL={setVideoURL} key={section._id}/> 
                ))
                :(
                    <div></div>
                )
            }
                
            </div>
          

        </div>
        <div className='w-[500px] h-screen '>
            {videoURL?(<Video videoURL={videoURL}/>):(<p className='text-2xl text-white mx-auto my-auto'>NOT FOUND!!</p>)}
        </div>
        
    </div>
  )
}

export default Course