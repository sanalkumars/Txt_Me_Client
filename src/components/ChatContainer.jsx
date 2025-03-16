import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from "../components/ChatHeader"
import MessageInput from "../components/MessageInput"
import MessageSkeleton from './Skeleton/MessageSkeleton'

const ChatContainer = () => {

  const { messages , selectedUser , isMessageLoading ,getMessages } = useChatStore();

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

      <p className="">Messages</p>

      <MessageInput />
    </div>
  )
}

export default ChatContainer