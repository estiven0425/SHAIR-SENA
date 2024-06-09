const Anuncio = require("../models/Anuncio");

exports.leerAnuncio = async (req, res) => {
  try {
    const anuncio = await Anuncio.findAll();

    res.json(anuncio);
  } catch (error) {
    res.status(500).send("Error del servidor: ", error);
  }
};

exports.crearAnuncio = async (req, res) => {
  const { nombre, enunciado, archivo_adjunto, fecha_expiracion, mas_informacion, id_administrador } = req.body;

  try {
    const nuevoAnuncio = await Anuncio.create({
      nombre,
      enunciado,
      archivo_adjunto,
      fecha_expiracion,
      mas_informacion,
      id_administrador,
    });

    res.status(201).json(nuevoAnuncio);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el anuncio" });
  }
};

exports.actualizarAnuncio = async (req, res) => {
  const { id, nombre, enunciado, archivo_adjunto, fecha_expiracion, mas_informacion, id_administrador } = req.body;

  try {
    const anuncio = await Anuncio.findByPk(id);
    if (anuncio) {
      await anuncio.update({
        nombre,
        enunciado,
        archivo_adjunto,
        fecha_expiracion,
        mas_informacion,
        id_administrador,
      });

      res.json(anuncio);
    } else {
      res.status(404).json({ error: "Anuncio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el anuncio" });
  }
};

exports.eliminarAnuncio = async (req, res) => {
  const { id } = req.body;

  try {
    const anuncio = await Anuncio.findByPk(id);

    if (anuncio) {
      await anuncio.destroy();

      res.json({ message: "Anuncio eliminado" });
    } else {
      res.status(404).json({ error: "Anuncio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el anuncio" });
  }
};
