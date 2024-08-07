import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from "./Button";

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-20 bg-richblack-900 lg:flex md:flex sm:flex-wrap-reverse'>
            <div className='lg:w-[45%] md:w-[45%] sm:w-[70%] sm:mx-auto h-fit shadow-[-12px_-12px_rgb(255,255,255)] '>
                <img src={Instructor}
                    alt=""
                />
            </div>
            <div className='lg:w-[45%] md:w-[100%] sm:w-[100%] flex flex-col justify-center gap-10 '>
                <div className='sm:w-[100%] text-center text-4xl font-semibold '>
                        Become an
                        <HighlightText text={"Instructor"}/>
            
                </div>
                <div className='sm:w-[100%] sm:text-center'>
                    <p className='font-medium text-[16px] w-[70%] text-richblack-300 sm:mx-auto'>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                        Start Teaching Today
                    </p>
                </div>
                
                <div className='w-fit sm:mx-auto'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2 w-fit items-center'>
                            Start Teaching Today <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
                

            </div>
        </div>
    </div>
  )
}

export default InstructorSection