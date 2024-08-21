// Importamos Express para crear el enrutador.
const express = require("express");

// Creamos una nueva instancia del enrutador de Express.
const router = express.Router();

// Importamos el controlador de recomendaciones que contiene las funciones para manejar las solicitudes HTTP.
const recomendacionController = require("../controllers/RecomendacionController");

// Definimos la ruta para manejar las solicitudes GET en la raíz de este enrutador.
// Esta ruta llama a la función 'leerRecomendacion' del controlador para obtener una lista de recomendaciones.
router.get("/", recomendacionController.leerRecomendacion);

// Definimos la ruta para manejar las solicitudes POST en la raíz de este enrutador.
// Esta ruta llama a la función 'crearRecomendacion' del controlador para crear una nueva recomendación.
router.post("/", recomendacionController.crearRecomendacion);

// Definimos la ruta para manejar las solicitudes PUT en la raíz de este enrutador.
// Esta ruta llama a la función 'actualizarRecomendacion' del controlador para actualizar una recomendación existente.
router.put("/", recomendacionController.actualizarRecomendacion);

// Definimos la ruta para manejar las solicitudes DELETE en la raíz de este enrutador.
// Esta ruta llama a la función 'eliminarRecomendacion' del controlador para eliminar una recomendación.
router.delete("/", recomendacionController.eliminarRecomendacion);

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;
