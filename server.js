import express from 'express';
import mysql from 'mysql2'; 
import cors from 'cors'; 
import path from 'path'; 
import { config } from 'dotenv'; // Para cargar las variables de entorno
import fs from 'fs'; // Importamos fs para crear directorios

// Cargar las variables de entorno desde el archivo .env
config();  

const app = express();
const port = process.env.PORT || 8080; // El puerto puede venir desde las variables de entorno

const __dirname = path.dirname(new URL(import.meta.url).pathname);

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

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {  // Escuchar en todas las interfaces de red
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

