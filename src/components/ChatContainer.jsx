import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from "../components/ChatHeader"
import MessageInput from "../components/MessageInput"
import MessageSkeleton from './Skeleton/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'

const ChatContainer = () => {

  const { messages , selectedUser , isMessageLoading ,getMessages } = useChatStore();
  const { authUser } = useAuthStore();
  useEffect(()=>{
    getMessages(selectedUser._id)
  },[ selectedUser ])

  if (isMessageLoading)  return (
    <div className="flex flex-1 overflow-auto flex-col">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )


  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        { messages.map((message) => (
          <div 
          key={message._id}
          className={`chat ${message.senderId === authUser._id ? "chat-end" :"chat-start" }`}>

          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer