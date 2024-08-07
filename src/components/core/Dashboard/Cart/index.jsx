import react from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = ()=>{
    const {total,totalItems} = useSelector((state)=>state.cart);
    
 return(
    <div className="text-richblack-50 w-[100%] pl-[15%] mx-auto tracking-wide">
        <h1 className="mb-5 text-3xl font-medium text-richblack-5">Your Cart</h1>
        <p className="text-base">Total Items in the cart :{` `+totalItems}</p>
        {
            total > 0 ?
            (<div className="mt-6 pt-6 flex justify-between border-t-[1px] border-richblack-700">
                <RenderCartCourses />
                <RenderTotalAmount/>
            </div>)
            :(
                <div className="pt-6 w-full h-full mx-auto my-auto text-2xl">
                    <p>Your Cart is Empty!!</p>
                </div>
            )
        }
    </div>
 )   
}    
export default Cart;