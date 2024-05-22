const bcrypt = require('bcrypt');
const Superadministrador = require('../models/Superadministrador');

exports.leerSuperadministrador = async (req, res) => {
    try {
        const superadministrador = await Superadministrador.findAll();

        res.json(superadministrador);
    } catch (error) {
        res.status(500).send('Error del servidor: ', error);
    }
};

exports.crearSuperadministrador = async (req, res) => {
    const { nombre, email, celular, telefono, contraseña, perfil_ocupacional } = req.body;

    try {
        const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);
        const nuevoSuperadministrador = await Superadministrador.create({
            nombre,
            email,
            celular,
            telefono,
            contraseña: contraseñaEncriptada,
            perfil_ocupacional
        });

        res.status(201).json(nuevoSuperadministrador);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el superadministrador' });
    }
};

exports.actualizarSuperadministrador = async (req, res) => {
    const { id, nombre, email, celular, telefono, contraseña, perfil_ocupacional } = req.body;

    try {
        const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);
        const superadministrador = await Superadministrador.findByPk(id);

        if (superadministrador) {
            await superadministrador.update({
                nombre,
                email,
                celular,
                telefono,
                contraseña: contraseñaEncriptada,
                perfil_ocupacional
            });

            res.json(superadministrador);
        } else {
            res.status(404).json({ error: 'Superadministrador no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el superadministrador' });
    }
};

exports.eliminarSuperadministrador = async (req, res) => {
    const { id } = req.body;

    try {
        const superadministrador = await Superadministrador.findByPk(id);

        if (superadministrador) {
            await superadministrador.destroy();

            res.json({ message: 'Superadministrador eliminado' });
        } else {
            res.status(404).json({ error: 'Superadministrador no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el superadministrador' });
    }
};