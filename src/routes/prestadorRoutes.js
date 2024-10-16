const express = require('express');
const router = express.Router();
const prestadorController = require('../controllers/prestadorController');

// Criar novo prestador
router.post('/', prestadorController.createPrestador);

// Encontrar prestadores próximos
router.post('/proximos', prestadorController.findNearbyPrestadores);

module.exports = router;
