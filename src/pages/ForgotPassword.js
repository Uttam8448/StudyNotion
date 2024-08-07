import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
  const [emailSent,setEmailSent] = useState(false);
  const [email,setEmail] = useState("");
  const {loading} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent));
  }

  return (
    <div className='text-white flex justify-center items-center w-[35%] mx-auto my-auto -translate-y-[20%]'>
      {
        loading ? (
            <div>
              Loading...
            </div>
        ) : (
            <div className='w-[75%] flex flex-col gap-5'>
              <h1 className='text-3xl font-semibold'>
                {
                  !emailSent ? "Reset Your Password" : "Check Your Email"
                }
              </h1>
              <p className='text-richblack-300 w-3/4 '>
                {
                  !emailSent 
                  ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                  : `Check email We have sent the reset email to ${email}`
                }
              </p>
              <form onSubmit={(e)=>{handleOnSubmit(e)}}>
                {
                  !emailSent && 
                  <label>
                    <p>Email Address<sup className='text-pink-300'>*</sup></p>
                    <input
                    required
                    type='email'
                    name='email'
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                    placeholder='Enter your Email Address'
                    className='w-full bg-richblack-700 rounded-md p-3'
                    >
                    
                    </input>
                    </label>
                  
                }
                <button className='w-full text-center text-[13px] px-6 py-3 rounded-md font-bold shadow-sm hover:shadow-none bg-yellow-50 text-black shadow-richblack-300 hover:scale-95  transition-all duration-200 gap-2 mt-8'>
                      {
                        !emailSent ? "Reset Password":"Resend Email"
                      }
                    </button>
              </form>
              <div>
                    <Link to ="/login">
                    <div className='flex items-center gap-2'>
                      <FaLongArrowAltLeft />
                      <p>Back to Login</p>
                      </div>
                    </Link>
                  </div>
            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword;