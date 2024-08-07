import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto text-center w-[60%] flex flex-col gap-2 justify-center'>
        <div>
            <h1 className='text-3xl text-richblack-25 font-semibold'>
                Get in Touch
            </h1>
            <p className='text-richblack-300 text-center'>We’d love to here for you, Please fill out this form.</p>
        </div>
        <div className='mt-8 '>
            <ContactUsForm />
        </div>
    
    
    </div>
  )
}

export default ContactFormSection