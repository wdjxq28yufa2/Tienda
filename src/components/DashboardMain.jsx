import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DashboardMain.css';

const DashboardMain = () => {
  // Estado para controlar la visibilidad de la imagen de fondo
  const [backgroundVisible, setBackgroundVisible] = useState(true);

  // Lista de opciones con sus rutas y una imagen de vista previa
  const options = [
    { name: 'Categorías', route: '/dashboard/categorias', image: '/images/categorias-preview.jpeg' },
    { name: 'Productos', route: '/dashboard/productos', image: '/images/productos-preview.jpg' },
    { name: 'Ofertas', route: '/dashboard/ofertas', image: '/images/ofertas-preview.jpeg' },
    { name: 'Clientes', route: '/dashboard/clientes', image: '/images/clientes-preview.jpeg' },
    { name: 'Pedidos', route: '/dashboard/pedidos', image: '/images/pedidos-preview.jpeg' },
  ];

  // Función para manejar el clic en una opción
  const handleOptionClick = () => {
    setBackgroundVisible(false); // Oculta la imagen de fondo al hacer clic
  };

  useEffect(() => {
    // Mantener la visibilidad del fondo si estamos en la página principal
    if (window.location.pathname !== "/dashboard") {
      setBackgroundVisible(false);
    }
  }, [window.location.pathname]);

  return (
    <div className={`dashboard-main ${!backgroundVisible ? 'hide-background' : ''}`}>
      {/* Si estamos en la página principal de /dashboard, mostramos las opciones */}
      {window.location.pathname === "/dashboard" ? (
        <>
          <div className="options-section">
            <div className="options-grid">
              {options.map((option, index) => (
                <div key={index} className="option-container">
                  <Link
                    to={option.route}
                    className="option-btn"
                    onClick={handleOptionClick} // Cambia la visibilidad de la imagen al hacer clic
                  >
                    {option.name}
                  </Link>

                  {/* Imagen de vista previa debajo de cada opción */}
                  <div className="option-image-container">
                    <img src={option.image} alt={`${option.name} preview`} className="option-image" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="welcome-message">
          <h2>
            Bienvenido a: {window.location.pathname.replace('/dashboard/', '').replace('-', ' ').toUpperCase()}
          </h2>
        </div>
      )}
    </div>
  );
};

export default DashboardMain;
