const express = require('express');
const sequelize = require('./db');
require('dotenv').config();
const cors = require('cors');
const Huesped = require('./Huesped.js');

const app = express();
app.use(express.json());
app.use(cors());

// Probar conexión con la base de datos
sequelize.authenticate()
  .then(() => console.log('✅ Conectado a PostgreSQL (hola)'))
  .catch(err => console.error('❌ Error DB:', err));

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('Servidor conectado a la DB hola');
});

// Obtener todos los huéspedes
app.get('/huespedes', async (req, res) => {
  try {
    const registros = await Huesped.findAll();
    res.json(registros);
  } catch (error) {
    console.error('❌ Error al obtener registros:', error);
    res.status(500).json({
      error: 'Error al obtener los registros',
      details: error.message
    });
  }
});

// Crear un nuevo huésped
app.post('/huespedes', async (req, res) => {
  try {
    const { nombre, apellido } = req.body;

    // Validar que no falten datos
    if (!nombre || !apellido) {
      return res.status(400).json({ error: 'Faltan datos: nombre y apellido son obligatorios' });
    }

    const nuevoHuesped = await Huesped.create({ nombre, apellido });

    res.status(201).json({
      mensaje: '✅ Huésped creado correctamente',
      huesped: nuevoHuesped
    });
  } catch (error) {
    console.error('❌ Error al crear huésped:', error);
    res.status(500).json({
      error: 'Error al crear huésped',
      details: error.message
    });
  }
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`🚀 Servidor en http://localhost:${port}`));
