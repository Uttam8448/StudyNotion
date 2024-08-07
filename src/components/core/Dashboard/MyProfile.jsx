import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../Homepage/Button'
import { MdEditNote } from "react-icons/md";

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
  return (
    <div className=' text-richblack-5 w-[70%]  mx-auto'>
        <h1 className="mb-5 text-3xl font-medium text-richblack-5">
        My Profile
        </h1>
        {/* section 1 */}
        <div className=' my-6 h-full flex flex-col gap-4 items-center '>
            <div className="flex bg-richblack-800 w-[100%] border-[1px] border-richblack-700  p-10 justify-between items-center rounded-lg ">
                <div className='flex gap-4 items-center'>
                    <img 
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[70px] rounded-full object-cover' />
                    <div>
                        <p className='font-semibold'> {user?.firstName + " " + user?.lastName} </p>
                        <p className='text-richblack-300 text-sm'> {user?.email}</p>
                    </div>
                </div>
                <IconBtn
                    text="Edit"
                    active={true}
                    linkto={"/dashboard/settings"}
                    className="p-1 "><MdEditNote className='text-2xl'/>Edit

                </IconBtn>
            </div>

            {/* section 2 */}
            <div className='w-[100%] bg-richblack-800 rounded-lg p-10 items-center flex-col border-[1px] border-richblack-700'> 
                <div className='flex justify-between items-center pb-4'>
                    <p className='font-semibold'>About</p>
                   <div className='w-fit'> <IconBtn
                    text="Edit"
                    active={true}
                    linkto={"/dashboard/settings"}
                    > <MdEditNote className='text-2xl'/>Edit</IconBtn></div>
                </div>
                <p className={`${user?.additionalDetails?.about?"text-richblack-25 ":"text-richblack-100"} text-sm`}> {user?.additionalDetails?.about  ??  "Write Something about Yourself"}</p>
            </div>

            {/* section 3 */}
            <div className='flex-col bg-richblack-800 w-[100%] p-10 rounded-lg border-[1px] border-richblack-700'>
                <div className='flex justify-between items-center'>
                    <p className='font-semibold'>Personal Details</p>
                    <IconBtn
                    text="Edit"
                    active={true}
                    linkto={"/dashboard/settings"}
                    ><MdEditNote className='text-2xl'/> Edit</IconBtn>
                </div>
                <div className='w-[70%]  flex justify-between py-1 px-1 text-sm'>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <p className='text-richblack-400 '>First Name</p>
                            <p>{user?.firstName}</p>
                        </div>
                        <div>
                            <p className='text-richblack-400 '>Email</p>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <p className='text-richblack-400 '>Gender</p>
                            <p className={`${user?.additionalDetails?.gender?"text-richblack-25":"text-richblack-100"}`}>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <p className='text-richblack-400 '>Last Name</p>
                            <p>{user?.lastName}</p>
                        </div>
                        <div>
                            <p className='text-richblack-400 '>Phone Number</p>
                            <p className={`${user?.additionalDetails?.contactNumber ?"text-richblack-25":"text-richblack-100"}`}>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                        </div>
                        <div>
                            <p className='text-richblack-400 '>Date of Birth</p>
                            <p className={`${user?.additionalDetails?.dateOfBirth ?"text-richblack-25":"text-richblack-100"}`}>{String(user?.additionalDetails?.dateOfBirth).slice(0,10)
                             ?? "Add Date of Birth"}</p>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>

      
    </div>
  )
}

export default MyProfile
