// Importamos Express para crear el enrutador.
import { Router } from "express";

// Creamos una nueva instancia del enrutador de Express.
const router = Router();

// Importamos el controlador de recomendaciones que contiene las funciones para manejar las solicitudes HTTP.
import {
  leerRecomendacion,
  crearRecomendacion,
  actualizarRecomendacion,
  eliminarRecomendacion,
} from "../controllers/RecomendacionController.js";

// Definimos la ruta para manejar las solicitudes GET en la raíz de este enrutador.
// Esta ruta llama a la función 'leerRecomendacion' del controlador para obtener una lista de recomendaciones.
router.get("/", leerRecomendacion);

// Definimos la ruta para manejar las solicitudes POST en la raíz de este enrutador.
// Esta ruta llama a la función 'crearRecomendacion' del controlador para crear una nueva recomendación.
router.post("/", crearRecomendacion);

// Definimos la ruta para manejar las solicitudes PUT en la raíz de este enrutador.
// Esta ruta llama a la función 'actualizarRecomendacion' del controlador para actualizar una recomendación existente.
router.put("/", actualizarRecomendacion);

// Definimos la ruta para manejar las solicitudes DELETE en la raíz de este enrutador.
// Esta ruta llama a la función 'eliminarRecomendacion' del controlador para eliminar una recomendación.
router.delete("/", eliminarRecomendacion);

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
