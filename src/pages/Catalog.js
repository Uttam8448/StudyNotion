
import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiconnector';
import {  Link, useParams } from 'react-router-dom'
import { catalogData } from '../services/apis';
import IconBtn from '../components/common/IconBtn';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Footer from '../components/common/Footer';
import CourseCard from '../components/Catalog/CourseCard';

const CatalogPage = () => {
    const [data,setData]=useState([]);
    const {categoryId}=useParams();
    async function fetchData(){
        try{
            const fetchDetails=await apiConnector("POST",
                catalogData.CATALOGPAGEDATA_API,
                {categoryId:categoryId}
            )
            setData(fetchDetails?.data?.data);
        }catch(error){
            console.log(error);
        }
        
    }
   useEffect(()=>{
    fetchData();
   },[categoryId])

  return (
    <div className='w-screen flex flex-col  justify-center mt-5'>
        <h1 className='text-3xl text-richblack-25 font-semibold text-center'>Courses in this Catalog</h1>
        <div className='text-white w-11/12 max-w-[1160px] min-h-screen  flex gap-5 flex-wrap justify-start items-start mx-auto mt-10 mb-10'>
        { 
            data?.length>0 ?
            data?.map((course)=>(
                <CourseCard  course={course} key={course._id}/>
               )) : (
                <div>
                    No Courses Found for this Category!!
                </div>
            )
            
        }
        </div>
        <Footer/>
    </div>
  )
}

export default CatalogPage