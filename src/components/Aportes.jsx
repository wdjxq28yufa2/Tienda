import React, { useState, useEffect } from 'react';
import './Aportes.css'; // Asegúrate de tener este archivo de estilos

const Aportes = () => {
  const [aportes, setAportes] = useState([]); // Para almacenar los aportes
  const [clientes, setClientes] = useState([]); // Para almacenar los clientes
  const [usuarios, setUsuarios] = useState([]); // Para almacenar los usuarios (ID y Nombres)
  const [newAporte, setNewAporte] = useState({
    id_cliente: '', 
    id_usuario: '', 
    monto: 0, 
    fecha_aporte: '', 
    descripcion: ''
  });

  // Cargar clientes y usuarios cuando el componente se monta
  useEffect(() => {
    // Obtener los clientes de la base de datos
    fetch('http://localhost:5000/api/clientes')
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => console.error('Error al cargar los clientes:', error));
  
    // Obtener los usuarios de la base de datos
    fetch('http://localhost:5000/api/usuarios')
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data);
      })
      .catch((error) => console.error('Error al cargar los usuarios:', error));
    
  }, []);

  // Cargar los aportes existentes
  useEffect(() => {
    fetch('http://localhost:5000/api/aportes')
      .then((response) => response.json())
      .then((data) => {
        setAportes(data);
      })
      .catch((error) => console.error('Error al cargar los aportes:', error));
  }, []);

  const handleAddAporte = () => {
    // Validación de los campos
    if (!newAporte.id_cliente || !newAporte.id_usuario || !newAporte.monto || !newAporte.fecha_aporte) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Enviar el nuevo aporte
    fetch('http://localhost:5000/api/aportes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAporte),
    })
      .then((response) => response.json())
      .then((data) => {
        setAportes([data, ...aportes]);  // Agregar el nuevo aporte al principio de la lista
        setNewAporte({ id_cliente: '', id_usuario: '', monto: 0, fecha_aporte: '', descripcion: '' }); // Limpiar los campos
      })
      .catch((error) => console.error('Error al agregar el aporte:', error));
  };

  const handleDeleteAporte = (id) => {
    // Eliminar un aporte
    fetch(`http://localhost:5000/api/aportes/${id}`, {
      method: 'DELETE',
    })
      .then(() => setAportes(aportes.filter((aporte) => aporte.id !== id)))
      .catch((error) => console.error('Error al eliminar el aporte:', error));
  };

  return (
    <div className="aportes-container">
      <h2>Aportes</h2>

      <div className="form-container">
        <select
          value={newAporte.id_cliente}
          onChange={(e) => setNewAporte({ ...newAporte, id_cliente: e.target.value })}
          className="form-input"
        >
          <option value="">Seleccionar Cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombres} {cliente.apellido_paterno} {cliente.apellido_materno || ''}
            </option>
          ))}
        </select>

        <select
          value={newAporte.id_usuario}
          onChange={(e) => setNewAporte({ ...newAporte, id_usuario: e.target.value })}
          className="form-input"
        >
          <option value="">Seleccionar Usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombres} {usuario.apellido_paterno} {usuario.apellido_materno || ''}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Monto"
          value={newAporte.monto}
          onChange={(e) => setNewAporte({ ...newAporte, monto: parseFloat(e.target.value) })}
          className="form-input"
        />

        <input
          type="date"
          value={newAporte.fecha_aporte}
          onChange={(e) => setNewAporte({ ...newAporte, fecha_aporte: e.target.value })}
          className="form-input"
        />

        <textarea
          placeholder="Descripción"
          value={newAporte.descripcion}
          onChange={(e) => setNewAporte({ ...newAporte, descripcion: e.target.value })}
          className="form-input"
        />

        <button onClick={handleAddAporte} className="submit-btn">Agregar Aporte</button>
      </div>

      <div className="aportes-list-container">
        <h3>Lista de Aportes</h3>
        <table className="aportes-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Usuario</th>
              <th>Monto</th>
              <th>Fecha de Aporte</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {aportes.map((aporte) => {
              const cliente = clientes.find((cl) => cl.id === parseInt(aporte.id_cliente, 10));
              const usuario = usuarios.find((usr) => usr.id === parseInt(aporte.id_usuario, 10));
              return (
                <tr key={aporte.id}>
                  <td>{cliente ? `${cliente.nombres} ${cliente.apellido_paterno}` : 'Datos no disponibles'}</td>
                  <td>{usuario ? `${usuario.nombres} ${usuario.apellido_paterno}` : 'Datos no disponibles'}</td>
                  <td>{aporte.monto}</td>
                  <td>{aporte.fecha_aporte}</td>
                  <td>
                    <button onClick={() => handleDeleteAporte(aporte.id)} className="delete-btn">Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Aportes;
