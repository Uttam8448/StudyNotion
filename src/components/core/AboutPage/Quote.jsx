import React from 'react'
import HighlightText from '../Homepage/HighlightText'

const Quote = () => {
  return (
    <div className='mt-20'>
        <p className='text-3xl font-semibold text-center text-richblack-50'>We are passionate about revolutionizing the way we learn. Our innovative platform<HighlightText text={"combines technology"}/>,<span className='text-orange'>expertise</span> , and community to create an <span className='text-yellow-100'>unparalleled educational experience</span>.</p>
    </div>
    
  )
}

export default Quote