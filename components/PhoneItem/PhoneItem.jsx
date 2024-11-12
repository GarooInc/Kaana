import React from 'react'
import {FaPhone } from "react-icons/fa"

const PhoneItem = ({name, p1, p2, link1, link2}) => {
  return (
    <div className='flex items-center md:w-1/2 w-full gap-2 pb-4'>
        <FaPhone className='mr-2 text-primary text-2xl' />
        <span className='md:text-sm text-xs text-primary font-futura'>{name}:<br></br> { p1 && <a className='font-futura md:text-sm text-xs ' href={link1}>{p1}</a> } <br></br> { p2 && <a className='underline font-futura text-sm'  href={link2}>{p2}</a> }</span>
    </div>

  )
}

export default PhoneItem