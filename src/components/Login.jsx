import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); // Para el correo
  const [password, setPassword] = useState(''); // Para la contraseña
  const [errorMessage, setErrorMessage] = useState(''); // Para mostrar el error

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud de login al backend
      const response = await axios.post('http://localhost:5000/login', {
        correo: username,    // Enviar 'username' como 'correo' en la solicitud
        password: password,  // Enviar 'password' tal como está
      });

      // Si la autenticación es exitosa, almacenamos el token en localStorage
      localStorage.setItem('authToken', response.data.token);

      // Redirigir a la página del Dashboard (usando React Router, por ejemplo)
      window.location.href = '/dashboard'; // Esto redirige a /dashboard

    } catch (error) {
      // Si ocurre un error, mostrar el mensaje correspondiente
      setErrorMessage(error.response?.data?.message || 'Hubo un error en el login');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Bienvenido al Sistema De la UNCP</h2>
        
        <div>
          <label htmlFor="username">Correo</label>
          <input 
            type="email" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        {/* Mostrar mensaje de error si existe */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
