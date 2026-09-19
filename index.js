require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba general
app.get('/', (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

// Rutas de Clientes
app.get('/clientes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/clientes', async (req, res) => {
  try {
    const { nomcliente, contacto, departamento, ciudad } = req.body;
    const result = await db.query(
      'INSERT INTO clientes (nomcliente, contacto, departamento, ciudad) VALUES ($1, $2, $3, $4) RETURNING *',
      [nomcliente, contacto, departamento, ciudad]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// (Igual puedes agregar aquí abajo las demás rutas de productos, ventas, etc.)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
