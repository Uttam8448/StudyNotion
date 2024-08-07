import React from 'react'
import HighlightText from "../components/core/Homepage/HighlightText"
import BannerImg1 from "../assets/Images/aboutus1.webp";
import BannerImg2 from "../assets/Images/aboutus2.webp";
import BannerImg3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from '../components/core/AboutPage/Stats';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactFormSection  from '../components/core/AboutPage/ContactFormSection';
import Footer from "../components/common/Footer"

const About = () => {
  return (
    <div className='mt-[100px]  flex flex-col gap-14'>
        {/* Section 1 */}
        <section className='w-11/12 max-w-[1160px] mx-auto'>
            <div className='mx-auto text-center flex flex-col gap-5 '>
                <header className='text-4xl text-richblack-50 w-[70%] font-semibold text-center mx-auto '>
                    Driving Innovation in Online Education for a <br/>
                    <HighlightText text={" Brighter Future"}/>
                    <p className='text-base text-richblack-300 font-medium mt-4'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>
                <div className='flex gap-4 justify-center'>
                    <img src={BannerImg1} alt="Banner 1" className='w-1/3 shadow-[0_0_3px_3px_rgba(51,255,255,0.3)]' />
                    <img src={BannerImg2} alt= "Banner 2" className='w-1/3 shadow-[0_0_3px_3px_rgba(51,255,255,0.3)]'/>
                    <img src={BannerImg3} alt="Banner 3" className='w-1/3 shadow-[0_0_3px_3px_rgba(51,255,255,0.3)]'/>
                </div>
            </div>
        </section>
        {/* Section 2 */}
        <section className='w-11/12 max-w-[1160px] mx-auto'>
            <div>
                <Quote/>
            </div>
        </section>
        {/* Section 3 */}
        <section className='w-11/12 max-w-[1160px] mx-auto'>
            <div className='flex flex-col gap-24 w-[90%] mx-auto mt-[100px]'>
                <div className='flex justify-between'>
                    <div className='w-[40%] flex flex-col gap-4 text-richblack-300'>
                        <h1 className='text-4xl text-pink-300 font-medium'> Our founding Story</h1>
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    <div className='my-auto shadow-[0_0_6px_6px_rgba(239,71,111,0.3)] w-[40%]'>
                        <img src={FoundingStory}></img>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-[40%] flex flex-col gap-4 text-richblack-300 text-left'>
                        <h1 className='text-4xl text-yellow-100 font-medium'> Our Vision</h1>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className='w-[40%] flex flex-col gap-4 text-richblack-300 text-left'>
                        <h1 className='text-4xl text-aqua font-medium'> Our Mission</h1>
                        <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </section>
        {/* Section 4 */}
        <section className='bg-richblack-800 h-[200px] '>
        <StatsComponent/>
        </section>
        {/* Section 5 */}
        <section className='w-11/12 max-w-[1160px] mx-auto flex flex-col gap-28'>
            <LearningGrid/>
            <ContactFormSection/>
        </section>
        <section>
        <h2 className='text-center text-richblack-50 text-4xl font-semibold mt-10 bg-richblack-900'>Review from Other Learners</h2>
        </section>
        <Footer/>
    </div>
  )
}

export default About