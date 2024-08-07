import React from 'react'
import { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import {sendOtp,signUp} from '../services/operations/authAPI'

const VerifyEmail = () => {
    const [otp,setOtp] = useState("");
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const {signupData,loading} = useSelector((state) => state.auth);
    
    useEffect ( () => {
        if(!signupData){
            navigate("/signup");
        }
    })
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const {accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
        }   =   signupData;
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }
  
    return (
    <div className='text-white flex justify-center items-center w-[35%] mx-auto my-auto -translate-y-[20%]'>
        {
            loading ? (
                <div>
                    Loading...
                </div>
            ):(<div className='flex flex-col gap-5 w-[80%]'>
                
                    <h1 className='text-3xl font-semibold'> Verify Email</h1>
                    <p className='text-richblack-300 w-3/4 '>A verification code has been sent to you on your email. Enter the code below</p>
                    <form onSubmit={handleOnSubmit} className='text-white mx-auto'>
                        {/* not give padding to input in OTPInput it doesnt work then */}
                        <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) =>(<div className='bg-richblack-800 rounded-md '><input {...props} className='bg-richblack-800 text-white text-3xl w-[100%] h-[100%] rounded-md'/></div>) }
                        
                        />
                        <button type='submit' className='w-full text-center text-[13px] px-6 py-3 rounded-md font-bold shadow-sm hover:shadow-none bg-yellow-50 text-black shadow-richblack-300 hover:scale-95  transition-all duration-200 gap-2 mt-8'> 
                            Verify Email
                        </button>
                    </form>
                    <div className='flex justify-between'>
                        <Link to ="/login">
                        <div className='flex items-center gap-2'>
                        <FaLongArrowAltLeft />
                        <p>Back to Login</p>
                        </div>
                        </Link>
                    
                    <button
                    onClick={()=>dispatch(sendOtp(signupData.email,navigate))}
                    className='text-blue-100'
                    >
                        Resend it
                    </button>
                    </div>
            </div>)
        }
    </div>
  )
}

export default VerifyEmail