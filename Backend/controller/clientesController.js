const sql = require('mssql');
const config = require('../db');

// Crear cliente
exports.crearCliente = async (req, res) => {
  try {
    const { nombre, tipoIdentificacion, numeroIdentificacion, observaciones } = req.body;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('tipoIdentificacion', sql.NVarChar, tipoIdentificacion)
      .input('numeroIdentificacion', sql.NVarChar, numeroIdentificacion)
      .input('observaciones', sql.NVarChar, observaciones)
      .query('INSERT INTO Clientes (nombre, tipoIdentificacion, numeroIdentificacion, observaciones) VALUES (@nombre, @tipoIdentificacion, @numeroIdentificacion, @observaciones)');
    res.status(201).json({ message: 'Cliente creado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear cliente', details: err });
  }
};

// Listar clientes
exports.listarClientes = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Clientes');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar clientes', details: err });
  }
};
