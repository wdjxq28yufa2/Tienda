import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VistaOpcion = () => {
  const { opcion } = useParams();  // Extrae la opción de la URL
  const [data, setData] = useState(null);
  const [nuevoElemento, setNuevoElemento] = useState({
    nombres: '',
    correo: '',
    monto: 0,
  });  // Dependiendo de la opción, este estado variará (Clientes, Aportes, etc.)
  const [isEditing, setIsEditing] = useState(false);  // Controla si estamos editando un elemento

  // Cargar los datos iniciales dependiendo de la opción
  useEffect(() => {
    fetch(`/api/${opcion}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error al cargar los datos de la opción:', error));
  }, [opcion]);

  // Función para agregar un nuevo cliente/aporte/notificación
  const agregarElemento = () => {
    let endpoint = `/api/${opcion}`;
    let requestData = {};

    if (opcion === 'clientes') {
      requestData = {
        nombres: nuevoElemento.nombres,
        correo: nuevoElemento.correo,
      };
    } else if (opcion === 'aportes') {
      requestData = {
        monto: nuevoElemento.monto,
      };
    }

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then(() => {
        // Vuelve a cargar los datos después de agregar
        fetch(`/api/${opcion}`)
          .then((response) => response.json())
          .then((data) => setData(data));
      })
      .catch((error) => console.error('Error al agregar el elemento:', error));
  };

  // Función para eliminar un cliente/aporte/notificación
  const eliminarElemento = (id) => {
    fetch(`/api/${opcion}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Vuelve a cargar los datos después de eliminar
        fetch(`/api/${opcion}`)
          .then((response) => response.json())
          .then((data) => setData(data));
      })
      .catch((error) => console.error('Error al eliminar el elemento:', error));
  };

  // Función para editar un elemento
  const editarElemento = (id) => {
    setIsEditing(true);
    const elementToEdit = data.find((item) => item.id === id);
    setNuevoElemento(elementToEdit);
  };

  const guardarEdicion = () => {
    let endpoint = `/api/${opcion}/${nuevoElemento.id}`;
    let requestData = {};

    if (opcion === 'clientes') {
      requestData = {
        nombres: nuevoElemento.nombres,
        correo: nuevoElemento.correo,
      };
    } else if (opcion === 'aportes') {
      requestData = {
        monto: nuevoElemento.monto,
      };
    }

    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then(() => {
        setIsEditing(false);
        fetch(`/api/${opcion}`)
          .then((response) => response.json())
          .then((data) => setData(data));
      })
      .catch((error) => console.error('Error al editar el elemento:', error));
  };

  return (
    <div>
      <h2>Vista de la opción: {opcion}</h2>

      {/* Muestra formulario para agregar un nuevo elemento */}
      <div>
        {opcion === 'clientes' && (
          <div>
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoElemento.nombres}
              onChange={(e) => setNuevoElemento({ ...nuevoElemento, nombres: e.target.value })}
            />
            <input
              type="email"
              placeholder="Correo"
              value={nuevoElemento.correo}
              onChange={(e) => setNuevoElemento({ ...nuevoElemento, correo: e.target.value })}
            />
          </div>
        )}
        {opcion === 'aportes' && (
          <div>
            <input
              type="number"
              placeholder="Monto"
              value={nuevoElemento.monto}
              onChange={(e) => setNuevoElemento({ ...nuevoElemento, monto: e.target.value })}
            />
          </div>
        )}
        <button onClick={isEditing ? guardarEdicion : agregarElemento}>
          {isEditing ? 'Guardar Cambios' : 'Agregar'}
        </button>
      </div>

      {/* Mostrar los elementos existentes (clientes, aportes, etc.) */}
      <div>
        {data ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombres}</td>
                  <td>{item.correo}</td>
                  <td>
                    <button onClick={() => eliminarElemento(item.id)}>Eliminar</button>
                    <button onClick={() => editarElemento(item.id)}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default VistaOpcion;
