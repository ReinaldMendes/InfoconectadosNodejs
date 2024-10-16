const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Criar novo cliente
router.post('/', clienteController.createCliente);

module.exports = router;
