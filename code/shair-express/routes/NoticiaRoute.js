// Importamos Express para crear el enrutador.
const express = require("express");

// Creamos una nueva instancia del enrutador de Express.
const router = express.Router();

// Importamos el controlador de noticias que contiene las funciones para manejar las solicitudes HTTP.
const noticiaController = require("../controllers/NoticiaController");

// Definimos la ruta para manejar las solicitudes GET en la raíz de este enrutador.
// Esta ruta llama a la función 'leerNoticia' del controlador para obtener una lista de noticias.
router.get("/", noticiaController.leerNoticia);

// Definimos la ruta para manejar las solicitudes POST en la raíz de este enrutador.
// Esta ruta llama a la función 'crearNoticia' del controlador para crear una nueva noticia.
router.post("/", noticiaController.crearNoticia);

// Definimos la ruta para manejar las solicitudes PUT en la raíz de este enrutador.
// Esta ruta llama a la función 'actualizarNoticia' del controlador para actualizar una noticia existente.
router.put("/", noticiaController.actualizarNoticia);

// Definimos la ruta para manejar las solicitudes DELETE en la raíz de este enrutador.
// Esta ruta llama a la función 'eliminarNoticia' del controlador para eliminar una noticia.
router.delete("/", noticiaController.eliminarNoticia);

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;
