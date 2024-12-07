import React, { useState, useEffect } from 'react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [newCliente, setNewCliente] = useState({ nombres: '', apellido_paterno: '', apellido_materno: '', dni: '', direccion: '', celular: '', correo: '' });
  const [editingCliente, setEditingCliente] = useState(null); // Para manejar la edición del cliente
  const [updatedCliente, setUpdatedCliente] = useState({ nombres: '', apellido_paterno: '', apellido_materno: '', dni: '', direccion: '', celular: '', correo: '' });

  // Cargar clientes al inicio
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    fetch('http://localhost:5000/api/clientes')  // Cambiado a puerto 5000
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al cargar los clientes:', error));
  };

  const handleAddCliente = () => {
    fetch('http://localhost:5000/api/clientes', {  // Cambiado a puerto 5000
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCliente),
    })
      .then((response) => response.json())
      .then((data) => setClientes([...clientes, data]))
      .catch((error) => console.error('Error al agregar el cliente:', error));
  };

  const handleDeleteCliente = (id) => {
    fetch(`http://localhost:5000/api/clientes/${id}`, {  // Cambiado a puerto 5000
      method: 'DELETE',
    })
      .then(() => setClientes(clientes.filter((cliente) => cliente.id !== id)))
      .catch((error) => console.error('Error al eliminar el cliente:', error));
  };

  const handleUpdateCliente = () => {
    fetch(`http://localhost:5000/api/clientes/${editingCliente.id}`, {  // Cambiado a puerto 5000
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCliente),
    })
      .then((response) => response.json())
      .then(() => {
        // Después de actualizar, hacer un nuevo GET para obtener los clientes actualizados
        fetchClientes();
        setEditingCliente(null); // Cerrar el modal después de la actualización
      })
      .catch((error) => console.error('Error al actualizar el cliente:', error));
  };

  const handleCreateExpediente = async (dni, cliente) => {
    try {
      const response = await fetch(`http://localhost:5000/api/clientes/expediente/${dni}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dni,
          nombres: cliente.nombres,
          apellido_paterno: cliente.apellido_paterno,
          apellido_materno: cliente.apellido_materno,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);  // Mensaje de éxito
      } else {
        const errorData = await response.json();
        alert(`Error al crear expediente: ${errorData.message}`);  // Mensaje de error
      }
    } catch (error) {
      console.error('Error en la creación del expediente:', error);
      alert('Error al crear el expediente en el servidor');
    }
  };
  
  
  

  const handleOpenScraping = (dni) => {
    window.open(`https://servicios.distriluz.com.pe/OficinaVirtualConsulta/Consultas/Consultas/ConsultaMiRecibo?dni=${dni}`, '_blank');
  };

  const handleEditCliente = (cliente) => {
    setEditingCliente(cliente);
    setUpdatedCliente({ ...cliente });  // Establece los valores del cliente en los campos de edición
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCliente((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <h2>Clientes</h2>
      <div>
        <input
          type="text"
          placeholder="Nombres"
          value={newCliente.nombres}
          onChange={(e) => setNewCliente({ ...newCliente, nombres: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido Paterno"
          value={newCliente.apellido_paterno}
          onChange={(e) => setNewCliente({ ...newCliente, apellido_paterno: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido Materno"
          value={newCliente.apellido_materno}
          onChange={(e) => setNewCliente({ ...newCliente, apellido_materno: e.target.value })}
        />
        <input
          type="text"
          placeholder="DNI"
          value={newCliente.dni}
          onChange={(e) => setNewCliente({ ...newCliente, dni: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={newCliente.direccion}
          onChange={(e) => setNewCliente({ ...newCliente, direccion: e.target.value })}
        />
        <input
          type="text"
          placeholder="Celular"
          value={newCliente.celular}
          onChange={(e) => setNewCliente({ ...newCliente, celular: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo"
          value={newCliente.correo}
          onChange={(e) => setNewCliente({ ...newCliente, correo: e.target.value })}
        />
        <button onClick={handleAddCliente}>Agregar Cliente</button>
      </div>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <span>{cliente.nombres} {cliente.apellido_paterno} {cliente.apellido_materno}</span>
            <span>{cliente.dni}</span>
            <span>{cliente.celular}</span>
            <button onClick={() => handleDeleteCliente(cliente.id)}>Eliminar</button>
            <button onClick={() => handleEditCliente(cliente)}>Editar</button> {/* Botón cambiado a "Editar" */}
            <button onClick={() => handleCreateExpediente(cliente.dni, cliente)}>Crear Expediente</button>

            <button onClick={() => handleOpenScraping(cliente.dni)}>Scraping</button>
          </li>
        ))}
      </ul>

      {editingCliente && (
        <div className="edit-modal">
          <h3>Editar Cliente</h3>
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={updatedCliente.nombres}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="apellido_paterno"
            placeholder="Apellido Paterno"
            value={updatedCliente.apellido_paterno}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="apellido_materno"
            placeholder="Apellido Materno"
            value={updatedCliente.apellido_materno}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={updatedCliente.dni}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={updatedCliente.direccion}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="celular"
            placeholder="Celular"
            value={updatedCliente.celular}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={updatedCliente.correo}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdateCliente}>Actualizar</button>
          <button onClick={() => setEditingCliente(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Clientes;
