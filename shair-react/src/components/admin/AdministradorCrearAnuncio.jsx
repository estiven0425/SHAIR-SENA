// FORMULARIO DE ANUNCIOS DEL ADMINISTRADOR
// ---------- Importaciones ----------
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import axios from "axios";
// ---------- Componente ----------
function AdministradorCrearAnuncio() {
  // ---------- Estados ----------
  const fechaActual = new Date();
  const fechaFormateada = format(fechaActual, "yyyy-MM-dd");

  const [nombre, setNombre] = useState("");
  const [enunciado, setEnunciado] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState(fechaFormateada);
  const [masInformacion, setMasInformacion] = useState("");
  const [idAdministrador, setIdAdministrador] = useState("");
  const [imagen, setImagen] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [validacionError, setValidacionError] = useState({});
  const [servidorError, setServidorError] = useState(null);

  const localIP = process.env.REACT_APP_LOCAL_IP;
  // ---------- Validaciones de seguridad ----------
  const validacion = () => {
    const errors = {};

    if (!nombre) {
      errors.nombre = "El campo de nombre es obligatorio.";
    } else if (nombre.length > 250) {
      errors.nombre = "El campo de nombre no puede ser mayor a 250 caracteres.";
    }

    if (!enunciado) {
      errors.enunciado = "El campo de enunciado es obligatorio.";
    } else if (enunciado.length > 1000) {
      errors.enunciado =
        "El campo de enunciado no puede ser mayor a 1000 caracteres.";
    }

    if (!fechaExpiracion) {
      errors.fechaExpiracion = "El campo de fecha de expiración.";
    }

    setValidacionError(errors);

    return Object.keys(errors).length === 0;
  };
  // ---------- Obtención de información de inicio de sesión ----------
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const tokenDecodificacion = jwtDecode(token);
    const tokenIdAdministrador = tokenDecodificacion.id;

    setIdAdministrador(tokenIdAdministrador);
  }, []);
  // ---------- Carga de imagen ----------
  const subirImagen = (event) => {
    const archivo = event.target.files[0];

    if (archivo && !archivo.type.startsWith("image/")) {
      setValidacionError((prevErrors) => ({
        ...prevErrors,
        imagen: "Solo se permiten archivos de imagen.",
      }));

      setImagen(null);
    } else {
      setValidacionError((prevErrors) => {
        const { imagen, ...rest } = prevErrors;

        return rest;
      });
      setImagen(archivo);
    }
  };
  // ---------- Envio de formulario ----------
  const crearAnuncio = async (e) => {
    e.preventDefault();

    if (!validacion()) {
      return;
    }

    const datosFormulario = new FormData();

    datosFormulario.append("nombre", nombre);
    datosFormulario.append("enunciado", enunciado);
    datosFormulario.append("fecha_fin", fechaExpiracion);
    datosFormulario.append("mas_informacion", masInformacion);
    datosFormulario.append("id_administrador", idAdministrador);

    try {
      let rutaCargaAnuncio = null;

      if (imagen) {
        datosFormulario.append("file", imagen);

        const cargaAnuncio = await axios.post(
          `http://${localIP}:5000/cargaAnuncio`,
          datosFormulario,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        rutaCargaAnuncio = cargaAnuncio.data.filePath;
      }

      await axios.post(`http://${localIP}:5000/anuncio`, {
        nombre,
        enunciado,
        archivo_adjunto:
          rutaCargaAnuncio === null ? "uploads/logo.png" : rutaCargaAnuncio,
        fecha_expiracion: fechaExpiracion,
        mas_informacion: masInformacion === "" ? null : masInformacion,
        id_administrador: idAdministrador,
      });

      setEnviado(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setServidorError(error.response.data.error);
      } else {
        setServidorError(
          "Error al crear el anuncio. Por favor, inténtelo de nuevo."
        );
      }
    }
  };
  // ---------- Reinicio de formulario ----------
  const reiniciarFormulario = () => {
    setEnviado(false);
  };
  // ---------- Respuesta del proceso ----------
  return (
    <>
      {enviado === true ? (
        <>
          <div id="alertaAdministracionCrear">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              Anuncio creado con éxtio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              Ve a la subsección de anuncios para ver, editar y eliminar los
              anuncios.
            </motion.p>
            <motion.button
              type="button"
              className="botonSeccionAlternativaFormularioAdministracionCrear"
              onClick={reiniciarFormulario}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              Crear otro anuncio
            </motion.button>
          </div>
        </>
      ) : (
        <form id="formularioAdministracionCrear" onSubmit={crearAnuncio}>
          <motion.section
            className="seccionFormularioAdministracionCrear"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="nombre">Título*:</label>
              {validacionError.nombre && (
                <span className="subSeccionFormularioAdministracionCrearError">
                  {validacionError.nombre}
                </span>
              )}
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="enunciado">Enunciado*:</label>
              {validacionError.enunciado && (
                <span className="subSeccionFormularioAdministracionCrearError">
                  {validacionError.enunciado}
                </span>
              )}
              <input
                type="text"
                name="enunciado"
                id="enunciado"
                value={enunciado}
                onChange={(e) => setEnunciado(e.target.value)}
              />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="fechaExpiracion">Fecha de expiración*:</label>
              {validacionError.fechaExpiracion && (
                <span className="subSeccionFormularioAdministracionCrearError">
                  {validacionError.fechaExpiracion}
                </span>
              )}
              <input
                type="date"
                name="fechaExpiracion"
                id="fechaExpiracion"
                value={fechaExpiracion}
                onChange={(e) => setFechaExpiracion(e.target.value)}
              />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="masInformacion">Más información:</label>
              <input
                type="text"
                name="masInformacion"
                id="masInformacion"
                value={masInformacion}
                onChange={(e) => setMasInformacion(e.target.value)}
              />
            </fieldset>
            <fieldset className="subSeccionFormularioRecomendacionPrincipal">
              <h2>Imagen adjunta:</h2>
              <label
                htmlFor="imagenAdjunta"
                className="subArchivoSeccionFormularioRecomendacionPrincipal"
              >
                {imagen ? (
                  <img
                    src={URL.createObjectURL(imagen)}
                    alt="Previsualización"
                    className="imagenSubArchivoSeccionFormularioRecomendacionPrincipal"
                  />
                ) : (
                  "+"
                )}
              </label>
              {validacionError.imagen && (
                <span className="subSeccionFormularioAdministracionCrearError subSeccionFormularioAdministracionCrearErrorAlternativa">
                  {validacionError.imagen}
                </span>
              )}
              <input
                type="file"
                name="imagenAdjunta"
                id="imagenAdjunta"
                accept="image/*"
                onChange={subirImagen}
              />
            </fieldset>
          </motion.section>

          {servidorError && (
            <span className="subSeccionFormularioAdministracionCrearError">
              {servidorError}
            </span>
          )}

          <motion.section
            className="seccionFormularioAdministracionCrear seccionAlternativaFormularioAdministracionCrear"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="submit"
              className="botonSeccionAlternativaFormularioAdministracionCrear"
            >
              Crear anuncio
            </button>
            <p>
              Los campos con <span>*</span> son obligatorios.
            </p>
          </motion.section>
        </form>
      )}
    </>
  );
}
// ---------- Exportación del componente ----------
export default AdministradorCrearAnuncio;
