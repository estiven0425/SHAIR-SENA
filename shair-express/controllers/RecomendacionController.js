// Importamos el modelo de Recomendacion, que representa la tabla de recomendaciones en la base de datos.
import Recomendacion from "../models/Recomendacion.js";

// Función para leer todas las recomendaciones.
export async function leerRecomendacion(req, res) {
  try {
    // Usamos findAll para obtener todas las recomendaciones de la base de datos.
    const recomendacion = await Recomendacion.findAll();

    // Respondemos con los datos de las recomendaciones en formato JSON.
    res.json(recomendacion);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 (error del servidor) y el mensaje de error.
    res.status(500).send("Error del servidor: ", error);
  }
}

// Función para crear una nueva recomendación.
export async function crearRecomendacion(req, res) {
  // Extraemos los datos enviados en el cuerpo de la solicitud.
  const { titulo, recomendacion, archivo_adjunto, aprobacion } = req.body;

  try {
    // Creamos un nuevo registro de recomendación en la base de datos con los datos proporcionados.
    const nuevaRecomendacion = await Recomendacion.create({
      nombre: titulo, // Asignamos el título al campo 'nombre'.
      enunciado: recomendacion, // Asignamos el enunciado al campo 'enunciado'.
      archivo_adjunto, // Asignamos el archivo adjunto si existe.
      aprobacion: aprobacion, // Asignamos la aprobación al campo 'aprobacion'.
    });

    // Respondemos con el estado 201 (creado) y los datos de la nueva recomendación en formato JSON.
    res.status(201).json(nuevaRecomendacion);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al crear la recomendación" });
  }
}

// Función para actualizar una recomendación existente.
export async function actualizarRecomendacion(req, res) {
  // Extraemos los datos enviados en el cuerpo de la solicitud.
  const { id, titulo, recomendacion, archivo_adjunto, aprobacion } = req.body;

  try {
    // Buscamos la recomendación en la base de datos por su ID.
    const actualizarRecomendacion = await Recomendacion.findByPk(id);

    if (actualizarRecomendacion) {
      // Si la recomendación existe, actualizamos sus datos.
      await actualizarRecomendacion.update({
        nombre: titulo, // Actualizamos el título en el campo 'nombre'.
        enunciado: recomendacion, // Actualizamos el enunciado en el campo 'enunciado'.
        archivo_adjunto, // Actualizamos el archivo adjunto si existe.
        aprobacion: aprobacion, // Actualizamos la aprobación en el campo 'aprobacion'.
      });

      // Respondemos con los datos actualizados de la recomendación en formato JSON.
      res.json(actualizarRecomendacion);
    } else {
      // Si no se encuentra la recomendación, respondemos con un estado 404 (no encontrado) y un mensaje de error.
      res.status(404).json({ error: "Recomendación no encontrada" });
    }
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al actualizar la recomendación" });
  }
}

// Función para eliminar una recomendación existente.
export async function eliminarRecomendacion(req, res) {
  // Extraemos el ID de la recomendación que se desea eliminar desde el cuerpo de la solicitud.
  const { id } = req.body;

  try {
    // Buscamos la recomendación en la base de datos por su ID.
    const recomendacion = await Recomendacion.findByPk(id);

    if (recomendacion) {
      // Si la recomendación existe, la eliminamos de la base de datos.
      await recomendacion.destroy();

      // Respondemos con un mensaje indicando que la recomendación ha sido eliminada.
      res.json({ message: "Recomendación eliminada" });
    } else {
      // Si no se encuentra la recomendación, respondemos con un estado 404 (no encontrado) y un mensaje de error.
      res.status(404).json({ error: "Recomendación no encontrada" });
    }
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error en formato JSON.
    res.status(500).json({ error: "Error al eliminar la recomendación" });
  }
}
