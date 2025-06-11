// FORMULARIO DE RECOMENDACIONES
// ---------- Importaciones ----------
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// ---------- Componente ----------
function FormularioRecomendacion() {
  // ---------- Estados ----------
  const [imagen, setImagen] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [recomendacion, setRecomendacion] = useState("");
  const [aprobacion, setAprobacion] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [validacionError, setValidacionError] = useState({});
  const [servidorError, setServidorError] = useState(null);

  const localIP = process.env.REACT_APP_LOCAL_IP;
  // ---------- Validaciones de seguridad ----------
  const validacion = () => {
    const errors = {};

    if (!titulo) {
      errors.titulo = "El campo de título es obligatorio es obligatorio.";
    } else if (titulo.length > 250) {
      errors.titulo = "El campo de título no puede ser mayor a 250 caracteres.";
    }

    if (!recomendacion) {
      errors.recomendacion = "El campo de recomendación es obligatorio.";
    } else if (recomendacion.length > 1000) {
      errors.titulo =
        "El campo de recomendacion no puede ser mayor a 1000 caracteres.";
    }

    setValidacionError(errors);

    return Object.keys(errors).length === 0;
  };
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
  // ---------- Envío de formulario ----------
  const enviarRecomendacion = async (event) => {
    event.preventDefault();

    if (!validacion()) {
      return;
    }

    const datosFormulario = new FormData();

    datosFormulario.append("titulo", titulo);
    datosFormulario.append("recomendacion", recomendacion);
    datosFormulario.append("aprbacion", aprobacion);

    try {
      let rutaCargaRecomendacion = null;

      if (imagen) {
        datosFormulario.append("file", imagen);

        const cargaRecomendacion = await axios.post(
          `http://${localIP}:5000/cargaRecomendacion`,
          datosFormulario,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        rutaCargaRecomendacion = cargaRecomendacion.data.filePath;
      }

      await axios.post(`http://${localIP}:5000/recomendacion`, {
        titulo,
        recomendacion,
        archivo_adjunto:
          rutaCargaRecomendacion === null
            ? "review/logo.png"
            : rutaCargaRecomendacion,
        aprobacion,
      });

      setEnviado(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setServidorError(error.response.data.error);
      } else {
        setServidorError(
          "Error al enviar recomendación. Por favor, inténtelo de nuevo."
        );
      }
    }
  };
  // ---------- Reinicio de formulario ----------
  const reiniciarFormulario = () => {
    setTitulo("");
    setRecomendacion("");
    setImagen(null);
    setEnviado(false);
  };
  // ---------- Respuesta del servidor ----------
  return (
    <>
      {enviado === true ? (
        <motion.div
          id="alertaRecomendacionPrincipal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <h1>Recomendación enviada con éxito</h1>
          <p>Vuelve a la página principal para continuar navegando</p>
          <button onClick={reiniciarFormulario} type="button">
            Crear otra recomendación
          </button>
        </motion.div>
      ) : (
        <form
          id="formularioRecomendacionPrincipal"
          onSubmit={enviarRecomendacion}
        >
          <motion.section
            className="seccionFormularioRecomendacionPrincipal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <fieldset className="subSeccionFormularioRecomendacionPrincipal">
              <label htmlFor="titulo">Título*:</label>
              {validacionError.titulo && (
                <span className="subSeccionFormularioRecomendacionPrincipalError">
                  {validacionError.titulo}
                </span>
              )}
              <input
                type="text"
                name="titulo"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </fieldset>
            <fieldset className="subSeccionFormularioRecomendacionPrincipal">
              <label htmlFor="recomendacion">Recomendación*:</label>
              {validacionError.recomendacion && (
                <span className="subSeccionFormularioRecomendacionPrincipalError">
                  {validacionError.recomendacion}
                </span>
              )}
              <input
                type="text"
                name="recomendacion"
                id="recomendacion"
                value={recomendacion}
                onChange={(e) => setRecomendacion(e.target.value)}
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
              <input
                type="file"
                name="imagenAdjunta"
                id="imagenAdjunta"
                accept="image/*"
                onChange={subirImagen}
              />
              {validacionError.imagen && (
                <span className="subSeccionFormularioRecomendacionPrincipalError subSeccionFormularioRecomendacionPrincipalErrorAlternativa">
                  {validacionError.imagen}
                </span>
              )}
            </fieldset>
          </motion.section>
          {servidorError && (
            <span className="subSeccionFormularioRecomendacionPrincipalError">
              {servidorError}
            </span>
          )}
          <motion.section
            className="seccionFormularioRecomendacionPrincipal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="submit"
              id="botonSeccionFormularioRecomendacionPrincipal"
            >
              Enviar recomendación
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
export default FormularioRecomendacion;
