import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import DashboardFooter from './components/DashboardFooter';
import DashboardMain from './components/DashboardMain';
import Login from './components/Login';
import VistaOpcion from './components/VistaOpcion';
import Proceso from './components/Proceso'; // Componente para mostrar el proceso
import Macroprocesos from './pages/Macroprocesos';
import './styles/Global.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para Login */}
        <Route path="/" element={<Login />} />

        {/* Ruta para Dashboard */}
        <Route
          path="/dashboard"
          element={
            <>
              <DashboardHeader />
              <DashboardMain />
              <DashboardFooter />
            </>
          }
        />

        {/* Ruta para la vista de cada opción seleccionada dentro del Dashboard */}
        <Route path="/dashboard/:opcion" element={
          <>
            <DashboardHeader />
            <VistaOpcion /> {/* Mostrar la opción seleccionada */}
            <DashboardFooter />
          </>
        }>
          {/* Rutas para los procesos dentro de cada opción */}
          <Route path=":proceso" element={<Proceso />} />
        </Route>

        {/* Ruta para otras páginas */}
        <Route path="/Sistemas/Macroprocesos" element={<Macroprocesos />} />
      </Routes>
    </Router>
  );
}

export default App;
