// Importamos el modelo de Noticia, que representa la tabla de noticias en la base de datos.
import Noticia from "../models/Noticia.js";

// Importamos el modelo de Administrador para establecer relaciones con las noticias.
import Administrador from "../models/Administrador.js";

// Función para leer todas las noticias, incluyendo el nombre del administrador asociado.
export async function leerNoticia(req, res) {
  try {
    // Usamos findAll para obtener todas las noticias de la base de datos.
    // Incluimos la información del administrador relacionado, pero solo el atributo "nombre".
    const noticia = await Noticia.findAll({
      include: [
        {
          model: Administrador,
          attributes: ["nombre"],
        },
      ],
    });

    // Respondemos con los datos de las noticias en formato JSON.
    res.json(noticia);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 (error del servidor) y el mensaje de error.
    res.status(500).send("Error del servidor: ", error);
  }
}

// Función para crear una nueva noticia.
export async function crearNoticia(req, res) {
  // Extraemos los datos enviados en el cuerpo de la solicitud.
  const {
    nombre,
    enunciado,
    archivo_adjunto,
    lugar,
    fecha_inicio,
    fecha_fin,
    mas_informacion,
    id_administrador,
  } = req.body;

  try {
    // Creamos un nuevo registro de noticia en la base de datos con los datos proporcionados.
    const nuevaNoticia = await Noticia.create({
      nombre,
      enunciado,
      archivo_adjunto,
      lugar,
      fecha_inicio,
      fecha_fin,
      mas_informacion,
      id_administrador, // Relacionamos la noticia con un administrador mediante su ID.
    });

    // Respondemos con el estado 201 (creado) y los datos de la nueva noticia en formato JSON.
    res.status(201).json(nuevaNoticia);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al crear la noticia" });
  }
}

// Función para actualizar una noticia existente.
export async function actualizarNoticia(req, res) {
  // Extraemos los datos enviados en el cuerpo de la solicitud.
  const {
    id,
    nombre,
    enunciado,
    archivo_adjunto,
    lugar,
    fecha_inicio,
    fecha_fin,
    mas_informacion,
    id_administrador,
  } = req.body;

  try {
    // Buscamos la noticia en la base de datos por su ID.
    const noticia = await Noticia.findByPk(id);

    if (noticia) {
      // Si la noticia existe, actualizamos sus datos.
      await noticia.update({
        nombre,
        enunciado,
        archivo_adjunto,
        lugar,
        fecha_inicio,
        fecha_fin,
        mas_informacion,
        id_administrador, // Actualizamos la relación con el administrador si es necesario.
      });

      // Respondemos con los datos actualizados de la noticia en formato JSON.
      res.json(noticia);
    } else {
      // Si no se encuentra la noticia, respondemos con un estado 404 (no encontrado) y un mensaje de error.
      res.status(404).json({ error: "Noticia no encontrada" });
    }
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al actualizar la noticia" });
  }
}

// Función para eliminar una noticia existente.
export async function eliminarNoticia(req, res) {
  // Extraemos el ID de la noticia que se desea eliminar desde el cuerpo de la solicitud.
  const { id } = req.body;

  try {
    // Buscamos la noticia en la base de datos por su ID.
    const noticia = await Noticia.findByPk(id);

    if (noticia) {
      // Si la noticia existe, la eliminamos de la base de datos.
      await noticia.destroy();

      // Respondemos con un mensaje indicando que la noticia ha sido eliminada.
      res.json({ message: "Noticia eliminada" });
    } else {
      // Si no se encuentra la noticia, respondemos con un estado 404 (no encontrado) y un mensaje de error.
      res.status(404).json({ error: "Noticia no encontrada" });
    }
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al eliminar la noticia" });
  }
}
