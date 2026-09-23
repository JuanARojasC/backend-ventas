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

// --- CLIENTES ---
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

// --- PRODUCTOS ---
app.get('/productos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/productos', async (req, res) => {
  try {
    const { nomproducto, cantidad, precio } = req.body;
    const result = await db.query(
      'INSERT INTO productos (nomproducto, cantidad, precio) VALUES ($1, $2, $3) RETURNING *',
      [nomproducto, cantidad, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- VENTAS ---
app.get('/ventas', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM ventas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/ventas', async (req, res) => {
  try {
    const { id_cliente, fecha_venta, total, estado } = req.body;
    const result = await db.query(
      'INSERT INTO ventas (id_cliente, fecha_venta, total, estado) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_cliente, fecha_venta, total, estado]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- DETALLE VENTA ---
app.get('/detalle-venta', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM detalle_venta');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/detalle-venta', async (req, res) => {
  try {
    const { id_venta, id_producto, cantidad, precio_unitario, subtotal } = req.body;
    const result = await db.query(
      'INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id_venta, id_producto, cantidad, precio_unitario, subtotal]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
