import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({children,active,linkto}) => {
  return (
    <Link to={linkto}>
      <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold shadow-sm hover:shadow-none ${active?"bg-yellow-50 text-black shadow-richblack-300":"bg-richblack-800 shadow-richblack-300"} hover:scale-95  transition-all duration-200 flex items-center gap-2`}>
        {children}
      </div>
    </Link>
  )
}

export default Button;