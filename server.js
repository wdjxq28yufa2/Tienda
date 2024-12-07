// Importar dependencias necesarias

import express from 'express';
import mysql from 'mysql2'; 
import bcrypt from 'bcryptjs'; 
import cors from 'cors'; 
import path from 'path'; // Importamos path

import fs from 'fs'; // Importamos fs para crear directorios


import { realizarScraping } from './scraping.js';



// Crear una instancia de express
const app = express();
const port = 5000; // Puerto donde se ejecutará el servidor

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Usar middlewares
app.use(express.json()); // Para parsear el cuerpo de las peticiones como JSON
app.use(cors()); // Habilitar CORS si es necesario

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Erick', 
  password: 'erickMV123@',
  database: 'coopacWeb'
});

// Verificar la conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

//SCRAPING--------------------------------------------------------------------------------
// Endpoint para iniciar el scraping
app.post('/api/scraping/:dni', async (req, res) => {
  const { dni } = req.params;

  try {
    // Llamar a la función de scraping y esperar el resultado
    await realizarScraping(dni);
    res.json({ success: true, message: 'Scraping realizado correctamente.' });
  } catch (error) {
    console.error('Error en scraping:', error);
    res.status(500).json({ success: false, message: 'Error al realizar scraping.' });
  }
});





// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
  const { nombres, apellido_paterno, apellido_materno, dni, direccion, celular, correo, contrasena } = req.body;

  // Validar que se hayan recibido todos los datos necesarios
  if (!nombres || !apellido_paterno || !dni || !direccion || !celular || !correo || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  // Verificar si el correo o el DNI ya están registrados
  db.query('SELECT * FROM usuarios WHERE correo = ? OR dni = ?', [correo, dni], (err, result) => {
    if (err) {
      console.error('Error en la consulta de verificación:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    // Si ya existe un usuario con el correo o DNI proporcionado
    if (result.length > 0) {
      return res.status(400).json({ message: 'Correo o DNI ya registrados' });
    }

    // Cifrar la contraseña usando bcrypt
    bcrypt.hash(contrasena, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error al cifrar la contraseña:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
      }

      // Insertar el nuevo usuario con la contraseña cifrada
      db.query('INSERT INTO usuarios (nombres, apellido_paterno, apellido_materno, dni, direccion, celular, correo, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [nombres, apellido_paterno, apellido_materno, dni, direccion, celular, correo, hashedPassword], 
        (err, result) => {
          if (err) {
            console.error('Error al guardar el usuario:', err);
            return res.status(500).json({ message: 'Error al guardar el usuario' });
          }

          res.status(201).json({ message: 'Usuario registrado exitosamente' });
        });
    });
  });
});

// Ruta para iniciar sesión (comparar la contraseña cifrada)
app.post('/login', (req, res) => {
  const { correo, password } = req.body;

  // Validar que se haya recibido el correo y la contraseña
  if (!correo || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
  }

  // Buscar al usuario en la base de datos
  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, result) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    // Verificar si el usuario existe
    if (result.length === 0) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = result[0]; // Tomar el primer usuario encontrado

    // Comparar la contraseña en texto plano con la contraseña cifrada
    bcrypt.compare(password, usuario.password, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar la contraseña:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
      }

      // Si las contraseñas no coinciden
      if (!isMatch) {
        console.log('Contraseña incorrecta');
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Si las contraseñas coinciden, devolver un mensaje de éxito o el token
      res.status(200).json({ message: 'Login exitoso', usuario });
    });
  });
});

//CLIENTEEE-----------------------------------------------------------------------
// Obtener todos los clientes
app.get('/api/clientes', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      console.error('Error al obtener los clientes:', err);
      return res.status(500).json({ message: 'Error al obtener los clientes' });
    }
    res.json(results);
  });
});

// Agregar un nuevo cliente
app.post('/api/clientes', (req, res) => {
  const { nombres, apellido_paterno, apellido_materno, dni, direccion, celular, correo } = req.body;

  db.query('INSERT INTO clientes (nombres, apellido_paterno, apellido_materno, dni, direccion, celular, correo) VALUES (?, ?, ?, ?, ?, ?, ?)', 
  [nombres, apellido_paterno, apellido_materno, dni, direccion, celular, correo], 
  (err, result) => {
    if (err) {
      console.error('Error al agregar cliente:', err);
      return res.status(500).json({ message: 'Error al agregar el cliente' });
    }
    res.status(201).json({ id: result.insertId, nombres, apellido_paterno, apellido_materno, dni, direccion, celular, correo });
  });
});

// Actualizar un cliente
app.put('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nombres, apellido_paterno, apellido_materno, dni, direccion, celular, correo } = req.body;

  db.query('UPDATE clientes SET nombres = ?, apellido_paterno = ?, apellido_materno = ?, dni = ?, direccion = ?, celular = ?, correo = ? WHERE id = ?',
  [nombres, apellido_paterno, apellido_materno, dni, direccion, celular, correo, id],
  (err, result) => {
    if (err) {
      console.error('Error al actualizar el cliente:', err);
      return res.status(500).json({ message: 'Error al actualizar el cliente' });
    }
    res.json({ id, nombres, apellido_paterno, apellido_materno, dni, direccion, celular, correo });
  });
});

// Eliminar un cliente
app.delete('/api/clientes/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM clientes WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el cliente:', err);
      return res.status(500).json({ message: 'Error al eliminar el cliente' });
    }
    res.json({ message: 'Cliente eliminado' });
  });
});

// Crear expediente (crear una carpeta para cada cliente)
app.post('/api/clientes/expediente/:dni', (req, res) => {
  const { dni } = req.params;
  const { nombres, apellido_paterno, apellido_materno } = req.body; // Asegúrate de que estos datos se envíen desde el frontend

  // Formar la carpeta con el formato "DNI - APELLIDO PATERNO APELLIDO MATERNO NOMBRE"
  const expedienteFolderName = `${dni} - ${apellido_paterno} ${apellido_materno} ${nombres}`;

  // Asegúrate de que la ruta esté correctamente formada sin duplicar 'C:\'
  const expedientePath = path.resolve('expedientes', expedienteFolderName);

  // Normalizamos la ruta para asegurarnos de que esté correcta
  const normalizedPath = path.normalize(expedientePath);

  console.log('Ruta normalizada:', normalizedPath);  // Para verificar la ruta construida

  // Verificar si el expediente ya existe
  if (fs.existsSync(normalizedPath)) {
    return res.status(400).json({ success: false, message: 'El expediente ya existe.' });
  }

  // Crear el directorio para el expediente
  fs.mkdir(normalizedPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error al crear expediente:', err);  // Imprime el error completo
      return res.status(500).json({ success: false, message: `Error al crear expediente: ${err.message}` });  // Devuelve el mensaje de error detallado
    }
    res.json({ success: true, message: 'Expediente creado exitosamente.' });
  });
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
