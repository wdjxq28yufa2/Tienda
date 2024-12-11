import React, { useState, useEffect } from 'react';
import '../styles/Productos.css'; // Importar los estilos

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Aquí puedes agregar los productos con su precio normal y sin oferta
    const productosLista = [
      { id: 1, nombre: 'Camiseta', precio: 39.99, imagen: '/images/camiseta.jpg', cantidad: 1 },
      { id: 2, nombre: 'Jeans', precio: 59.99, imagen: '/images/jeans.jpg', cantidad: 1 },
      { id: 3, nombre: 'Chaqueta', precio: 89.99, imagen: '/images/chaqueta.jpg', cantidad: 1 },
      { id: 4, nombre: 'Zapatos', precio: 79.99, imagen: '/images/zapatos.jpg', cantidad: 1 },
      { id: 5, nombre: 'Sudadera', precio: 49.99, imagen: '/images/sudadera.jpg', cantidad: 1 },
      { id: 6, nombre: 'Gorra', precio: 19.99, imagen: '/images/gorra.jpg', cantidad: 1 },
      { id: 7, nombre: 'Pantalón Corto', precio: 29.99, imagen: '/images/pantalon-corto.jpg', cantidad: 1 },
      { id: 8, nombre: 'Chaqueta de Cuero', precio: 149.99, imagen: '/images/chaqueta-cuero.jpg', cantidad: 1 },
      { id: 9, nombre: 'Bufanda', precio: 15.99, imagen: '/images/bufanda.jpg', cantidad: 1 },
      { id: 10, nombre: 'Botines', precio: 99.99, imagen: '/images/botines.jpg', cantidad: 1 },
      { id: 11, nombre: 'Pantalón de Vestir', precio: 89.99, imagen: '/images/pantalon-vestir.jpg', cantidad: 1 },
      { id: 12, nombre: 'Abrigo', precio: 120.99, imagen: '/images/abrigo.jpg', cantidad: 1 },
      { id: 13, nombre: 'Sombrero', precio: 25.99, imagen: '/images/sombrero.jpg', cantidad: 1 },
      { id: 14, nombre: 'Polo', precio: 35.99, imagen: '/images/polo.jpg', cantidad: 1 },
      { id: 15, nombre: 'Cinturón', precio: 22.99, imagen: '/images/cinturon.jpg', cantidad: 1 },
      { id: 16, nombre: 'Camisa', precio: 49.99, imagen: '/images/camisa.jpg', cantidad: 1 },
      { id: 17, nombre: 'Chaqueta De Lana', precio: 129.99, imagen: '/images/chaqueta-lana.jpg', cantidad: 1 },
      { id: 18, nombre: 'Guantes', precio: 14.99, imagen: '/images/guantes.jpg', cantidad: 1 },
      { id: 19, nombre: 'Camiseta Deportiva', precio: 29.99, imagen: '/images/camiseta-deportiva.jpg', cantidad: 1 },
      { id: 20, nombre: 'Reloj', precio: 199.99, imagen: '/images/reloj.jpg', cantidad: 1 },
      { id: 21, nombre: 'Bolsos', precio: 89.99, imagen: '/images/bolso.jpg', cantidad: 1 },
      { id: 22, nombre: 'Pantalón Skinny', precio: 59.99, imagen: '/images/pantalon-skinny.jpg', cantidad: 1 },
      { id: 23, nombre: 'Camisa De Manga Larga', precio: 45.99, imagen: '/images/camisa-manga-larga.jpg', cantidad: 1 },
      { id: 24, nombre: 'Zapatos De Cuero', precio: 129.99, imagen: '/images/zapatos-cuero.jpg', cantidad: 1 },
      { id: 25, nombre: 'Camiseta De Manga Larga', precio: 34.99, imagen: '/images/camiseta-manga-larga.jpg', cantidad: 1 },
      { id: 26, nombre: 'Pantalón Cargo', precio: 69.99, imagen: '/images/pantalon-cargo.jpg', cantidad: 1 },
      { id: 27, nombre: 'Short Deportivo', precio: 24.99, imagen: '/images/short-deportivo.jpg', cantidad: 1 },
      { id: 28, nombre: 'Chaqueta Impermeable', precio: 109.99, imagen: '/images/chaqueta-impermeable.jpg', cantidad: 1 },
      { id: 29, nombre: 'Suéter', precio: 54.99, imagen: '/images/sueter.jpg', cantidad: 1 },
      { id: 30, nombre: 'Mochila', precio: 39.99, imagen: '/images/mochila.jpg', cantidad: 1 },
      { id: 31, nombre: 'Lentes De Sol', precio: 29.99, imagen: '/images/lentes.jpg', cantidad: 1 },
      { id: 32, nombre: 'Bermuda', precio: 29.99, imagen: '/images/bermuda.jpg', cantidad: 1 },
      { id: 33, nombre: 'Pantalón Chino', precio: 69.99, imagen: '/images/pantalon-chino.jpg', cantidad: 1 },
      { id: 34, nombre: 'Camiseta Estampada', precio: 39.99, imagen: '/images/camiseta-estampada.jpg', cantidad: 1 },
      { id: 35, nombre: 'Falda', precio: 49.99, imagen: '/images/falda.jpg', cantidad: 1 },
      { id: 36, nombre: 'Chaleco', precio: 39.99, imagen: '/images/chaleco.jpg', cantidad: 1 },
      { id: 37, nombre: 'Traje', precio: 249.99, imagen: '/images/traje.jpg', cantidad: 1 },
      { id: 38, nombre: 'Chaqueta De Lluvia', precio: 89.99, imagen: '/images/chaqueta-lluvia.jpg', cantidad: 1 },
      { id: 39, nombre: 'Bermuda De Tela', precio: 34.99, imagen: '/images/bermuda-tela.jpg', cantidad: 1 },
      { id: 40, nombre: 'Pantalón Deportivo', precio: 49.99, imagen: '/images/pantalon-deportivo.jpg', cantidad: 1 },
    ];
    setProductos(productosLista);
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
    <div className="productos-container">
      <h2>Productos</h2>
      <div className="productos-items">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-item">
            <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
            <div className="producto-info">
              <h4>{producto.nombre}</h4>
              <p className="precio">S/{producto.precio}</p>

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

export default Productos;
