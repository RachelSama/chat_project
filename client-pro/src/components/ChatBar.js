import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ChatBar = ({ socket }) => {
  const [rooms, setRooms] = useState([]);
  const [broadcastMessage, setBroadcastMessage] = useState("");

  useEffect(() => {
    socket.on("roomListResponse", data => setRooms(data));
    socket.on("newRoom", data => setRooms([...rooms, data]));
  }, [socket, rooms]);

  const handleBroadcastMessage = () => {
    if (broadcastMessage.trim()) {
      socket.emit("broadcastMessage", {
        text: broadcastMessage,
        token: "1234",
        name: "Unobike",
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setBroadcastMessage("");
    }
  };

  return (
    <div className='chat__sidebar'>
      <h2>Open Chat</h2>
      <div>
        <div className="broadcast__message">
          <input
            type="text"
            placeholder="Escribe un mensaje de difusión"
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            className="broadcast__input"
          />
          <button onClick={handleBroadcastMessage} className="broadcast__button">
            Enviar a todas las salas
          </button>
        </div>
        <h4 className='chat__header'>AVAILABLE ROOMS</h4>
        <div className='chat__rooms'>
          {rooms.map(roomName => (
            <div key={roomName}>
              <Link to={`/${roomName}`}>
                <p>{roomName}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatBar
