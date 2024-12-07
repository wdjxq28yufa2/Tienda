import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DashboardMain.css';

const DashboardMain = () => {
  // Estado para controlar la visibilidad de la imagen de fondo
  const [backgroundVisible, setBackgroundVisible] = useState(true);

  // Lista de opciones
  const options = [
    
    
  ];

  // Función para manejar el clic en una opción
  const handleOptionClick = () => {
    setBackgroundVisible(false); // Oculta la imagen de fondo al hacer clic
  };

  return (
    <div className={`dashboard-main ${!backgroundVisible ? 'hide-background' : ''}`}>
      {/* Si estamos en la página principal de /dashboard, mostramos las opciones */}
      {window.location.pathname === "/dashboard" ? (
        <>
          <div className="options-section">
            <div className="options-grid">
              {options.map((option, index) => (
                <Link
                  key={index}
                  to={option.route}
                  className="option-btn"
                  onClick={handleOptionClick} // Cambia la visibilidad de la imagen al hacer clic
                >
                  {option.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="welcome-message">
          <h2>Welcome to: {window.location.pathname.replace('/dashboard/', '').replace('-', ' ').toUpperCase()}</h2>
        </div>
      )}
    </div>
  );
};

export default DashboardMain;
