const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Superadministrador = require("../models/Superadministrador");
const router = express.Router();
const generarKeySecreto = () => {
  return crypto.randomBytes(32).toString("hex");
};

let keySecreto;

router.post("/", async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const superadministrador = await Superadministrador.findOne({ where: { email } });

    if (superadministrador && contraseña === superadministrador.contraseña) {
      keySecreto = generarKeySecreto();
      const token = jwt.sign({ id: superadministrador.id }, keySecreto);

      res.json({ token });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    /* console.error("Error al iniciar sesión:", error); */

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
    const superadministrador = await Superadministrador.findByPk(decodificacion.id);

    if (superadministrador) {
      res.json({ nombre: superadministrador.nombre });
    } else {
      res.status(404).json({ error: "Superadministrador no encontrado" });
    }
  } catch (error) {
    /* console.error("Error al obtener el superadministrador:", error); */
    res.status(500).json({ error: "Error de servidor" });
  }
});

module.exports = router;
