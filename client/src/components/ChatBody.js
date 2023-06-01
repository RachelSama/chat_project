import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom"

const ChatBody = ({ roomName, socket }) => {
  const lastMessageRef = useRef(null);
  const navigate = useNavigate()
  const [messages, setMessages] = useState([]);

  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("token")
    navigate("/")
    window.location.reload()
  }

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.emit('getRoomData', roomName);
    // socket.on("messageResponse", data => setMessages([...messages, data]))
    socket.on("roomData", data => setMessages(data));
  }, [roomName, messages, socket]);

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <>
      <header className='chat__mainHeader'>
        <p>Hangout with Colleagues</p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
      </header>

      <div className='message__container'>
        {messages.map((message, index) => {
          const parsedMessage = JSON.parse(message); // Parsea el mensaje JSON a un objeto JavaScript
          const formattedDateTime = formatDateTime(parsedMessage.timestamp);

          return parsedMessage.user !== "Unobike" ? (
            <div className="message__chats" key={index}>
              <p className='sender__name'>Tú</p>
              <div className='message__sender'>
                <p>{parsedMessage.text}</p>
                <p className="message__timestamp">{formattedDateTime}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={index}>
              <p>{parsedMessage.user}</p>
              <div className='message__recipient'>
                <p>{parsedMessage.text}</p>
                <p className="message__timestamp">{formattedDateTime}</p>
              </div>
            </div>
          );
        })}
        <div ref={lastMessageRef} />
      </div>
    </>
  )
}

export default ChatBody