const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Vital para mantener la conexión segura con Neon
  }
});

// ESTO EVITA QUE EL SERVIDOR SE APAGUE CUANDO NEON CIERRA UNA CONEXIÓN INACTIVA
pool.on('error', (err, client) => {
  console.error('Error inesperado en la base de datos:', err);
});

module.exports = pool;
