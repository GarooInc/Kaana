"use client";
import React from 'react'
import { CgArrowLongRight } from 'react-icons/cg';
import { useRouter } from "next/navigation"



const ButtonNav = ({title, link}) => {
    const router = useRouter()
    
    const handleClick = () => {
        router.push(link)
    }
  return (
    <div className="w-80 h-16 cursor-pointer">
      <div className="p-4 flex font-futura font-light text-secondary bg-primary/60 rounded-full" onClick={handleClick}>
          <span className='flex justify-between w-full'>{title} <CgArrowLongRight className="inline-block text-xl" /></span>
      </div>
  </div>

  )
}

export default ButtonNav