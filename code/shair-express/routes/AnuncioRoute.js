// Importamos Express para crear el enrutador.
const express = require("express");

// Creamos una nueva instancia del enrutador de Express.
const router = express.Router();

// Importamos el controlador de anuncios que contiene las funciones para manejar las solicitudes HTTP.
const anuncioController = require("../controllers/AnuncioController");

// Definimos la ruta para manejar las solicitudes GET en la raíz de este enrutador.
// Esta ruta llama a la función 'leerAnuncio' del controlador para obtener una lista de anuncios.
router.get("/", anuncioController.leerAnuncio);

// Definimos la ruta para manejar las solicitudes POST en la raíz de este enrutador.
// Esta ruta llama a la función 'crearAnuncio' del controlador para crear un nuevo anuncio.
router.post("/", anuncioController.crearAnuncio);

// Definimos la ruta para manejar las solicitudes PUT en la raíz de este enrutador.
// Esta ruta llama a la función 'actualizarAnuncio' del controlador para actualizar un anuncio existente.
router.put("/", anuncioController.actualizarAnuncio);

// Definimos la ruta para manejar las solicitudes DELETE en la raíz de este enrutador.
// Esta ruta llama a la función 'eliminarAnuncio' del controlador para eliminar un anuncio.
router.delete("/", anuncioController.eliminarAnuncio);

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;
