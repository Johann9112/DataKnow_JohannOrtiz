const express = require('express');
const router = express.Router();
const clientesController = require('../controller/clientesController');

// Rutas para clientes
router.post('/', clientesController.crearCliente);
router.get('/', clientesController.listarClientes);

module.exports = router;
