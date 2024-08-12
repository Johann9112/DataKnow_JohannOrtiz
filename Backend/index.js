const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Importar las rutas
const clientesRoutes = require('./routes/clientes');
const facturasRoutes = require('./routes/facturas');
const sql = require('mssql');
const config = require('./db');

// Configura CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware
app.use(express.json());
app.use('/clientes', clientesRoutes);
app.use('/facturas', facturasRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Conexión a la base de datos
sql.connect(config)
  .then(pool => {
    if (pool.connected) {
      console.log('Coneccion exitosa a SQL Server');
    }
  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });
