// Importamos Express para crear el enrutador.
import { Router } from "express";

// Creamos una nueva instancia del enrutador de Express.
const router = Router();

// Importamos el controlador de anuncios que contiene las funciones para manejar las solicitudes HTTP.
import {
  leerAnuncio,
  crearAnuncio,
  actualizarAnuncio,
  eliminarAnuncio,
} from "../controllers/AnuncioController.js";

// Definimos la ruta para manejar las solicitudes GET en la raíz de este enrutador.
// Esta ruta llama a la función 'leerAnuncio' del controlador para obtener una lista de anuncios.
router.get("/", leerAnuncio);

// Definimos la ruta para manejar las solicitudes POST en la raíz de este enrutador.
// Esta ruta llama a la función 'crearAnuncio' del controlador para crear un nuevo anuncio.
router.post("/", crearAnuncio);

// Definimos la ruta para manejar las solicitudes PUT en la raíz de este enrutador.
// Esta ruta llama a la función 'actualizarAnuncio' del controlador para actualizar un anuncio existente.
router.put("/", actualizarAnuncio);

// Definimos la ruta para manejar las solicitudes DELETE en la raíz de este enrutador.
// Esta ruta llama a la función 'eliminarAnuncio' del controlador para eliminar un anuncio.
router.delete("/", eliminarAnuncio);

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
