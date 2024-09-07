// Importamos las dependencias necesarias
const express = require("express"); // Framework para construir la API
const fileUpload = require("express-fileupload"); // Middleware para manejar la subida de archivos
const { coneccionBD } = require("./config/database"); // Función para conectar con la base de datos
const cors = require("cors"); // Middleware para habilitar CORS
const path = require("path"); // Módulo para manejar rutas de archivos
const app = express(); // Creamos una instancia de Express

// Importamos las rutas de los diferentes recursos
const administradorRuta = require("./routes/AdministradorRoute"); // Rutas para Administrador
const anuncioRuta = require("./routes/AnuncioRoute"); // Rutas para Anuncio
const noticiaRuta = require("./routes/NoticiaRoute"); // Rutas para Noticia
const recomendacionRuta = require("./routes/RecomendacionRoute"); // Rutas para Recomendación
const superadministradorRuta = require("./routes/SuperadministradorRoute"); // Rutas para Superadministrador
const administradorLogin = require("./secure/AdministradorLogin"); // Rutas para login de Administrador
const superadministradorLogin = require("./secure/SuperadministradorLogin"); // Rutas para login de Superadministrador

// Conectamos a la base de datos
coneccionBD();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());
// Middleware para manejar la subida de archivos
app.use(fileUpload());
// Middleware para habilitar CORS, permitiendo solicitudes desde otros dominios
app.use(cors());

// Configuramos las rutas para los diferentes recursos
app.use("/administrador", administradorRuta);
app.use("/anuncio", anuncioRuta);
app.use("/noticia", noticiaRuta);
app.use("/recomendacion", recomendacionRuta);
app.use("/superadministrador", superadministradorRuta);
app.use("/administradorlogin", administradorLogin);
app.use("/superadministradorlogin", superadministradorLogin);

// Configuramos la carpeta 'public' para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta para cargar archivos relacionados con recomendaciones
app.post("/cargaRecomendacion", (req, res) => {
  // Verificamos si se han subido archivos
  if (!req.files || Object.keys(req.files).length == 0) {
    return res.status(400).send("No se han subido archivos.");
  }

  let archivo = req.files.file; // Obtenemos el archivo subido
  let rutaArchivo = path.join(__dirname, "public", "review", archivo.name); // Definimos la ruta de almacenamiento

  // Movemos el archivo a la ruta especificada
  archivo.mv(rutaArchivo, (err) => {
    if (err) {
      return res.status(500).send(err); // En caso de error, respondemos con un estado 500
    }
    res.send({ filePath: `review/${archivo.name}` }); // Respondemos con la ruta del archivo subido
  });
});

// Ruta para cargar archivos relacionados con noticias
app.post("/cargaNoticia", (req, res) => {
  // Verificamos si se han subido archivos
  if (!req.files || Object.keys(req.files).length == 0) {
    return res.status(400).send("No se han subido archivos.");
  }

  let archivo = req.files.file; // Obtenemos el archivo subido
  let rutaArchivo = path.join(__dirname, "public", "uploads", archivo.name); // Definimos la ruta de almacenamiento

  // Movemos el archivo a la ruta especificada
  archivo.mv(rutaArchivo, (err) => {
    if (err) {
      return res.status(500).send(err); // En caso de error, respondemos con un estado 500
    }
    res.send({ filePath: `uploads/${archivo.name}` }); // Respondemos con la ruta del archivo subido
  });
});

// Ruta para cargar archivos relacionados con anuncios
app.post("/cargaAnuncio", (req, res) => {
  // Verificamos si se han subido archivos
  if (!req.files || Object.keys(req.files).length == 0) {
    return res.status(400).send("No se han subido archivos.");
  }

  let archivo = req.files.file; // Obtenemos el archivo subido
  let rutaArchivo = path.join(__dirname, "public", "uploads", archivo.name); // Definimos la ruta de almacenamiento

  // Movemos el archivo a la ruta especificada
  archivo.mv(rutaArchivo, (err) => {
    if (err) {
      return res.status(500).send(err); // En caso de error, respondemos con un estado 500
    }
    res.send({ filePath: `uploads/${archivo.name}` }); // Respondemos con la ruta del archivo subido
  });
});

// Definimos el puerto en el que escuchará la aplicación
const PORT = process.env.PORT || 5000;

// Iniciamos el servidor
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor iniciado en el puerto: ${PORT}`));
