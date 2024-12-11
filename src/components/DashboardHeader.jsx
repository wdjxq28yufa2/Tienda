import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/DashboardHeader.css';

const handleLogout = () => {
  // Eliminar el token del localStorage
  localStorage.removeItem('authToken');
  // Redirigir al login
  window.location.href = '/';
};

function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const location = useLocation();
  const [titleVisible, setTitleVisible] = useState(false);

  // Verifica si estamos en la página principal de la tienda
  const isHome = location.pathname === "/";

  // Función para abrir o cerrar el menú de opciones del usuario
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  // Función para confirmar el cierre de sesión
  const confirmLogout = () => {
    setShowConfirmLogout(true);
    setIsMenuOpen(false);
  };

  // Función para confirmar realmente el logout
  const confirmAndLogout = () => {
    handleLogout();
  };

  // Función para cancelar el logout
  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  // Cuando el pathname cambia, hacemos aparecer el título con una transición
  useEffect(() => {
    setTitleVisible(false); // Primero ocultamos el título
    const timer = setTimeout(() => {
      setTitleVisible(true); // Mostramos el título después de un tiempo
    }, 100); // Tiempo en ms para que se vea el efecto de transición
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <header className="dashboard-header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src="/images/logo.jpg" alt="Logo de la tienda" className={titleVisible ? 'logo-animate' : ''} />
        </Link>
      </div>

      {/* Menú de navegación de la tienda */}
      <div className="header-center">
        {isHome ? (
          <div className="navbar-container">
            <nav className="navbar">
              <ul className="header-options">
                <li>
                  <Link to="/productos" className="nav-item">
                    <i className="fas fa-tshirt"></i> Productos
                  </Link>
                </li>
                <li>
                  <Link to="/ofertas" className="nav-item">
                    <i className="fas fa-tags"></i> Ofertas
                  </Link>
                </li>
                <li>
                  <Link to="/categorias" className="nav-item">
                    <i className="fas fa-th-large"></i> Categorías
                  </Link>
                </li>
                <li>
                  <Link to="/contacto" className="nav-item">
                    <i className="fas fa-phone-alt"></i> Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <h1 className={titleVisible ? 'title-animate' : ''}>
            Tienda Kayemi {/* Título fijo */}
          </h1>
        )}
      </div>

      {/* Íconos de usuario y carrito */}
      <div className="user-cart-container">
        {/* Carrito de compras */}
        <Link to="/dashboard/carrito" className="cart-icon">
          <i className="fas fa-shopping-cart"></i>
        </Link>
      </div>
    </header>
  );
}

export default DashboardHeader;
