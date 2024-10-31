import React from 'react'
import { TbHandClick } from "react-icons/tb"

const ChatBubble = () => {
  return (
    <div className="fixed bottom-4 cursor-pointer bg-tertiary">
      <a href="https://wa.me/5016101329" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center px-4 py-2 gap-2'>
            <span className='text-white font-futura uppercase text-sm'>Chat with concierge</span>
      </a>
    </div>
  )
}

export default ChatBubble