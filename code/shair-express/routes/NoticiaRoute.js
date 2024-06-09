const express = require("express");
const router = express.Router();
const noticiaController = require("../controllers/NoticiaController");

router.get("/", noticiaController.leerNoticia);

router.post("/", noticiaController.crearNoticia);

router.put("/", noticiaController.actualizarNoticia);

router.delete("/", noticiaController.eliminarNoticia);

module.exports = router;
