const express = require('express');
const router = express.Router();
const recomendacionController = require('../controllers/RecomendacionController');

router.get('/', recomendacionController.leerRecomendacion);

router.post('/', recomendacionController.crearRecomendacion);

router.put('/', recomendacionController.actualizarRecomendacion);

router.delete('/', recomendacionController.eliminarRecomendacion);

module.exports = router;