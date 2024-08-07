import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../slices/cartSlice';
import { apiConnector } from '../../services/apiconnector';
import { studentEndpoints } from '../../services/apis';
import toast from 'react-hot-toast';

const CourseCard = ({course}) => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function addToCartHandler(e){
        e.preventDefault();
        if(token){
            dispatch(addToCart(course));
        }
        else{
            navigate("/login")
        }
    }
    async function enrollHandler(e){
        e.preventDefault();
        console.log("COURSE ID",course._id);
        console.log("USER Id",user._id);
        if(token){
            const result=await apiConnector("POST",
                studentEndpoints.COURSE_ENROLL_API,
                {
                    courseId:course._id,
                    userId:user._id,
                    token:token,
                }
            )
            if(result?.data?.success){
                toast.success("Successfully Enrolled")
            }
            else{
                toast.error("Already Enrolled")
            }
        }
        else{
            navigate("/login")
        }
    }
  return (
    <div key={course._id} className='w-[370px] h-[500px] p-8 flex flex-col gap-2 border-[1px] border-richblack-700 rounded-lg bg-richblack-800 justify-between'>
        <img src={course.thumbnail} alt={"Courseimage"} className='w-[400px] h-[200px] rounded-lg border-[1px] border-richblack-600'/>
        <p className='text-xl text-left font-semibold text-richblack-25'>{course.courseName}</p>
        <div className='flex flex-col gap-2'>
        <p className='text-xl text-richblack-25 text-left font-medium'>Rs.{course.price}.00</p>
        <button className='flex items-center justify-center hover:scale-95 text-md bg-yellow-200 transition-all duration-200 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 text-lg' onClick={(e)=>{addToCartHandler(e)}}> <AiOutlineShoppingCart className='text-2xl -p-1'/>Add To Cart</button>
        <button className='flex items-center justify-center hover:scale-95 text-md bg-caribbeangreen-300 transition-all duration-200 cursor-pointer gap-x-2 rounded-md  py-2 px-5 font-semibold text-richblack-900 text-lg'onClick={(e)=>{enrollHandler(e)}}>Enroll Now</button>
        </div>
        </div>
  )
}

export default CourseCard;