import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", username)

    socket.on("localStorageToken", (token) => {
      localStorage.setItem("token", token);
      navigate('/chat');
    })

    // Realizar la consulta a la base de datos para verificar el usuario y la contraseña
    const data = {
      username: username,
      password: password
    }
    socket.emit("login", data)

  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Inicia sesión en Open Chat</h2>
      <label htmlFor="username">Nombre de usuario</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        minLength={6}
        name="password"
        id="password"
        className="password__input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="home__cta">INICIAR SESIÓN</button>
    </form>
  );
};

export default Home;
