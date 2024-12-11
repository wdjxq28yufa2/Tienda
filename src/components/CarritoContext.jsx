// src/context/CarritoContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto del carrito
const CarritoContext = createContext();

// Proveedor del contexto para envolver la aplicación
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    // Obtener los productos del carrito desde el localStorage si existen
    const savedCarrito = localStorage.getItem('carrito');
    return savedCarrito ? JSON.parse(savedCarrito) : [];
  });

  // Función para agregar productos al carrito (con cantidad)
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((item) => item.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  // Función para eliminar productos del carrito
  const eliminarDelCarrito = (productoId) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== productoId));
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Guardar el carrito en el localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para usar el contexto de carrito en otros componentes
export const useCarrito = () => {
  return useContext(CarritoContext);
};
