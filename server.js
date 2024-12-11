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
  host: 'junction.proxy.rlwy.net',
  user: 'root', 
  password: 'LkCuPoSuOppziKvSYyRUJZbDfLPngPFA',
  database: 'railway'
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
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
