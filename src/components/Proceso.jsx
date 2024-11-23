import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Proceso = () => {
  const { opcion, proceso } = useParams(); // Obtener la opción y el proceso desde la URL
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    if (file) {
      console.log('File:', file.name);
    }
  };

  // Aquí definimos los formularios dependiendo del proceso
  const renderFormulario = () => {
    if (opcion === 'practicas-preprofesionales') {
      switch (proceso) {
        case 'revisión-e-inscripcion-del-plan':
          return (
            <form onSubmit={handleSubmit}>
              <h3>Formulario: Revisión e Inscripción del Plan</h3>
              <label>
                Nombre del Plan:
                <input type="text" name="plan" onChange={handleChange} />
              </label>
              <label>
                Fecha de Inscripción:
                <input type="date" name="fechaInscripcion" onChange={handleChange} />
              </label>
              <button type="submit">Enviar</button>
            </form>
          );
        case 'revisión-de-informes':
          return (
            <form onSubmit={handleSubmit}>
              <h3>Formulario: Revisión de Informes</h3>
              <label>
                Informe a revisar:
                <input type="file" onChange={handleFileChange} accept=".pdf, .doc, .docx" />
              </label>
              <button type="submit">Enviar</button>
            </form>
          );
        case 'inscripción-del-informe-final-y-emisión-de-certificado':
          return (
            <form onSubmit={handleSubmit}>
              <h3>Formulario: Inscripción del Informe Final y Emisión de Certificado</h3>
              <label>
                Informe Final:
                <input type="file" onChange={handleFileChange} accept=".pdf, .doc, .docx" />
              </label>
              <label>
                Fecha de Inscripción:
                <input type="date" name="fechaInscripcion" onChange={handleChange} />
              </label>
              <button type="submit">Enviar</button>
            </form>
          );
        case 'convalidación-de-prácticas-por-experiencia-laboral':
          return (
            <form onSubmit={handleSubmit}>
              <h3>Formulario: Convalidación de Prácticas por Experiencia Laboral</h3>
              <label>
                Nombre de la Empresa:
                <input type="text" name="empresa" onChange={handleChange} />
              </label>
              <label>
                Cargo en la Empresa:
                <input type="text" name="cargo" onChange={handleChange} />
              </label>
              <button type="submit">Enviar</button>
            </form>
          );
        default:
          return <p>Proceso no disponible.</p>;
      }
    } else if (opcion === 'admision') {
      switch (proceso) {
        case 'proceso-1':
          return (
            <form onSubmit={handleSubmit}>
              <h3>Formulario de Admisión</h3>
              <label>
                Nombres:
                <input type="text" name="nombres" onChange={handleChange} />
              </label>
              <label>
                Apellido Paterno:
                <input type="text" name="apellidoPaterno" onChange={handleChange} />
              </label>
              <label>
                Apellido Materno:
                <input type="text" name="apellidoMaterno" onChange={handleChange} />
              </label>
              <label>
                Teléfono:
                <input type="tel" name="telefono" onChange={handleChange} />
              </label>
              <label>
                DNI:
                <input type="text" name="dni" onChange={handleChange} />
              </label>
              <button type="submit">Enviar</button>
            </form>
          );
        default:
          return <p>Proceso no disponible.</p>;
      }
    } else {
      return <p>Opción no disponible.</p>;
    }
  };

  return (
    <div className="proceso">
      {/* Aquí eliminamos "Proceso:" y solo mostramos el nombre del proceso */}
      <h2>{proceso.replace('-', ' ')}</h2>
      {renderFormulario()}
    </div>
  );
};

export default Proceso;
