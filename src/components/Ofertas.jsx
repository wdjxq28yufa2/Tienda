import React, { useState, useEffect } from 'react';
import '../styles/Ofertas.css'; // Importar los estilos

const Ofertas = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Aquí se podrían obtener los productos de una API o base de datos
    // Los productos tienen precio original y precio con descuento
    const productosConOferta = [
      { id: 1, nombre: 'Camiseta de Algodón', precioOriginal: 50, precioConOferta: 35, imagen: '/images/camiseta.jpg', cantidad: 1 },
      { id: 2, nombre: 'Pantalón Jeans', precioOriginal: 80, precioConOferta: 60, imagen: '/images/pantalon.jpg', cantidad: 1 },
      { id: 3, nombre: 'Chaqueta de Cuero', precioOriginal: 120, precioConOferta: 90, imagen: '/images/chaqueta.jpg', cantidad: 1 },
      // Puedes agregar más productos aquí
    ];
    setProductos(productosConOferta);
  }, []);

  const cambiarCantidad = (id, operacion) => {
    setProductos(prevProductos =>
      prevProductos.map(producto =>
        producto.id === id
          ? { ...producto, cantidad: Math.max(1, producto.cantidad + (operacion === 'sumar' ? 1 : -1)) }
          : producto
      )
    );
  };

  const agregarAlCarrito = (producto) => {
    // Obtener productos actuales del carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
      // Si ya existe, actualizar la cantidad
      productoExistente.cantidad += producto.cantidad;
    } else {
      // Si no está en el carrito, agregar el producto
      carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar mensaje de producto agregado
    setMensaje('Producto agregado al carrito');
    setTimeout(() => setMensaje(''), 2000); // Mensaje desaparece después de 2 segundos
  };

  return (
    <div className="ofertas-container">
      <h2>Ofertas Especiales</h2>
      <div className="ofertas-items">
        {productos.map((producto) => (
          <div key={producto.id} className="oferta-item">
            <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
            <div className="producto-info">
              <h4>{producto.nombre}</h4>
              <p className="precio-original">S/{producto.precioOriginal}</p>
              <p className="precio-oferta">S/{producto.precioConOferta}</p>

              {/* Controles de cantidad */}
              <div className="cantidad-container">
                <button onClick={() => cambiarCantidad(producto.id, 'restar')} className="btn-cantidad">-</button>
                <span className="cantidad">{producto.cantidad}</span>
                <button onClick={() => cambiarCantidad(producto.id, 'sumar')} className="btn-cantidad">+</button>
              </div>

              {/* Botón de agregar al carrito */}
              <button 
                onClick={() => agregarAlCarrito(producto)} 
                className="btn-agregar-carrito"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje de producto agregado */}
      {mensaje && <div className="mensaje-agregado">{mensaje}</div>}
    </div>
  );
};

export default Ofertas;
