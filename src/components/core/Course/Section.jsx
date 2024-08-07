import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Section = ({section,setVideoURL}) => {
    const [subSectionflag,setSubSectionflag] = useState(false);
    function clickHandler(e){
        e.preventDefault();
        setVideoURL(section?.SubSection[0]?.videoUrl);
    }
    return (
    <button className='p-2 bg-richblack-600 rounded-lg w-full m-2' onClick={(e)=>clickHandler(e)}>
        {section.sectionName}
    </button>
  )
}

export default Section