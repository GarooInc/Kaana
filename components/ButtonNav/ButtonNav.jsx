"use client";
import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation"



const ButtonNav = ({title, link, className}) => {
    const router = useRouter()
    
    const handleClick = () => {
        router.push(link)
    }
  return (
    <div className="w-80 h-16 cursor-pointer">
      <div className={`p-4 flex font-futura font-light border-t-2 h-full border-quaternary text-quaternary ${className}`} onClick={handleClick}>
          <span className='flex justify-between w-full uppercase'>{title} <IoIosArrowForward className="inline-block text-xl text-tertiary" /></span>
      </div>
  </div>

  )
}

export default ButtonNav