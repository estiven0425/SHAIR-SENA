// Importamos el módulo bcrypt para realizar operaciones de hashing (encriptación) de contraseñas.
const bcrypt = require("bcrypt");
const { sequelize } = require("../config/database.js");

// Importamos el modelo de Administrador, que representa la tabla de administradores en la base de datos.
const Administrador = require("../models/Administrador");

// Función para leer todos los registros de la tabla de administradores.
exports.leerAdministrador = async (req, res) => {
  try {
    // Usamos el método findAll para obtener todos los administradores de la base de datos.
    const administrador = await Administrador.findAll();

    // Respondemos con los datos de los administradores en formato JSON.
    res.json(administrador);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 (error del servidor) y el mensaje de error.
    res.status(500).send("Error del servidor: ", error);
  }
};

// Función para crear un nuevo administrador.
exports.crearAdministrador = async (req, res) => {
  // Extraemos los datos enviados en el cuerpo de la solicitud (nombre, email, celular, teléfono, y contraseña).
  const { nombre, email, celular, telefono, contraseña } = req.body;
  try {
    // Encriptamos la contraseña usando bcrypt antes de guardarla en la base de datos.
    const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);

    // Creamos un nuevo registro de administrador en la base de datos con los datos proporcionados.
    const nuevoAdministrador = await Administrador.create({
      nombre,
      email,
      celular,
      telefono,
      contraseña: contraseñaEncriptada, // Guardamos la contraseña encriptada.
    });

    // Respondemos con el estado 201 (creado) y los datos del nuevo administrador en formato JSON.
    res.status(201).json(nuevoAdministrador);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al crear el administrador" });
  }
};

// Función para actualizar un administrador existente.
exports.actualizarAdministrador = async (req, res) => {
  // Extraemos los datos enviados en el cuerpo de la solicitud.
  const { id_administrador, nombre, email, celular, telefono } = req.body;

  try {
    // Buscamos el administrador en la base de datos por su ID.
    const administrador = await Administrador.findByPk(id_administrador);

    if (administrador) {
      // Si el administrador existe, actualizamos sus datos.
      await administrador.update({
        nombre,
        email,
        celular,
        telefono,
      });

      // Respondemos con los datos actualizados del administrador en formato JSON.
      res.json(administrador);
    } else {
      // Si no se encuentra el administrador, respondemos con un estado 404 (no encontrado) y un mensaje de error.
      res.status(404).json({ error: "Administrador no encontrado" });
    }
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al actualizar el administrador" });
  }
};

// Función para eliminar un administrador existente.
exports.eliminarAdministrador = async (req, res) => {
  // Extraemos el ID del administrador que se desea eliminar desde el cuerpo de la solicitud.
  const { id_administrador } = req.body;

  try {
    // Buscamos el administrador en la base de datos por su ID.
    const administrador = await Administrador.findByPk(id_administrador);

    if (administrador) {
      // Si el administrador existe, lo eliminamos de la base de datos.
        await sequelize.query(`CALL eliminar_administrador(:id_administrador)`, {
            replacements: { id_administrador },
        });

      // Respondemos con un mensaje indicando que el administrador ha sido eliminado.
      res.json({ message: "Administrador eliminado" });
    } else {
      // Si no se encuentra el administrador, respondemos con un estado 404 (no encontrado) y un mensaje de error.
      res.status(404).json({ error: "Administrador no encontrado" });
    }
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al eliminar el administrador" });
  }
};
