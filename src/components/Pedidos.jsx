import React, { useEffect, useState } from 'react';
import '../styles/Pedidos.css'; // Importando los estilos personalizados

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]); // Estado para almacenar los pedidos

  useEffect(() => {
    // Obtener los pedidos almacenados en el localStorage
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
    setPedidos(pedidosGuardados); // Actualizar el estado con los pedidos
  }, []);

  return (
    <div className="pedidos-container">
      <h2 className="titulo-pedidos">Mis Pedidos</h2>
      {pedidos.length === 0 ? (
        <p className="mensaje-no-pedidos">No tienes pedidos realizados aún.</p> // Mensaje si no hay pedidos
      ) : (
        <div className="pedidos-lista">
          {pedidos.map((pedido, index) => (
            <div key={index} className="pedido-card">
              <div className="pedido-header">
                <h3 className="pedido-id">Pedido #{index + 1}</h3>
                <span className="pedido-fecha">{new Date(pedido.fecha).toLocaleDateString()}</span>
              </div>
              <div className="pedido-info">
                <p><strong>Nombre:</strong> {pedido.nombre} {pedido.apellido}</p>
                <p><strong>Método de Pago:</strong> {pedido.metodoPago}</p>
                <p><strong>Dirección de Envío:</strong> {pedido.direccionDestino}</p>
                <p><strong>Empresa de Envío:</strong> {pedido.empresaEnvio}</p>
              </div>
              <div className="pedido-productos">
                <h4>Productos:</h4>
                <ul>
                  {pedido.productos.map((producto, idx) => (
                    <li key={idx} className="producto-item">
                      <div className="producto-info">
                        <p className="producto-nombre"><strong>{producto.nombre}</strong></p>
                        <p>Cantidad: {producto.cantidad}</p>
                        <p>Precio Unitario: S/{producto.precioUnitario}</p>
                        <p>Precio Total: S/{producto.precioTotal}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pedido-total">
                <h4>Total: S/{pedido.total}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pedidos;
