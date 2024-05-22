const express = require('express');
const router = express.Router();
const superadministradorController = require('../controllers/SuperadministradorController');

router.get('/', superadministradorController.leerSuperadministrador);

router.post('/', superadministradorController.crearSuperadministrador);

router.put('/', superadministradorController.actualizarSuperadministrador);

router.delete('/', superadministradorController.eliminarSuperadministrador);

module.exports = router;