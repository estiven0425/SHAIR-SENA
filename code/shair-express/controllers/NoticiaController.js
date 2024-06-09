const Noticia = require("../models/Noticia");
const Administrador = require("../models/Administrador");

exports.leerNoticia = async (req, res) => {
  try {
    const noticia = await Noticia.findAll({
      include: [
        {
          model: Administrador,
          attributes: ["nombre"],
        },
      ],
    });

    res.json(noticia);
  } catch (error) {
    res.status(500).send("Error del servidor: ", error);
  }
};

exports.crearNoticia = async (req, res) => {
  const { nombre, enunciado, archivo_adjunto, lugar, fecha_inicio, fecha_fin, mas_informacion, id_administrador } = req.body;

  try {
    const nuevaNoticia = await Noticia.create({
      nombre,
      enunciado,
      archivo_adjunto,
      lugar,
      fecha_inicio,
      fecha_fin,
      mas_informacion,
      id_administrador,
    });

    res.status(201).json(nuevaNoticia);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la noticia" });
  }
};

exports.actualizarNoticia = async (req, res) => {
  const { id, nombre, enunciado, archivo_adjunto, lugar, fecha_inicio, fecha_fin, mas_informacion, id_administrador } = req.body;

  try {
    noticia;
    const noticia = await Noticia.findByPk(id);

    if (noticia) {
      await noticia.update({
        nombre,
        enunciado,
        archivo_adjunto,
        lugar,
        fecha_inicio,
        fecha_fin,
        mas_informacion,
        id_administrador,
      });

      res.json(noticia);
    } else {
      res.status(404).json({ error: "Noticia no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la noticia" });
  }
};

exports.eliminarNoticia = async (req, res) => {
  const { id } = req.body;

  try {
    const noticia = await Noticia.findByPk(id);

    if (noticia) {
      await noticia.destroy();

      res.json({ message: "Noticia eliminada" });
    } else {
      res.status(404).json({ error: "Noticia no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la noticia" });
  }
};
