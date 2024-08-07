import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from "./CourseCard";

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skill Paths",
    "Career Paths"
]


const ExploreMore = () => {
  
    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
    const setMyCards = (value) =>{
        setCurrentTab(value);
        let result;
        for(let i=0;i<HomePageExplore.length;i++){
            if(HomePageExplore[i].tag === value){
                result=HomePageExplore[i];
            }
        }
        setCourses(result.courses);
        setCurrentCard(result.courses.heading);
    }
    return (
    <div>
        <div className='text-4xl text-center'>
            Unlock the <HighlightText text={"Power of Code"}/>
        </div>
        <p className='text-center text-richblack-300 text-md mt-3'>Learn to build anything you can imagine</p>
        <div className='flex flex-row bg-richblack-800 w-fit mx-auto rounded-full  mt-5 border-2 border-richblack-800 ' >
            {
                tabsName.map((element,index) =>{
                    return (
                        <div
                        className={`text-[16px] flex flex-row items-center justify-center gap-2
                            ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium":"text-richblack-200"} 
                            rounded-full transition-all cursor-pointer hover:bg-richblue-900 hover:text-richblack-5 px-7 py-3 `}
                            key={index}
                            onClick={()=>setMyCards(element)}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>
        <div>
            <div className='relative flex flex-row md:flex-wrap sm:flex-wrap sm:translate-y-20 md:translate-y-20 gap-10 justify-between w-full translate-y-[45%] md:justify-center sm:justify-center'>
                {
                    courses.map((element,index)=>{
                        return(
                            <CourseCard
                                cardData={element}
                                currentCard = {currentCard}
                                setCurrentCard = {setCurrentCard}
                                key={index}
                            /> 
                        
                        )
                    })
                }
            </div>
        </div>
       
    </div>
  )
}

export default ExploreMore;