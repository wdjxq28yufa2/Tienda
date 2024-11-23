// Importar dependencias necesarias
import express from 'express';
import mysql from 'mysql2'; 
import bcrypt from 'bcryptjs'; 
import cors from 'cors'; 

// Crear una instancia de express
const app = express();
const port = 5000; // Puerto donde se ejecutará el servidor

// Usar middlewares
app.use(express.json()); // Para parsear el cuerpo de las peticiones como JSON
app.use(cors()); // Habilitar CORS si es necesario

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Erick', 
  password: 'erickMV123@',
  database: 'universidad_continental'
});

// Verificar la conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Ruta para registrar un usuario (con contraseña cifrada)
app.post('/register', (req, res) => {
  const { correo, password, rol } = req.body;

  // Validar que se hayan recibido todos los datos necesarios
  if (!correo || !password || !rol) {
    return res.status(400).json({ message: 'Correo, contraseña y rol son requeridos' });
  }

  // Cifrar la contraseña usando bcrypt
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error al cifrar la contraseña:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    // Insertar el nuevo usuario con la contraseña cifrada
    db.query('INSERT INTO usuarios (correo, password, rol) VALUES (?, ?, ?)', [correo, hashedPassword, rol], (err, result) => {
      if (err) {
        console.error('Error al guardar el usuario:', err);
        return res.status(500).json({ message: 'Error al guardar el usuario' });
      }

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
