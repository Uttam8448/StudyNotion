import React from 'react'
import Footer from '../components/common/Footer'
import ContactUsForm from '../components/common/ContactUsForm'
import { IoIosChatboxes } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { IoMdCall } from "react-icons/io";

const ContactUs = () => {
  return (
    <div>
        <div className='relative mx-auto  flex w-11/12 max-w-[1160px] gap-8 text-white justify-between mt-[30px]'>
            <div className='w-[40%] h-fit bg-richblack-800  p-8 rounded-xl text-richblack-300 flex flex-col gap-8'>
                <div>
                    <div className='flex gap-1 items-center'>
                        <IoIosChatboxes className='text-4xl'/>
                        <h2 className='text-richblack-25 text-xl font-semibold'>Chat on us</h2>
                    </div>
                    <p className='w-[70%] text-base font-medium mx-10'>Our friendly team is here to help. @mail address</p>
                </div>
                <div>
                    <div className='flex gap-1 items-center'>
                            <BiWorld className='text-4xl'/>
                            <h2 className='text-richblack-25 text-xl font-semibold'>Visit us</h2>
                    </div>
                    <p className='w-[70%] text-base font-medium mx-10'>Come and say hello at our office HQ. Here is the location/ address</p>
                </div>
                <div>
                    <div className='flex gap-1 items-center'>
                            <IoMdCall className='text-4xl'/>
                            <h2 className='text-richblack-25 text-xl font-semibold'>Chat on us</h2>
                    </div>
                    <p className='w-[70%] text-base font-medium mx-10'>Mon - Fri From 8am to 5pm. +1234567890</p> 
                </div>
            </div>
            <div className='p-6 border-[1px] border-richblack-400 rounded-md'>
                <div className='px-6'>
                    <h1 className='text-3xl text-left text-richblack-25 font-semibold pb-3'>
                    Got a Idea? We’ve got the skills.<br/> Let’s team up
                    </h1>
                    <p className='text-richblack-300 text-left'>Tell us more about yourself and what you’re got in mind.</p>
                </div>
                <div className='mt-2 border-1 '>
                    <ContactUsForm />
                </div>
            </div>
        </div>
        <div className=''>
            <h2 className='text-center text-richblack-50 text-4xl font-semibold mt-10 bg-richblack-900'>Review from Other Learners</h2>
        </div>
        <Footer/>
    </div>
  )
}

export default ContactUs