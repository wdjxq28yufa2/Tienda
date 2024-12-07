import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [nombres, setNombres] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [dni, setDni] = useState('');
  const [direccion, setDireccion] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');  // Cambié 'contrasena' por 'password'
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        nombres,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        dni,
        direccion,
        celular,
        correo,
        password,  // Cambié 'contrasena' por 'password'
      });

      // Si el registro es exitoso, redirige a login o muestra un mensaje
      alert('Usuario registrado exitosamente');
      window.location.href = '/login'; // Redirigir al login

    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Hubo un error al registrar');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Crear Cuenta</h2>
        
        {/* Formulario para ingresar los datos del nuevo usuario */}
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Apellido Paterno</label>
          <input
            type="text"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Apellido Materno</label>
          <input
            type="text"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />
        </div>

        <div>
          <label>DNI</label>
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Dirección</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>

        <div>
          <label>Celular</label>
          <input
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}  // Cambié 'contrasena' por 'password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Mostrar mensaje de error si hay uno */}
        {errorMessage && <p>{errorMessage}</p>}

        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
};

export default Register;
