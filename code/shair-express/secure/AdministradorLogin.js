const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Administrador = require('../models/Administrador');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const administrador = await Administrador.findOne({ where: { email } });

        if (administrador && bcrypt.compareSync(contraseña, administrador.contraseña)) {
            const keySecreto = crypto.randomBytes(32).toString('hex');
            const token = jwt.sign({ id: administrador.id_administrador }, keySecreto);

            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);

        res.status(500).json({ error: 'Error de servidor' });
    }
});

module.exports = router;