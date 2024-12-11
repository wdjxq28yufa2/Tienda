import express from 'express';
import mysql from 'mysql2'; 
import cors from 'cors'; 
import path from 'path'; 
import { config } from 'dotenv'; // Para cargar las variables de entorno
import fs from 'fs'; // Importamos fs para crear directorios
import url from 'url'; // Para usar import.meta.url

// Cargar las variables de entorno desde el archivo .env
config();  

const app = express();
const port = process.env.PORT || 8080; // El puerto puede venir desde las variables de entorno

// Convertir import.meta.url a una ruta absoluta
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Usar middlewares
app.use(express.json()); // Para parsear el cuerpo de las peticiones como JSON
app.use(cors()); // Habilitar CORS si es necesario

// Configuración de la base de datos utilizando las variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,  // Usar la variable de entorno DB_HOST
  user: process.env.DB_USERNAME,  // Usar la variable de entorno DB_USERNAME
  password: process.env.DB_PASSWORD,  // Usar la variable de entorno DB_PASSWORD
  database: process.env.DB_DATABASE,  // Usar la variable de entorno DB_DATABASE
  port: process.env.DB_PORT || 3306  // Usar el puerto de la base de datos
});

// Verificar la conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Servir los archivos estáticos del frontend (React/Vite)
app.use(express.static(path.join(__dirname, 'dist'))); // Asegúrate de que 'dist' es la carpeta generada

// Enviar el archivo HTML de React cuando se accede a la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Cambia 'dist' por 'build' si es necesario
});

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {  // Escuchar en todas las interfaces de red
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
