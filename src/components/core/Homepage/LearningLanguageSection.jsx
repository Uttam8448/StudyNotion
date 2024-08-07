import React from 'react'
import HighlightText from './HighlightText';
import knowYourProgress from "../../../assets/Images/Know_your_progress.png"
import compareWithOthers from "../../../assets/Images/Compare_with_others.png"
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
      <div className='flex flex-col gap-5 items-center lg:flex md:flex-wrap sm:flex-wrap'>
          <div className='text-4xl font-semibold text-center '>
            Your Swiss Knife for 
            <HighlightText text={" learning any language"}/>
          </div>
          <div className='text-center text-richblack-600 mx-auto text-base lg:w-[70%] md:w-[80%] sm:w-[80%]'>
            Using spin making learning multiple easy. With 20+ languags realistic voice-over,
            progress tracking, custom schedule and more.
          </div>
          <div className='flex flex-row items-center mt-5 lg:flex md:flex-wrap sm:flex-wrap sm:justify-center'>
            <img
              src={knowYourProgress}
              alt="KnowYourProgressImage"
              className='object-contain lg:-mr-32 lg:ml-12 sm:ml-0 sm:mr-0' 
            />
             <img
              src={compareWithOthers}
              alt="CompareWithOthersImage"
              className='object-contain'
            />
             <img
              src={planYourLesson}
              alt="PlanYourLessonsImage"
              className='object-contain lg:-ml-32 sm:ml-0'
            />
          </div>
          <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
              <div>
                  Learn More
              </div>
            </CTAButton>
          </div>
          
      </div>
    </div>
  )
}

export default LearningLanguageSection