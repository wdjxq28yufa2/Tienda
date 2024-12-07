// src/components/Aportes.jsx
import React, { useState, useEffect } from 'react';

const Aportes = () => {
  const [aportes, setAportes] = useState([]);
  const [newAporte, setNewAporte] = useState({ id_cliente: '', id_usuario: '', monto: 0, fecha_aporte: '', descripcion: '' });

  useEffect(() => {
    // Traer los aportes desde la base de datos
    fetch('/api/aportes')
      .then((response) => response.json())
      .then((data) => setAportes(data))
      .catch((error) => console.error('Error al cargar los aportes:', error));
  }, []);

  const handleAddAporte = () => {
    // Enviar un nuevo aporte
    fetch('/api/aportes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAporte),
    })
      .then((response) => response.json())
      .then((data) => setAportes([...aportes, data]))
      .catch((error) => console.error('Error al agregar el aporte:', error));
  };

  const handleDeleteAporte = (id) => {
    // Eliminar aporte
    fetch(`/api/aportes/${id}`, {
      method: 'DELETE',
    })
      .then(() => setAportes(aportes.filter((aporte) => aporte.id !== id)))
      .catch((error) => console.error('Error al eliminar el aporte:', error));
  };

  return (
    <div>
      <h2>Aportes</h2>
      <div>
        <input
          type="text"
          placeholder="ID Cliente"
          value={newAporte.id_cliente}
          onChange={(e) => setNewAporte({ ...newAporte, id_cliente: e.target.value })}
        />
        <input
          type="text"
          placeholder="ID Usuario"
          value={newAporte.id_usuario}
          onChange={(e) => setNewAporte({ ...newAporte, id_usuario: e.target.value })}
        />
        <input
          type="number"
          placeholder="Monto"
          value={newAporte.monto}
          onChange={(e) => setNewAporte({ ...newAporte, monto: parseFloat(e.target.value) })}
        />
        <input
          type="date"
          value={newAporte.fecha_aporte}
          onChange={(e) => setNewAporte({ ...newAporte, fecha_aporte: e.target.value })}
        />
        <textarea
          placeholder="Descripción"
          value={newAporte.descripcion}
          onChange={(e) => setNewAporte({ ...newAporte, descripcion: e.target.value })}
        />
        <button onClick={handleAddAporte}>Agregar Aporte</button>
      </div>
      <ul>
        {aportes.map((aporte) => (
          <li key={aporte.id}>
            <span>{aporte.monto}</span>
            <span>{aporte.fecha_aporte}</span>
            <button onClick={() => handleDeleteAporte(aporte.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Aportes;
