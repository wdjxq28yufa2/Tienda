import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import DashboardFooter from './components/DashboardFooter';
import DashboardMain from './components/DashboardMain';
import Register from './components/Register';
import VistaOpcion from './components/VistaOpcion';
import Proceso from './components/Proceso';
import Macroprocesos from './pages/Macroprocesos';
import Clientes from './components/Clientes'; // Importar Clientes
import Aportes from './components/Aportes'; // Importar Aportes
import Categorias from './components/Categorias'; // Importar Categorias
import Productos from './components/Productos'; // Importar Productos
import Ofertas from './components/Ofertas'; // Importar Ofertas
import Pedidos from './components/Pedidos'; // Importar Pedidos
import Carrito from './components/Carrito'; // Importar Carrito

// Aquí eliminamos la verificación de autenticación.
function ProtectedRoute({ element }) {
  return element; // Siempre permite el acceso a las rutas sin validación de autenticación.
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Eliminamos las rutas de login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} /> {/* Redirige al dashboard directamente */}
        
        {/* Ruta para Register (por si alguien necesita registrarse) */}
        <Route path="/register" element={<Register />} />

        {/* Ruta para el dashboard, ya no es necesario verificar autenticación */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <>
                  <DashboardHeader />
                  <DashboardMain />
                  <DashboardFooter />
                </>
              }
            />
          }
        />

        {/* Rutas para el carrito y las opciones del Dashboard */}
        <Route path="dashboard/carrito" element={<Carrito />} />

        <Route
          path="/dashboard/categorias"
          element={
            <ProtectedRoute
              element={
                <>
                  <DashboardHeader />
                  <Categorias />
                  <DashboardFooter />
                </>
              }
            />
          }
        />

        <Route
          path="/dashboard/productos"
          element={
            <ProtectedRoute
              element={
                <>
                  <DashboardHeader />
                  <Productos />
                  <DashboardFooter />
                </>
              }
            />
          }
        />

        <Route
          path="/dashboard/ofertas"
          element={
            <ProtectedRoute
              element={
                <>
                  <DashboardHeader />
                  <Ofertas />
                  <DashboardFooter />
                </>
              }
            />
          }
        />

        <Route
          path="/dashboard/pedidos"
          element={
            <ProtectedRoute
              element={
                <>
                  <DashboardHeader />
                  <Pedidos />
                  <DashboardFooter />
                </>
              }
            />
          }
        />

        <Route
          path="/dashboard/clientes"
          element={
            <ProtectedRoute
              element={
                <>
                  <DashboardHeader />
                  <Clientes />
                  <DashboardFooter />
                </>
              }
            />
          }
        />

        <Route
          path="/dashboard/aportes"
          element={
            <ProtectedRoute
              element={
                <>
                  <DashboardHeader />
                  <Aportes />
                  <DashboardFooter />
                </>
              }
            />
          }
        />

        {/* Ruta para las demás opciones dinámicas */}
        <Route path="/dashboard/:opcion" element={
          <ProtectedRoute
            element={
              <>
                <DashboardHeader />
                <VistaOpcion />
                <DashboardFooter />
              </>
            }
          />
        }>
          <Route path=":proceso" element={<ProtectedRoute element={<Proceso />} />} />
        </Route>

        <Route path="/Sistemas/Macroprocesos" element={<ProtectedRoute element={<Macroprocesos />} />} />
      </Routes>
    </Router>
  );
}

export default App;
