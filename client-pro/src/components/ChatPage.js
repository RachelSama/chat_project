import React from 'react'
import { useParams } from 'react-router-dom';

import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

function ChatPage({ socket }) {
  const { roomName } = useParams();

  return (
    <div className='chat__main'>
      <ChatBody roomName={roomName} socket={socket} />
      <ChatFooter socket={socket} roomName={roomName} />
    </div>
  )
}

export default ChatPage
