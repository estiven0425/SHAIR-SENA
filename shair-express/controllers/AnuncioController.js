// Importamos el modelo de Anuncio, que representa la tabla de anuncios en la base de datos.
import Anuncio from "../models/Anuncio.js";

// Importamos el modelo de Administrador, para poder establecer relaciones con los anuncios.
import Administrador from "../models/Administrador.js";

// Función para leer todos los anuncios, incluyendo el nombre del administrador asociado.
export async function leerAnuncio(req, res) {
  try {
    // Usamos findAll para obtener todos los anuncios de la base de datos.
    // Incluimos la información del administrador relacionado, pero solo el atributo "nombre".
    const anuncio = await Anuncio.findAll({
      include: [
        {
          model: Administrador,
          attributes: ["nombre"],
        },
      ],
    });

    // Respondemos con los datos de los anuncios en formato JSON.
    res.json(anuncio);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 (error del servidor) y el mensaje de error.
    res.status(500).send("Error del servidor: ", error);
  }
}

// Función para crear un nuevo anuncio.
export async function crearAnuncio(req, res) {
  // Extraemos los datos enviados en el cuerpo de la solicitud.
  const {
    nombre,
    enunciado,
    archivo_adjunto,
    fecha_expiracion,
    mas_informacion,
    id_administrador,
  } = req.body;

  try {
    // Creamos un nuevo registro de anuncio en la base de datos con los datos proporcionados.
    const nuevoAnuncio = await Anuncio.create({
      nombre,
      enunciado,
      archivo_adjunto,
      fecha_expiracion,
      mas_informacion,
      id_administrador, // Relacionamos el anuncio con un administrador mediante su ID.
    });

    // Respondemos con el estado 201 (creado) y los datos del nuevo anuncio en formato JSON.
    res.status(201).json(nuevoAnuncio);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al crear el anuncio" });
  }
}

// Función para actualizar un anuncio existente.
export async function actualizarAnuncio(req, res) {
  // Extraemos los datos enviados en el cuerpo de la solicitud.
  const {
    id,
    nombre,
    enunciado,
    archivo_adjunto,
    fecha_expiracion,
    mas_informacion,
    id_administrador,
  } = req.body;

  try {
    // Buscamos el anuncio en la base de datos por su ID.
    const anuncio = await Anuncio.findByPk(id);

    if (anuncio) {
      // Si el anuncio existe, actualizamos sus datos.
      await anuncio.update({
        nombre,
        enunciado,
        archivo_adjunto,
        fecha_expiracion,
        mas_informacion,
        id_administrador, // Actualizamos la relación con el administrador si es necesario.
      });

      // Respondemos con los datos actualizados del anuncio en formato JSON.
      res.json(anuncio);
    } else {
      // Si no se encuentra el anuncio, respondemos con un estado 404 (no encontrado) y un mensaje de error.
      res.status(404).json({ error: "Anuncio no encontrado" });
    }
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al actualizar el anuncio" });
  }
}

// Función para eliminar un anuncio existente.
export async function eliminarAnuncio(req, res) {
  // Extraemos el ID del anuncio que se desea eliminar desde el cuerpo de la solicitud.
  const { id } = req.body;

  try {
    // Buscamos el anuncio en la base de datos por su ID.
    const anuncio = await Anuncio.findByPk(id);

    if (anuncio) {
      // Si el anuncio existe, lo eliminamos de la base de datos.
      await anuncio.destroy();

      // Respondemos con un mensaje indicando que el anuncio ha sido eliminado.
      res.json({ message: "Anuncio eliminado" });
    } else {
      // Si no se encuentra el anuncio, respondemos con un estado 404 (no encontrado) y un mensaje de error.
      res.status(404).json({ error: "Anuncio no encontrado" });
    }
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al eliminar el anuncio" });
  }
}
