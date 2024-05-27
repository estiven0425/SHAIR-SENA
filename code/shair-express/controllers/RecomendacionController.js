const Recomendacion = require('../models/Recomendacion');

exports.leerRecomendacion = async (req, res) => {
    try {
        const recomendacion = await Recomendacion.findAll();

        res.json(recomendacion);
    } catch (error) {
        res.status(500).send('Error del servidor: ', error);
    }
};

exports.crearRecomendacion = async (req, res) => {
    const { titulo, recomendacion, archivo_adjunto } = req.body;

    try {
        const nuevaRecomendacion = await Recomendacion.create({
            nombre: titulo,
            enunciado: recomendacion,
            archivo_adjunto
        });

        res.status(201).json(nuevaRecomendacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la recomendación' });
    }
};

exports.actualizarRecomendacion = async (req, res) => {
    const { id, titulo, recomendacion, archivo_adjunto } = req.body;

    try {
        const actualizarRecomendacion = await Recomendacion.findByPk(id);
        if (recomendacion) {
            await recomendacion.update({
                nombre: titulo,
                enunciado: recomendacion,
                archivo_adjunto
            });

            res.json(actualizarRecomendacion);
        } else {
            res.status(404).json({ error: 'Recomendación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la recomendación' });
    }
};

exports.eliminarRecomendacion = async (req, res) => {
    const { id } = req.body;

    try {
        const recomendacion = await Recomendacion.findByPk(id);

        if (recomendacion) {
            await recomendacion.destroy();

            res.json({ message: 'Recomendación eliminada' });
        } else {
            res.status(404).json({ error: 'Recomendación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la recomendación' });
    }
};
