import React, { useState, useEffect } from 'react';
import './Clientes.css'; // Importar el archivo CSS para los estilos

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    // Obtener los clientes del localStorage
    const clientesGuardados = JSON.parse(localStorage.getItem('clientes')) || [];
    setClientes(clientesGuardados);
  };

  return (
    <div className="clientes-container">
      <h2 className="titulo">Lista de Clientes</h2>
      <div className="clientes-list">
        <ul>
          {clientes.map((cliente, index) => (
            <li key={index} className="cliente-item">
              {/* Mostrar el nombre y las iniciales de los apellidos */}
              <span>
                {cliente.nombre} {cliente.apellido}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Clientes;
