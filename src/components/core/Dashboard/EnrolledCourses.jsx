import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import { SlOptionsVertical } from "react-icons/sl";
import EnrollCourseCard from '../Course/EnrollCourseCard';

const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const [enrolledCourses,setEnrolledCourses] = useState(null);
    
    //async function
    const getEnrolledCourses = async() =>{
        try{
            const response = await getUserEnrolledCourses(token);
            console.log(response);
            setEnrolledCourses(response);
        }catch(error){
            console.log("Unable to fetch Enrolled Courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    },[]);

  return (
    <div className='text-richblack-5 w-[70%]  mx-auto'> 
        <h1 className="mb-6 text-3xl font-medium text-richblack-5">
        Enrolled Courses
        </h1>
        {
            !enrolledCourses ? (<div>
                Loading...
                </div>)
            :!enrolledCourses.length ? (<p className='text-2xl'>You have not enrolled in any course yet!!</p>)
            :(
                <div className='flex-col bg-richblack-800 text-start w-[100%] border-[1px] border-richblack-700  justify-between  rounded-lg text-richblack-50 text-sm'>
                    <div className='flex bg-richblack-800 text-start w-[100%] p-4 border-b-[1px] border-richblack-700  justify-between  rounded-lg font-semibold text-base'>
                        <div>Course Name</div>
                        <div>Course Duration</div>
                        <div>Progress</div>
                        <div></div>
                    </div>
                    {
                        enrolledCourses.map((course)=>(
                            <EnrollCourseCard course={course} key={course._id}/>
                        ))
                    }
                </div>
            )
        }
    </div>
    
  )
}

export default EnrolledCourses