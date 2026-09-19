const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Vital para conexiones remotas a Neon
  }
});

// ESTO EVITA QUE EL SERVIDOR SE CAIGA CUANDO NEON CIERRA UNA CONEXIÓN INACTIVA
pool.on('error', (err, client) => {
  console.error('Error inesperado en el cliente de base de datos', err);
});

module.exports = pool;
