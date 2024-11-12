import React from 'react'

const FooterItem = ({transparent, logo, fixed}) => {
  return (
    <div className={`w-full flex justify-center items-center p-4 ${fixed ? 'fixed' : 'absolute'} bottom-0 ${transparent ? 'bg-transparent' : 'bg-white'}`}>
        {
          logo? <img src={`/assets/images/logo_${logo}.png`} alt="logo" className="w-[100px]" /> : 
          <div className='w-full flex justify-center items-center'>
            <span className="text-md text-primary font-futura p-4">Kaana Resort & Spa</span>
          </div>
        }
    </div>
  )
}

export default FooterItem