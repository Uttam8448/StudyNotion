import React from 'react'


const Stats = [
  {count:"5K",label:"Active Students"},
  {count:"10+",label:"Mentors"},
  {count:"200+", label:"Courses"},
  {count:"100+", label:"Awards"}
];

const StatsComponent = () => {
  return (
      <div className='w-11/12 max-w-[1160px] h-[200px] mx-auto'>
        <div className='flex justify-evenly h-full items-center mx-auto '>
            {
                Stats.map((data,index)=>(
                    <div key={index} className='w-[150px] h-[50px] text-white text-center flex flex-col gap-1 ' >
                      <h1 className='text-xl font-semibold'>
                      {data.count}
                      </h1>
                      <h1 className='text-richblack-400'>
                      {data.label}
                      </h1>                   
                    </div>
                ))
            }
        </div>
      </div>
  )
}

export default StatsComponent;