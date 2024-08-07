import React, { useEffect, useState } from 'react'
import { Link,matchPath } from 'react-router-dom'  
import logo from "../../assets/Logo.svg"
import toast from 'react-hot-toast';
import {NavbarLinks} from "../../data/navbar-links";
import {useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

// const subLinks = [
//   {
//     title:"Python",
//     link:"/catalog/python"
//   },
//   {
//     title:"Web Development",
//     link:"/catalog/we-development"
//   },
//   {
//     title:"Web Development",
//     link:"/catalog/we-development"
//   },
//   {
//     title:"Web Development",
//     link:"/catalog/we-development"
//   },
//   {
//     title:"Web Development",
//     link:"/catalog/we-development"
//   }
// ]

const Navbar = (props) => {
  //kaise fetch kare states use useSelector
  const {token} = useSelector((state)=> state.auth);
  const {user} = useSelector((state)=> state.profile);
  const {totalItems} = useSelector((state) => state.cart)
  
  const location = useLocation();
  
  const [subLinks,setSubLinks] = useState([]);

  const fetchSubLinks = async () =>{
    try{
      const result =await apiConnector("GET",categories.CATEGORIES_API);
      console.log("Printing Sublinks result",result)
      setSubLinks(result.data.data);
      }
      catch(error){
        console.log("could not fetch the Catalog List")
      }
  }

  //API CALL for list of categories
  useEffect(()=>{
      fetchSubLinks();
  },[])  ;


    
  const matchRoute = (route) =>{
      return matchPath({path:route},location.pathname)
    }
    const isLoggedIn=props.isLoggedIn;
    const setIsLoggedIn=props.setIsLoggedIn;
    return (
      <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblue-700 bg-richblack-900 z-10 w-full">
      <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>
      <Link to='/'><img src={logo} width={160} height={32} loading='lazy '/></Link>
      <nav >
        <ul className='flex gap-x-6'>
          {
            NavbarLinks.map((link,index)=>{
             return <li key={index}>
                {
                  link.title === "Catalog" ? (
                  <div className=' flex relative items-center group gap-2 cursor-pointer text-richblack-50 '>
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle/>
                      {/* //width needed to be handle for mobile */}
                      <div className='invisible absolute left-[50%] top-[50%] 
                      flex flex-col translate-x-[-50%] mt-5   rounded-md bg-richblack-50 p-4 text-richblack-900 opacity-0 transition-all duration-200 
                      group-hover:z-10
                      group-hover:visible group-hover:opacity-100 lg:w-[300px]' >
                          <div className='invisible absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%]  h-6 w-6 rotate-45  rounded-md bg-richblack-50 opacity-0 transition-all duration-100 
                          group-hover:z-10
                          group-hover:visible group-hover:opacity-100'>
                          </div>
                          {
                          subLinks.length ? (
                            
                              subLinks.map((subLink, index) =>(
                      
                                <Link to={`/catalog/${subLink._id}`} key={index} className='p-2 '> {subLink.name}</Link>
                              ))
              
                          ) : (<div> </div>)
                        }
                      </div>
                      
                  </div>):
                  (
                    <Link to={link?.path}>
                      <p className={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-50"}`}>
                        {link.title}
                      </p>
                    </Link>
                  )
                }
              </li>
            })
          }
        </ul>
      </nav>
       
      {/* Login Signup DashBoard */}
      <div className='flex items-center  gap-x-4'>
        {
          user && user?.accountType != "Instructor" && (
          //Styling remaining of icon and span both 
            <Link to="/dashboard/wishlist" className='relative text-white text-2xl'>
              <AiOutlineShoppingCart/>
              {
                totalItems > 0 && (
                  <span className='absolute text-sm font-semibold text-white px-1 rounded-full bg-caribbeangreen-200 -top-2 left-4 z-2 animate-bounce '>
                    {totalItems}
                  </span>
                )
              }
            </Link>
          )
        }
        {
          token === null && (
            <Link to="/login">
                <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700' >Login</button>
            </Link>
          )
        }
        {
          token === null && (
            <Link to="/signup">
                <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700' >Signup</button>
            </Link>
          )
        }
        {
          token !== null && <ProfileDropDown />
        }
        
        
        
        
        {/* {
          !isLoggedIn &&  
          <Link to="/login">
                <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700' >Login</button>
          </Link>
        }
        {
            !isLoggedIn &&
            <Link to="/signup">
                <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700' >Signup</button>
            </Link>
        }
        {
            isLoggedIn &&
            <Link to="/">
                <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'
                onClick={()=>{
                  setIsLoggedIn(false);
                  toast.success("Logged Out");
                }} >Logout</button>
             </Link>
        }
        {
            isLoggedIn &&
            <Link to="/dashboard">
                <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'  >Dashboard</button>
            </Link>
        } */}
      </div>
    </div>
      </div>
   
)

}

export default Navbar