import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DashboardMain.css';

const DashboardMain = () => {
  // Estado para controlar la visibilidad de la imagen de fondo
  const [backgroundVisible, setBackgroundVisible] = useState(true);

  // Lista de opciones
  const options = [
    { name: "Admisión", route: "/dashboard/admision" },
    { name: "Nivelaciones de estudiantes", route: "/dashboard/nivelaciones" },
    { name: "Matrícula", route: "/dashboard/matricula" },
    { name: "Diseño curricular", route: "/dashboard/diseno-curricular" },
    { name: "Convalidaciones", route: "/dashboard/convalidaciones" },
    { name: "Enseñanza-Aprendizaje", route: "/dashboard/ensenanza-aprendizaje" },
    { name: "Prácticas preprofesionales", route: "/dashboard/practicas-preprofesionales" },
    { name: "Proyección social", route: "/dashboard/proyeccion-social" },
    { name: "Extensión cultural", route: "/dashboard/extension-cultural" },
    { name: "Servicios educacionales", route: "/dashboard/servicios-educacionales" },
    { name: "Seguimiento al estudiante", route: "/dashboard/seguimiento-estudiante" },
    { name: "Tutoría", route: "/dashboard/tutoria" },
    { name: "Internacionalización", route: "/dashboard/internacionalizacion" },
    { name: "Investigación", route: "/dashboard/investigacion" },
    { name: "Grados y títulos", route: "/dashboard/grados-titulos" },
    { name: "Gestión de egresados", route: "/dashboard/gestion-egresados" }
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
