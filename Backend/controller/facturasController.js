const sql = require('mssql');
const config = require('../db');

// Crear factura
exports.crearFactura = async (req, res) => {
  try {
    const { idCliente, fecha, nombreProducto, precio, valorDescuento, iva, valorTotal } = req.body;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('idCliente', sql.Int, idCliente)
      .input('fecha', sql.Date, fecha)
      .input('nombreProducto', sql.NVarChar, nombreProducto)
      .input('precio', sql.Decimal(18, 2), precio)
      .input('valorDescuento', sql.Decimal(5, 2), valorDescuento)
      .input('iva', sql.Decimal(18, 2), iva)
      .input('valorTotal', sql.Decimal(18, 2), valorTotal)
      .query('INSERT INTO Facturas (IdCliente, Fecha, NombreProducto, Precio, ValorDescuento, Iva, ValorTotal) VALUES (@idCliente, @fecha, @nombreProducto, @precio, @valorDescuento, @iva, @valorTotal)');
    res.status(201).json({ message: 'Factura creada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear factura', details: err });
  }
};

// Listar facturas
exports.listarFacturas = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, idCliente } = req.query;
    const pool = await sql.connect(config);
    let query = 'SELECT * FROM Facturas WHERE 1=1';
    if (fechaInicio && fechaFin) {
      query += ' AND Fecha BETWEEN @fechaInicio AND @fechaFin';
    }
    if (idCliente) {
      query += ' AND IdCliente = @idCliente';
    }
    const request = pool.request();
    if (fechaInicio && fechaFin) {
      request.input('fechaInicio', sql.Date, fechaInicio);
      request.input('fechaFin', sql.Date, fechaFin);
    }
    if (idCliente) {
      request.input('idCliente', sql.Int, idCliente);
    }
    const result = await request.query(query);
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar facturas', details: err });
  }
};
