// Importamos bcrypt para encriptar contraseñas y el modelo de Superadministrador, que representa la tabla de superadministradores en la base de datos.
import { hash } from "bcrypt";
import Superadministrador from "../models/Superadministrador.js";

// Función para leer todos los superadministradores.
export async function leerSuperadministrador(req, res) {
  try {
    // Usamos findAll para obtener todos los superadministradores de la base de datos.
    const superadministrador = await Superadministrador.findAll();

    // Respondemos con los datos de los superadministradores en formato JSON.
    res.json(superadministrador);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 (error del servidor) y el mensaje de error.
    res.status(500).send("Error del servidor: ", error);
  }
}

// Función para crear un nuevo superadministrador.
export async function crearSuperadministrador(req, res) {
  // Extraemos los datos enviados en el cuerpo de la solicitud.
  const { nombre, email, celular, telefono, contraseña, perfil_ocupacional } =
    req.body;

  try {
    // Encriptamos la contraseña usando bcrypt con un factor de costo de 10.
    const contraseñaEncriptada = await hash(contraseña, 10);

    // Creamos un nuevo registro de superadministrador en la base de datos con los datos proporcionados.
    const nuevoSuperadministrador = await Superadministrador.create({
      nombre,
      email,
      celular,
      telefono,
      contraseña: contraseñaEncriptada, // Guardamos la contraseña encriptada en la base de datos.
      perfil_ocupacional,
    });

    // Respondemos con el estado 201 (creado) y los datos del nuevo superadministrador en formato JSON.
    res.status(201).json(nuevoSuperadministrador);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al crear el superadministrador" });
  }
}

// Función para actualizar un superadministrador existente.
export async function actualizarSuperadministrador(req, res) {
  // Extraemos los datos enviados en el cuerpo de la solicitud.
  const {
    id,
    nombre,
    email,
    celular,
    telefono,
    contraseña,
    perfil_ocupacional,
  } = req.body;

  try {
    // Encriptamos la nueva contraseña proporcionada.
    const contraseñaEncriptada = await hash(contraseña, 10);

    // Buscamos el superadministrador en la base de datos por su ID.
    const superadministrador = await Superadministrador.findByPk(id);

    if (superadministrador) {
      // Si el superadministrador existe, actualizamos sus datos.
      await superadministrador.update({
        nombre,
        email,
        celular,
        telefono,
        contraseña: contraseñaEncriptada, // Actualizamos la contraseña encriptada en la base de datos.
        perfil_ocupacional,
      });

      // Respondemos con los datos actualizados del superadministrador en formato JSON.
      res.json(superadministrador);
    } else {
      // Si no se encuentra el superadministrador, respondemos con un estado 404 (no encontrado) y un mensaje de error.
      res.status(404).json({ error: "Superadministrador no encontrado" });
    }
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res
      .status(500)
      .json({ error: "Error al actualizar el superadministrador" });
  }
}

// Función para eliminar un superadministrador existente.
export async function eliminarSuperadministrador(req, res) {
  // Extraemos el ID del superadministrador que se desea eliminar desde el cuerpo de la solicitud.
  const { id } = req.body;

  try {
    // Buscamos el superadministrador en la base de datos por su ID.
    const superadministrador = await Superadministrador.findByPk(id);

    if (superadministrador) {
      // Si el superadministrador existe, lo eliminamos de la base de datos.
      await superadministrador.destroy();

      // Respondemos con un mensaje indicando que el superadministrador ha sido eliminado.
      res.json({ message: "Superadministrador eliminado" });
    } else {
      // Si no se encuentra el superadministrador, respondemos con un estado 404 (no encontrado) y un mensaje de error.
      res.status(404).json({ error: "Superadministrador no encontrado" });
    }
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al eliminar el superadministrador" });
  }
}
