import React, { useEffect, useState } from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

const ChatPage = ({ socket }) => {
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Realizar una solicitud a la base de datos para obtener el usuario y la contraseña asociados al token
      socket.emit('getUserData', storedToken, (data) => {
        if (data && data.username && data.password) {
          const dataUser = {
            username: data.username,
            password: data.password
          }
          socket.emit("login", dataUser)
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    socket.on("roomToGetMessages", (roomName) => {
      setRoomName(roomName);
    });
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className='chat__main'>
        <ChatBody roomName={roomName} socket={socket} />
        <ChatFooter socket={socket} roomName={roomName} />
      </div>
    </div>
  )
}

export default ChatPage