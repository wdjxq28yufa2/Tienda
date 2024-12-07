import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import DashboardFooter from './components/DashboardFooter';
import DashboardMain from './components/DashboardMain';
import Login from './components/Login';
import Register from './components/Register';
import VistaOpcion from './components/VistaOpcion';
import Proceso from './components/Proceso';
import Macroprocesos from './pages/Macroprocesos';
import Clientes from './components/Clientes'; // Asegúrate de importar Clientes

function ProtectedRoute({ element }) {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? element : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Ruta para Register */}
        <Route path="/register" element={<Register />} />

        {/* Ruta para Dashboard */}
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

        {/* Ruta para CLIENTES en el Dashboard */}
        <Route
          path="/dashboard/CLIENTES"
          element={
            <ProtectedRoute
              element={
                <>
                  <DashboardHeader />
                  <Clientes /> {/* Aquí se muestra el componente Clientes */}
                  <DashboardFooter />
                </>
              }
            />
          }
        />

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
