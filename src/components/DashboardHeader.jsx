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

  // Verifica si estamos en la página principal del dashboard
  const isDashboard = location.pathname === "/dashboard";
  
  // Obtener la opción actual desde la URL (si existe) y decodificarla
  const opcion = location.pathname.split('/')[2];
  
  // Decodificar la URL y reemplazar los guiones por espacios
  const decodedTitle = opcion ? decodeURIComponent(opcion.replaceAll('-', ' ')) : ''; 

  // Función para abrir o cerrar el menú
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
        <Link to="/dashboard" className="logo-link">
          <img src="/images/logo.png" alt="Logo de CampusUC" className={titleVisible ? 'logo-animate' : ''} />
        </Link>
        <Link to="/dashboard" className="logo-link">
          <img src="/images/sist.png" alt="Logo Sist" className={titleVisible ? 'logo-animate' : ''} />
        </Link>
      </div>

      {/* Mostrar el título de la opción seleccionada o el menú, dependiendo de la ruta */}
      <div className="header-center">
        {decodedTitle ? (
          <h1 className={titleVisible ? 'title-animate' : ''}>
            {decodedTitle.toUpperCase()}
          </h1>
        ) : (
          isDashboard && (
            <div className="navbar-container">
              <nav className="navbar">
                <ul className="header-options">
                  <li><Link to="/dashboard/Direccionamiento-Estratégico" className="nav-item">Direccionamiento Estratégico</Link></li>
                  <li><Link to="/dashboard/Gestión-para-Organizaciones-educativas" className="nav-item">Gestión para Organizaciones educativas</Link></li>
                  <li><Link to="/dashboard/Responsabilidad-Social" className="nav-item">Responsabilidad Social</Link></li>
                  <li><Link to="/dashboard/Sostenibilidad-Ambiental" className="nav-item">Sostenibilidad Ambiental</Link></li>
                </ul>
              </nav>
            </div>
          )
        )}
      </div>

      {/* Ícono de usuario */}
      <div className="user-icon-container">
        {/* Reemplaza el icono con la imagen sist.jpg */}
        <img 
          src="/images/inge.jpg" 
          alt="Icono de usuario" 
          className="user-icon" 
          onClick={toggleMenu} 
          title="Opciones" 
        />
        {isMenuOpen && (
          <div className="menu-options">
            <ul>
              <li onClick={confirmLogout}>Cerrar sesión</li>
            </ul>
          </div>
        )}
      </div>

      {/* Modal de confirmación de cierre de sesión */}
      {showConfirmLogout && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>¿Estás seguro que deseas cerrar sesión?</h2>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={cancelLogout}>Cancelar</button>
              <button className="btn-confirm" onClick={confirmAndLogout}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default DashboardHeader;
