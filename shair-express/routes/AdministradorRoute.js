// Importamos Express para crear el enrutador.
import { Router } from "express";

// Creamos una nueva instancia del enrutador de Express.
const router = Router();

// Importamos el controlador de administradores que contiene las funciones para manejar las solicitudes HTTP.
import {
  leerAdministrador,
  crearAdministrador,
  actualizarAdministrador,
  eliminarAdministrador,
} from "../controllers/AdministradorController.js";

// Definimos la ruta para manejar las solicitudes GET en la raíz de este enrutador.
// Esta ruta llama a la función 'leerAdministrador' del controlador para obtener una lista de administradores.
router.get("/", leerAdministrador);

// Definimos la ruta para manejar las solicitudes POST en la raíz de este enrutador.
// Esta ruta llama a la función 'crearAdministrador' del controlador para crear un nuevo administrador.
router.post("/", crearAdministrador);

// Definimos la ruta para manejar las solicitudes PUT en la raíz de este enrutador.
// Esta ruta llama a la función 'actualizarAdministrador' del controlador para actualizar un administrador existente.
router.put("/", actualizarAdministrador);

// Definimos la ruta para manejar las solicitudes DELETE en la raíz de este enrutador.
// Esta ruta llama a la función 'eliminarAdministrador' del controlador para eliminar un administrador.
router.delete("/", eliminarAdministrador);

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
