import React from 'react'
import { GiNinjaStar } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { RiDeleteBin6Line } from "react-icons/ri";
import {removeFromCart} from "../../../../slices/cartSlice"

const RenderCartCourses = () => {
    const {cart} = useSelector((state)=>state.cart)
    const dispatch=useDispatch();
    return (
    <div className='w-[90%] rounded-lg'>
        {
            cart.map((course,index) => (
                <div key={index} className='py-5 px-2 flex border-b-[1px] border-richblack-700 justify-between gap-2'>
                    <div className='flex gap-4'>
                        <img src={course?.thumbnail} className='w-[225px] h-[150px] rounded-lg border-[2px] border-richblack-700'/>
                        <div className='flex flex-col justify-evenly' >
                            <div>
                                <p className='text-xl font-medium '>{course?.courseName}</p>
                                {/* <p className='text-sm text-richblack-300'>{course?.category}</p> */}
                            </div>
                            <div className='flex gap-2 items-center text-xl'>
                                <span>4.8</span>
                                <ReactStars
                                    count={5}
                                    size={25}
                                    edit={false}
                                    emptyIcon= {<GiNinjaStar/>}
                                    fullIcon = {<GiNinjaStar/>}

                                />
                                <span>{course?.ratingsAndReviews?.length}</span>
                            </div>
                        </div>
                    </div>
                    <div className='p-2 flex flex-col justify-center gap-4'>
                        <button
                            onClick={()=>dispatch(removeFromCart(course._id))}
                            className='text-xl flex gap-2 bg-richblack-800 p-2 rounded-lg items-center'
                        >
                            <RiDeleteBin6Line className='text-orange'/>
                            <span>Remove</span>
                        </button>    
                        <p className='text-xl text-yellow-25 text-center font-inter'>Rs. {course.price}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses