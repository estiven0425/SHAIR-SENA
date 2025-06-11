// Importamos las dependencias necesarias
import { Router } from "express"; // Framework para construir la API
import { compareSync } from "bcrypt"; // Librería para encriptar y comparar contraseñas
import jwt from "jsonwebtoken"; // Librería para manejar JSON Web Tokens
import { randomBytes } from "crypto"; // Módulo para generar claves secretas
import Superadministrador from "../models/Superadministrador.js"; // Modelo de Superadministrador

// Desectructuramos JWT
const { sign, verify } = jwt;

// Creamos una instancia del enrutador de Express
const router = Router();

// Función para generar una clave secreta aleatoria
const generarKeySecreto = () => {
  return randomBytes(32).toString("hex"); // Genera una clave secreta en formato hexadecimal
};

// Variable para almacenar la clave secreta
let keySecreto;

// Ruta para autenticar a un superadministrador y generar un token JWT
router.post("/", async (req, res) => {
  try {
    // Extraemos el email y la contraseña del cuerpo de la solicitud
    const { email, contraseña } = req.body;

    // Buscamos al superadministrador por el email proporcionado
    const superadministrador = await Superadministrador.findOne({
      where: { email },
    });

    // Verificamos si el superadministrador existe y si la contraseña es correcta
    if (
      superadministrador &&
      compareSync(contraseña, superadministrador.contraseña)
    ) {
      // Generamos una nueva clave secreta para el token
      keySecreto = generarKeySecreto();

      // Firmamos el token con el ID del superadministrador y la clave secreta
      const token = sign({ id: superadministrador.id }, keySecreto);

      // Enviamos el token como respuesta
      res.json({ token });
    } else {
      // Si las credenciales son inválidas, enviamos un error 401
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    // En caso de error del servidor, enviamos un error 500
    res.status(500).json({ error: "Error de servidor" });
  }
});

// Ruta para verificar el token y obtener información del superadministrador
router.post("/inicio", async (req, res) => {
  try {
    // Extraemos el token del cuerpo de la solicitud
    const { token } = req.body;

    // Verificamos si la clave secreta ha sido generada
    if (!keySecreto) {
      return res
        .status(401)
        .json({ error: "No se ha generado la clave secreta" });
    }

    // Verificamos y decodificamos el token usando la clave secreta
    const decodificacion = verify(token, keySecreto);

    // Buscamos al superadministrador por el ID decodificado del token
    const superadministrador = await Superadministrador.findByPk(
      decodificacion.id
    );

    // Si el superadministrador existe, enviamos su nombre como respuesta
    if (superadministrador) {
      res.json({ nombre: superadministrador.nombre });
    } else {
      // Si el superadministrador no se encuentra, enviamos un error 404
      res.status(404).json({ error: "Superadministrador no encontrado" });
    }
  } catch (error) {
    // En caso de error del servidor, enviamos un error 500
    res.status(500).json({ error: "Error de servidor" });
  }
});

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación
export default router;
