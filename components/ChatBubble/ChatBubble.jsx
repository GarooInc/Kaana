import React from 'react'
import { TbHandClick } from "react-icons/tb"

const ChatBubble = () => {
  return (
    <div className="fixed bottom-4 cursor-pointer bg-secondary rounded-full">
      <a href="https://wa.me/5016101329" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center p-2 gap-2'>
            <span className='text-primary font-futura'>Chat with concierge</span>
            <TbHandClick className="text-primary text-2xl -rotate-45" />
      </a>
    </div>
  )
}

export default ChatBubble