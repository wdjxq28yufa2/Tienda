import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader'; // Importar el header
import '../styles/Carrito.css'; // Estilo de carrito
import QRCode from 'react-qr-code'; // Para mostrar el código QR

const Carrito = () => {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar el modal
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [empresaEnvio, setEmpresaEnvio] = useState('');
  const [direccionDestino, setDireccionDestino] = useState('');
  const [mostrarQR, setMostrarQR] = useState(false);
  const [cuentaBancaria, setCuentaBancaria] = useState('');
  const [contrasenaBancaria, setContrasenaBancaria] = useState('');
  const [error, setError] = useState(''); // Para mostrar errores de validación

  useEffect(() => {
    // Cargar productos del carrito desde el localStorage cuando el componente se monte
    const productos = JSON.parse(localStorage.getItem('carrito')) || [];
    setProductosEnCarrito(productos);
  }, []);

  const eliminarProducto = (id) => {
    const productosActualizados = productosEnCarrito.filter(producto => producto.id !== id);
    setProductosEnCarrito(productosActualizados);
    localStorage.setItem('carrito', JSON.stringify(productosActualizados));
  };

  const calcularTotal = () => {
    return productosEnCarrito.reduce((total, producto) => {
      const precioProducto = producto.precioConOferta ? producto.precioConOferta : producto.precio;
      return total + (precioProducto * producto.cantidad);
    }, 0).toFixed(2);
  };

  const aumentarCantidad = (id) => {
    const productosActualizados = productosEnCarrito.map(producto => {
      if (producto.id === id) {
        return { ...producto, cantidad: producto.cantidad + 1 };
      }
      return producto;
    });
    setProductosEnCarrito(productosActualizados);
    localStorage.setItem('carrito', JSON.stringify(productosActualizados));
  };

  const disminuirCantidad = (id) => {
    const productosActualizados = productosEnCarrito.map(producto => {
      if (producto.id === id && producto.cantidad > 1) {
        return { ...producto, cantidad: producto.cantidad - 1 };
      }
      return producto;
    });
    setProductosEnCarrito(productosActualizados);
    localStorage.setItem('carrito', JSON.stringify(productosActualizados));
  };

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setError(''); // Limpiar cualquier error al cerrar el modal
  };

  const verificarCampos = () => {
    // Verificar si todos los campos requeridos están completos
    if (!nombre || !apellido || !metodoPago || !direccionDestino || !empresaEnvio) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (metodoPago === 'tarjeta' && (!cuentaBancaria || !contrasenaBancaria)) {
      setError('Debe ingresar cuenta bancaria y contraseña para el pago con tarjeta');
      return false;
    }

    return true;
  };

  const manejarPago = () => {
    if (!verificarCampos()) {
      return; // Si hay errores en los campos, no proceder
    }

    // Crear un objeto con los datos del pedido
    const pedido = {
      nombre,
      apellido,
      metodoPago,
      direccionDestino,
      empresaEnvio,
      productos: productosEnCarrito.map(producto => ({
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        precioUnitario: producto.precioConOferta ? producto.precioConOferta : producto.precio,
        precioTotal: (producto.precioConOferta ? producto.precioConOferta : producto.precio) * producto.cantidad
      })),
      total: calcularTotal(),
    };

    // Simular el envío del pedido, por ejemplo, guardarlo en el localStorage
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Guardar el cliente en el localStorage (para la lista de clientes)
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const cliente = {
      nombre,
      apellido
    };
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    // Mostrar un mensaje de éxito y cerrar el modal
    alert("Compra realizada exitosamente!");
    cerrarModal(); // Cerrar el modal después de realizar la compra
};

  return (
    <div className="carrito-page">
      <DashboardHeader /> {/* Aquí se incluye el encabezado */}

      <div className="carrito-container">
        <h2 className="carrito-title">Carrito de Compras</h2>
        <div className="carrito-items">
          {productosEnCarrito.length === 0 ? (
            <p className="no-items">No hay productos en tu carrito</p>
          ) : (
            <ul>
              {productosEnCarrito.map((producto) => (
                <li key={producto.id} className="carrito-item">
                  <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
                  <div className="producto-info">
                    <h4>{producto.nombre}</h4>
                    <p>Precio Unitario: S/{producto.precioConOferta ? producto.precioConOferta : producto.precio}</p>
                    <div className="producto-cantidad">
                      <button onClick={() => disminuirCantidad(producto.id)} className="btn-cantidad">-</button>
                      <span>{producto.cantidad}</span>
                      <button onClick={() => aumentarCantidad(producto.id)} className="btn-cantidad">+</button>
                    </div>
                    <p>Precio Total: S/{(producto.precioConOferta ? producto.precioConOferta : producto.precio) * producto.cantidad}</p>
                  </div>
                  <button onClick={() => eliminarProducto(producto.id)} className="btn-eliminar">Eliminar</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {productosEnCarrito.length > 0 && (
          <div className="carrito-total">
            <h3>Total: S/{calcularTotal()}</h3>
            <button onClick={abrirModal} className="btn-comprar">Proceder a la compra</button>
          </div>
        )}
      </div>

      {/* Modal de Confirmación de Datos */}
      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>×</span>
            <h2>Confirmar Datos</h2>
            {error && <p className="error">{error}</p>} {/* Mostrar error si hay */}
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
            <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
              <option value="">Selecciona Método de Pago</option>
              <option value="tarjeta">Tarjeta de Crédito/Débito</option>
              <option value="yape">Yape</option>
              <option value="plin">Plin</option>
            </select>

            {/* Métodos de pago con tarjeta */}
            {metodoPago === 'tarjeta' && (
              <div>
                <select>
                  <option value="bcp">BCP</option>
                  <option value="bbva">BBVA</option>
                  <option value="interbank">Interbank</option>
                  <option value="caja_huancayo">Caja Huancayo</option>
                </select>
                <input
                  type="text"
                  placeholder="Cuenta Bancaria"
                  value={cuentaBancaria}
                  onChange={(e) => setCuentaBancaria(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={contrasenaBancaria}
                  onChange={(e) => setContrasenaBancaria(e.target.value)}
                />
              </div>
            )}

            {/* Método de pago con Yape o Plin */}
            {(metodoPago === 'yape' || metodoPago === 'plin') && (
              <div>
                <QRCode value="Pago con Yape o Plin" />
                <button onClick={() => alert("Código QR Escaneado!")}>Código Escaneado OK</button>
              </div>
            )}

            {/* Dirección de destino */}
            <input
              type="text"
              placeholder="Ingresa la dirección de destino"
              value={direccionDestino}
              onChange={(e) => setDireccionDestino(e.target.value)}
            />

            {/* Empresas de envío */}
            <select value={empresaEnvio} onChange={(e) => setEmpresaEnvio(e.target.value)}>
              <option value="cruz_del_sur">Cruz del Sur</option>
              <option value="servitaxi">Shalom</option>
              <option value="tolls">Cargo</option>
              <option value="movil">Nacional</option>
            </select>

            <button onClick={manejarPago}>Confirmar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
