import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from "../components/core/Homepage/HighlightText"
import CTAButton from '../components/core/Homepage/Button';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import Footer from "../components/common/Footer"
import ExploreMore from '../components/core/Homepage/ExploreMore';


const Home = () => {
  return ( 
    <div>
        {/* <Navbar/> */}
        {/* Section 1 */}
        <div className=' relative mx-auto max-w-maxContent flex-col w-11/12 items-center text-white justify-between'>
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all ease-in-out duration-200 hover:scale-95 hover:shadow-none w-fit shadow-sm shadow-richblack-300 '>
                    <div className='flex gap-2 items-center group-hover:bg-richblack-900  px-10 py-[5px] rounded-full '>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>
            <div className='text-center font-semibold text-5xl mt-7'>
                <HighlightText text={"Code"} />
                Your Future
            </div>
            <div className=' max-w-[60%] mt-4 mx-auto text-center text-richblack-200 font-semibold'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>
            <div className='flex flex-row justify-center gap-7 mt-8 '>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>
            <div className='my-12  mx-3 shadow-[0_0_10px_10px_rgba(51,255,255,0.2)] '>
                <video  muted loop autoPlay className='shadow-[12px_12px_0_0] shadow-white'>
                    <source src={Banner} type="video/mp4"/>
                </video>
            </div>
            {/* Code Section 1 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your <HighlightText text={"coding potential"}/> with our online courses.
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText:"Try it Yourself"
                            ,linkto:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More"
                            ,linkto:"/login",
                            active:false
                        }
                    }
                    codeblock={`<!DOCTYPE html>
                                <html lang="en">
                                <head>
                                <title>This is CodeWay's website</title>
                                </head>
                                <body>
                                <h1><a href="/">HELLO!</a></h1>
                                <nav> Enter in the World of Coding
                                </nav>
                                </body>
                                </html>`}
                    codeColor={"text-yellow-50"}
                    backgroundGradient={"bgCodeblock1"}
                />
            </div>
            {/* Code Section 2 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start <HighlightText text={"Coding"}/>in<HighlightText text={"Seconds."}/>
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText:"Continue Lesson"
                            ,linkto:"/login",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More"
                            ,linkto:"/login",
                            active:false
                        }
                    }
                    codeblock={`import React from 'react';
                                function Greeting(props) {
                                return (
                                    <div>
                                    <h1>Hello!!</h1>
                                    <p>Welcome to "CodeWay" website.</p>
                                    <p>Enter into the World of coding with CodeWay</p>
                                    </div>
                                );
                                }
                                export default Greeting;`}
                    codeColor={"text-aqua"}
                    backgroundGradient={"bgCodeblock2"}
                />
            </div>
            <ExploreMore/>
        </div>

        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 pb-10 ' >
            <div className='homepage_bg h-[310px] '>
                <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-5'>
                    <div className='h-[150px]'></div>
                    <div className='flex gap-7 text-white '>
                        <CTAButton active={true} linkto={"/signup"} >
                            Explore Full Catalog <FaArrowRight/>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            Learn More <FaArrowRight/>
                        </CTAButton>
                    </div>
                </div>
            </div>
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7 '>
                <div className='flex flex-row gap-5 mb-10 mt-[95px] md:flex-wrap sm:flex-wrap sm:text-center sm:justify-center'>    
                    <div className='text-4xl font-semibold w-[45%] md:w-[80%] sm:w-[80%]'>
                        Get the skills you need for a 
                        <HighlightText text={"Job that is in demand"}/>
                    </div>
                    <div className='flex-col  w-[40%] gap-10 items-start  sm:w-[80%] md:w-[80%] md:justify-center sm:justify-center'>
                        <div className='text-[16px]'>
                            The modern CodeWay is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                        <div className='h-[40%]'></div>
                        <div className='w-fit sm:mx-auto'><CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton></div>
                    </div> 
                </div>
                <TimelineSection/>   
                <LearningLanguageSection/>                
            </div> 
        </div>

        {/* Section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
            <InstructorSection />
            <h2 className='text-center text-4xl font-semibold mt-10 bg-richblack-900'>Review from Other Learners</h2>
        </div>

        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default Home

