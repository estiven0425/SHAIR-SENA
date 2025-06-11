// Importamos Express para crear el enrutador.
import { Router } from "express";

// Creamos una nueva instancia del enrutador de Express.
const router = Router();

// Importamos el controlador de superadministradores que contiene las funciones para manejar las solicitudes HTTP.
import {
  leerSuperadministrador,
  crearSuperadministrador,
  actualizarSuperadministrador,
  eliminarSuperadministrador,
} from "../controllers/SuperadministradorController.js";

// Definimos la ruta para manejar las solicitudes GET en la raíz de este enrutador.
// Esta ruta llama a la función 'leerSuperadministrador' del controlador para obtener una lista de superadministradores.
router.get("/", leerSuperadministrador);

// Definimos la ruta para manejar las solicitudes POST en la raíz de este enrutador.
// Esta ruta llama a la función 'crearSuperadministrador' del controlador para crear un nuevo superadministrador.
router.post("/", crearSuperadministrador);

// Definimos la ruta para manejar las solicitudes PUT en la raíz de este enrutador.
// Esta ruta llama a la función 'actualizarSuperadministrador' del controlador para actualizar un superadministrador existente.
router.put("/", actualizarSuperadministrador);

// Definimos la ruta para manejar las solicitudes DELETE en la raíz de este enrutador.
// Esta ruta llama a la función 'eliminarSuperadministrador' del controlador para eliminar un superadministrador.
router.delete("/", eliminarSuperadministrador);

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
