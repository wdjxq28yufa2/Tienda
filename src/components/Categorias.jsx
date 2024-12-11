// src/components/Categorias.jsx
import React from 'react';
import '../styles/Categorias.css'; // Si Categorias.css está en la carpeta "styles"
 // Importamos el archivo de estilos

const Categorias = () => {
  // Lista de categorías con sus nombres e imágenes de vista previa
  const categorias = [
    { name: 'Hombres', image: '/images/categorias/hombres.jpg' },
    { name: 'Mujeres', image: '/images/categorias/mujeres.jpg' },
    { name: 'Niños', image: '/images/categorias/ninos.jpg' },
    { name: 'Accesorios', image: '/images/categorias/accesorios.jpg' },
    { name: 'Zapatos', image: '/images/categorias/zapatos.jpg' },
    { name: 'Ropa Deportiva', image: '/images/categorias/deportiva.jpg' },
  ];

  return (
    <div className="categorias-container">
      <h2 className="categorias-title">Categorías</h2>
      <p className="categorias-description">Explora nuestras categorías y encuentra lo que más te gusta.</p>
      <div className="categorias-grid">
        {categorias.map((categoria, index) => (
          <div key={index} className="categoria-card">
            <img src={categoria.image} alt={categoria.name} className="categoria-image" />
            <h3 className="categoria-name">{categoria.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
