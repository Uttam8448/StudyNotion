import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";

const UpdatePassword = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    const [showPassword,setShowPassword]=useState(false);  
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const {loading} = useSelector((state) => state.auth);
    const {password,confirmPassword} = formData; 
    const handleOnChange = (e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        )   
        )
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
    }
  return (
    <div className='text-white flex justify-center items-center w-[35%] mx-auto my-auto -translate-y-[20%]'>
        {
            loading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className='flex flex-col gap-5 w-[80%]'>
                    <h1 className='text-3xl font-semibold '>Choose New Password</h1>
                    <p className='text-richblack-300 w-3/4 '>Almost done!!,<br/> Enter your new password and youre all set</p>
                    <form onSubmit={handleOnSubmit}>
                        <label className='relative'>
                            <p className='mb-2'>New Password<sup className='text-pink-400'>*</sup></p>
                            <input
                            required
                            type={showPassword ? "text" : "password"}
                            name={password}
                            onChange={handleOnChange}
                            placeholder='Password'
                            className='w-full p-3 bg-richblack-600 text-white rounded-md'
                            />
                            <span className='absolute translate-x-[-130%] translate-y-3 cursor-pointer' onClick={()=>setShowPassword((prev)=> !prev)}>
                                {
                                   showPassword ? <AiFillEyeInvisible fontSize={24}/> :<AiFillEye fontSize={24}/>
                                }
                            </span>
                        </label>
                        <label className='relative'>
                            <p className='mt-2 mb-2'>Confirm New Password<sup className='text-pink-400'>*</sup></p>
                            <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name={confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Confirm Password'
                            className='w-full p-3 bg-richblack-600 text-white rounded-md'
                            />
                            <span className='absolute translate-x-[-130%] translate-y-3 cursor-pointer z-2' onClick={()=>setShowConfirmPassword((prev)=> !prev)}>
                                {
                                   showConfirmPassword ? <AiFillEyeInvisible fontSize={24}/> :<AiFillEye fontSize={24}/>
                                }
                            </span>                    
                        </label>
                        <button type='submit' className='w-full text-center text-[13px] px-6 py-3 rounded-md font-bold shadow-sm hover:shadow-none bg-yellow-50 text-black shadow-richblack-300 hover:scale-95  transition-all duration-200 gap-2 mt-8'>
                                Reset Password
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

export default UpdatePassword;