const express = require("express");
const router = express.Router();
const administradorController = require("../controllers/AdministradorController");

router.get("/", administradorController.leerAdministrador);

router.post("/", administradorController.crearAdministrador);

router.put("/", administradorController.actualizarAdministrador);

router.delete("/", administradorController.eliminarAdministrador);

module.exports = router;
