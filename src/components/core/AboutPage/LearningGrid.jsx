import React from 'react'
import HighlightText from '../Homepage/HighlightText';
import CTAButton from "../../core/Homepage/Button"

const LearningGrid = () => {
    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "CodeWay partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "The learning process uses the namely online and offline.",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "You will get a certificate that can be used as a certification during job hunting.",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
        },
      ];
  return (
    <div className='grid mx-auto grid-col-1 lg:grid-cols-4 grid-row-2'>
        {
            LearningGridArray.map((card,index)=>{
                return (
                    <div
                    key={index}
                    className={`${index===0 && "lg:col-span-2"} ${card.order % 2 === 1 ? 'bg-richblack-700': 'bg-richblack-800'}
                                ${card.order<0 && 'bg-richblack-900'}
                                ${card.order === 3 && "lg:col-start-2"} h-[300px] p-5`}
                    >
                    {
                        card.order < 0 
                        ? (
                            <div className='flex flex-col gap-4 w-[90%]'> 
                                <div className='text-3xl text-richblack-25 w-[85%] font-semibold'>
                                    {card.heading}
                                    <HighlightText text={` `+card.highlightText} />
                                </div>
                                <p className='text-richblack-300'>
                                    {card.description}
                                </p>
                                <div className='mt-5 w-fit'>
                                    <CTAButton active={true} linkto={card.BtnLink}>
                                        {card.BtnText}
                                    </CTAButton>
                                </div>
                            </div>
                        )
                        :(
                            <div className='flex flex-col justify-between gap-4 p-3'>
                               <h1 className='text-lg font-semibold w-[70%] h-[90px] text-richblack-25'>
                                    {card.heading}
                                </h1> 
                                <p className='text-richblack-100 font-thin'>
                                    {card.description}
                                </p>
                            </div>
                        )
                    }
                    </div>)
        })
    }
    </div>)
}

export default LearningGrid