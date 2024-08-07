export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center hover:scale-95 text-md transition-all duration-200 ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }
  /*
  <Link to={linkto}>
      <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold shadow-sm hover:shadow-none ${active?"bg-yellow-50 text-black shadow-richblack-300":"bg-richblack-800 shadow-richblack-300"} hover:scale-95  transition-all duration-200 flex items-center gap-2`}>
        {children}
      </div>
    </Link>*/