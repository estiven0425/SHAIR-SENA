const bcrypt = require('bcrypt');
const Administrador = require('../models/Administrador');

exports.leerAdministrador = async (req, res) => {
    try {
        const administrador = await Administrador.findAll();

        res.json(administrador);
    } catch (error) {
        res.status(500).send('Error del servidor: ', error);
    }
};

exports.crearAdministrador = async (req, res) => {
    const { nombre, email, celular, telefono, contraseña } = req.body;
    try {
        const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);
        const nuevoAdministrador = await Administrador.create({
            nombre,
            email,
            celular,
            telefono,
            contraseña: contraseñaEncriptada
        });

        res.status(201).json(nuevoAdministrador);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el administrador' });
    }
};

exports.actualizarAdministrador = async (req, res) => {
    const { id_administrador, nombre, email, celular, telefono } = req.body;

    try {
        const administrador = await Administrador.findByPk(id_administrador);

        if (administrador) {
            await administrador.update({
                nombre,
                email,
                celular,
                telefono
            });

            res.json(administrador);
        } else {
            res.status(404).json({ error: 'Administrador no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el administrador' });
    }
};

exports.eliminarAdministrador = async (req, res) => {
    const { id_administrador } = req.body;

    try {
        const administrador = await Administrador.findByPk(id_administrador);

        if (administrador) {
            await administrador.destroy();

            res.json({ message: 'Administrador eliminado' });
        } else {
            res.status(404).json({ error: 'Administrador no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el administrador' });
    }
};