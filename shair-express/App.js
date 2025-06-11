// Importamos las dependencias necesarias
import express from "express"; // Framework para construir la API
import fileUpload from "express-fileupload"; // Middleware para manejar la subida de archivos
import { coneccionBD } from "./config/database.js"; // Función para conectar con la base de datos
import cors from "cors"; // Middleware para habilitar CORS
import { join, dirname } from "path"; // Módulo para manejar rutas de archivos
import { fileURLToPath } from "url"; // Módulo para manejar rutas de archivos

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); // Creamos una instancia de Express
const { json, static: expressStatic } = express;

// Importamos las rutas de los diferentes recursos
import administradorRuta from "./routes/AdministradorRoute.js"; // Rutas para Administrador
import anuncioRuta from "./routes/AnuncioRoute.js"; // Rutas para Anuncio
import noticiaRuta from "./routes/NoticiaRoute.js"; // Rutas para Noticia
import recomendacionRuta from "./routes/RecomendacionRoute.js"; // Rutas para Recomendación
import superadministradorRuta from "./routes/SuperadministradorRoute.js"; // Rutas para Superadministrador
import administradorLogin from "./secure/AdministradorLogin.js"; // Rutas para login de Administrador
import superadministradorLogin from "./secure/SuperadministradorLogin.js"; // Rutas para login de Superadministrador

// Conectamos a la base de datos
coneccionBD();

// Middleware para parsear JSON en las solicitudes
app.use(json());
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
app.use(expressStatic(join(__dirname, "public")));

// Ruta para cargar archivos relacionados con recomendaciones
app.post("/cargaRecomendacion", (req, res) => {
  // Verificamos si se han subido archivos
  if (!req.files || Object.keys(req.files).length == 0) {
    return res.status(400).send("No se han subido archivos.");
  }

  let archivo = req.files.file; // Obtenemos el archivo subido
  let rutaArchivo = join(__dirname, "public", "review", archivo.name); // Definimos la ruta de almacenamiento

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
  let rutaArchivo = join(__dirname, "public", "uploads", archivo.name); // Definimos la ruta de almacenamiento

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
  let rutaArchivo = join(__dirname, "public", "uploads", archivo.name); // Definimos la ruta de almacenamiento

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
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Servidor iniciado en el puerto: ${PORT}`)
);
