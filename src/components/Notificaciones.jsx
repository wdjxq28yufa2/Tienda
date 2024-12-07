// src/components/Notificaciones.jsx
import React, { useState, useEffect } from 'react';

const Notificaciones = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Conectar con WebSocket (suponiendo que tienes un servidor WebSocket en el puerto 8080)
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    // Enviar mensaje al servidor
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      socket.send(JSON.stringify({ text: newMessage, user: 'Usuario' }));
      setNewMessage('');
    };
  };

  return (
    <div>
      <h2>Chat en tiempo real</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}: </strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe un mensaje"
      />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
};

export default Notificaciones;
