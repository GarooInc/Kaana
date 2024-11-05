import React from 'react'
import ArrowBack from '@/components/ArrowBack/ArrowBack'

const HeaderItem = ({v, nav, principal,transparent, whiteArrow}) => {
  return (
    <div className={`w-full flex justify-center items-center  relative py-10 ${transparent ? 'bg-transparent' : 'bg-white'}`}>
        {
          !principal && <ArrowBack absolute nav={nav ? nav : '/menu'} white={whiteArrow} />
        }
        <div className='flex flex-col justify-center items-center'>
          <img src={`/assets/images/logo_${v}.png`} alt="logo" className="md:w-36 w-28" />
        </div>
    </div>
  )
}

export default HeaderItem