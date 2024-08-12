const express = require('express');
const router = express.Router();
const facturasController = require('../controller/facturasController');

// Rutas para facturas
router.post('/', facturasController.crearFactura);
router.get('/', facturasController.listarFacturas);

module.exports = router;
