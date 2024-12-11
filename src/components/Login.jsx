import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); // Para el correo
  const [password, setPassword] = useState(''); // Para la contraseña
  const [errorMessage, setErrorMessage] = useState(''); // Para mostrar el error

  const navigate = useNavigate(); // Hook para navegar a otras rutas

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
      navigate('/dashboard'); // Usamos navigate para redirigir

    } catch (error) {
      // Si ocurre un error, mostrar el mensaje correspondiente
      setErrorMessage(error.response?.data?.message || 'Hubo un error en el login');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirige al formulario de registro
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Bienvenido a tu Cooperativa</h2>
        
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

        {/* Botón para redirigir al registro */}
        <div className="register-link">
          <button type="button" onClick={handleRegisterRedirect}>
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
