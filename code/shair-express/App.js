const express = require("express");
const fileUpload = require("express-fileupload");
const { coneccionBD } = require("./config/database");
const cors = require("cors");
const path = require("path");
const app = express();
const administradorRuta = require("./routes/AdministradorRoute");
const anuncioRuta = require("./routes/AnuncioRoute");
const noticiaRuta = require("./routes/NoticiaRoute");
const recomendacionRuta = require("./routes/RecomendacionRoute");
const superadministradorRuta = require("./routes/SuperadministradorRoute");
const administradorLogin = require("./secure/AdministradorLogin");
const superadministradorLogin = require("./secure/SuperadministradorLogin");

coneccionBD();

app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use("/administrador", administradorRuta);
app.use("/anuncio", anuncioRuta);
app.use("/noticia", noticiaRuta);
app.use("/recomendacion", recomendacionRuta);
app.use("/superadministrador", superadministradorRuta);
app.use("/administradorlogin", administradorLogin);
app.use("/superadministradorlogin", superadministradorLogin);
app.use(express.static(path.join(__dirname, "public")));

app.post("/cargaRecomendacion", (req, res) => {
  if (!req.files || Object.keys(req.files).length == 0) {
    return res.status(400).send("No se han subido archivos.");
  }

  let archivo = req.files.file;
  let rutaArchivo = path.join(__dirname, "public", "review", archivo.name);

  archivo.mv(rutaArchivo, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ filePath: `review/${archivo.name}` });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto: ${PORT}`));
