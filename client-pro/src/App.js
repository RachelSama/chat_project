import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import socketIO from "socket.io-client"
import ChatPage from "./components/ChatPage";
import ChatWelcome from "./components/ChatWelcome";
import ChatBar from "./components/ChatBar";

function App() {
  const socket = socketIO.connect("http://localhost:4000", {
    auth: {
      token: "1234"
    }
  })

  return (
    <BrowserRouter>
      <div className="chat">
        <ChatBar socket={socket} />
        <div className="chat__main">
          <Routes>
            <Route path="/" element={<ChatWelcome socket={socket} />}></Route>
            <Route path="/:roomName" element={<ChatPage socket={socket} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
