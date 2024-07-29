const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Administrador = require("../models/Administrador");
const router = express.Router();
const generarKeySecreto = () => {
  return crypto.randomBytes(32).toString("hex");
};

let keySecreto;

router.post("/", async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const administrador = await Administrador.findOne({ where: { email } });

    if (administrador && bcrypt.compareSync(contraseña, administrador.contraseña)) {
      keySecreto = generarKeySecreto();
      const token = jwt.sign({ id: administrador.id_administrador }, keySecreto);

      res.json({ token });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error de servidor" });
  }
});

router.post("/inicio", async (req, res) => {
  try {
    const { token } = req.body;
    if (!keySecreto) {
      return res.status(401).json({ error: "No se ha generado la clave secreta" });
    }

    const decodificacion = jwt.verify(token, keySecreto);
    const administrador = await Administrador.findByPk(decodificacion.id);

    if (administrador) {
      res.json({ nombre: administrador.nombre });
    } else {
      res.status(404).json({ error: "Administrador no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error de servidor" });
  }
});

module.exports = router;
