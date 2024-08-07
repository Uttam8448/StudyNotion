import ProgressBar from "@ramonak/react-progress-bar";
import { SlOptionsVertical } from "react-icons/sl";
import React from 'react'
import { useNavigate } from "react-router-dom";

const EnrollCourseCard = ({course}) => {
    const navigate=useNavigate();

    async function clickHandler(e){
        e.preventDefault();
        navigate(`/course/${course._id}`);
    }
  return (
    <div onClick={clickHandler} className='flex bg-richblack-900 cursor-pointer text-start w-[100%] p-3 border-b-[1px] border-richblack-700  justify-between items-center font-medium'>
                                <div className='w-[30%] flex gap-3 text-left items-center'>
                                    <img src={course.thumbnail} className='w-[50px] h-[40px] rounded-sm'/>
                                    <div> 
                                        <p>{course.courseName}</p>
                                        <p className='text-richblack-400'>{String(course.courseDescription).slice(0,20)}</p>
                                    </div>
                                </div>
                                <div className='text-center w-[20%]'>
                                    {course?.totalDuration}
                                </div>
                                <div className='w-[25%] text-center'>
                                    <p className='pb-1'>Progress: {course.progressPercentage||0}%</p>
                                    <ProgressBar completed={course.progressPercentage||0}
                                                height='8px'
                                                isLabelVisible={false}/>
                                </div>
                                <div className='p-2 w-[5%]'>
                                    <SlOptionsVertical />
                                </div>
    </div>
  )
}

export default EnrollCourseCard;