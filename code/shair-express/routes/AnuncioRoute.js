const express = require("express");
const router = express.Router();
const anuncioController = require("../controllers/AnuncioController");

router.get("/", anuncioController.leerAnuncio);

router.post("/", anuncioController.crearAnuncio);

router.put("/", anuncioController.actualizarAnuncio);

router.delete("/", anuncioController.eliminarAnuncio);

module.exports = router;
