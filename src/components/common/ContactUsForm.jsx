import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
// import apiConnector from "../../../"
import countryCodes from "../../data/countrycode.json";


const ContactUsForm = () => {

    const [loading,setLoading] = useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful},
    }=useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data ",data);
        try{
          setLoading(true);
          // const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
          const response={status:"OK"}
          console.log("Response :", response);
          setLoading(false);
        }catch(error){
            console.log("ERROR ",error.message);
            setLoading(false);
        }
    }

    useEffect (()=>{
        if(isSubmitSuccessful){
          reset({
            email:"",
            firstname:"",
            lastname:"",
            message:"",
            countrycode:countryCodes[0].code,
            phonenumber:"",
          },[reset,isSubmitSuccessful]);
        }
    })

  return (
    <form onSubmit= {handleSubmit(submitContactForm)}> 
        <div className='flex flex-col gap-6 text-richblack-50 items-center text-left mx-auto p-4  '>
          <div className='flex gap-2 justify-evenly w-[100%] m-1'>
            <div className='flex flex-col gap-2 border-b-1 border-richblack-300 w-[45%] '>
                <label htmlFor='firstname'>First Name</label>
                <input 
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Enter First Name"
                  {...register("firstname",{required:true})}
                  className='p-3 rounded-md bg-richblack-800  '
                />
            </div>
            <div className='flex flex-col gap-2 w-[45%]'>
                <label htmlFor='lastname'>Last Name</label>
                <input 
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Enter Last Name"
                  {...register("lastname")}
                  className='p-3 rounded-md bg-richblack-800  '
                  //optional therefore required not true
                />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-[95%] m-1'>
              <label htmlFor='email'>Email Address</label>
              <input 
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address"
                {...register("email",{required:true})}
                className='p-3 rounded-md bg-richblack-800  '
              />
              {
                errors.email && (
                  <span>
                    Please enter your email address
                  </span>
                )
              }
          </div>
          <div className='flex flex-col gap-2 w-[95%]'>
          <label htmlFor='phone'>Phone Number</label> 
            <div className='flex flex-row gap-5 w-[100%]'>
            
              <select
                name='dropdown'
                id="dropdown"
                {...register("countrycode",{required:true})}
                className='p-3 rounded-md bg-richblack-800 w-[15%]'
              >
                {
                  countryCodes.map((element,index)=>{
                    return(
                      <option key={index} value={element.code}>
                        {element.code} -{element.country}
                      </option>
                    )
                  })
                }
              </select>
              <div className='w-[89%]'>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder='12345 67890'
                {...register("phonenumber",{required:{value:true,message:"Please enter PhoneNumber"},
                                            maxLength:{value:10, message:"Invalid Phone Number"},
                                            minLength:{value:8, message:"Invalid Phone Number"}}

                )}
                className='p-3 rounded-md bg-richblack-800 text-richblack-100 w-full'
              />
              </div>
            </div>
           
          </div>

          <div className='flex flex-col gap-2 w-[95%]'>
              <label htmlFor='message'>Message</label>
              <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="7"
                  placeholder="Enter Your Message here"
                  {...register("message",{required:true})}
                  className='p-3 rounded-md bg-richblack-800  '
              />
              {
                errors.message && (
                  <span>
                    Please Enter Your Message
                  </span>
                )
              }
          </div>
          <button type="submit" className='bg-yellow-50 text-black shadow-richblack-300 p-3 rounded-md w-[95%] font-semibold'>
                  Send Message
          </button>
        </div>
    </form>
  )
}

export default ContactUsForm