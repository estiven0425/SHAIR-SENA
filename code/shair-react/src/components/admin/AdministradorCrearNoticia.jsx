// FORMULARIO DE NOTICIAS DEL ADMINISTRADOR
// ---------- Importaciones ----------
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import axios from "axios";
// ---------- Componente ----------
function AdministradorCrearNoticia() {
  // ---------- Estados ----------
  const fechaActual = new Date();
  const fechaFormateada = format(fechaActual, "yyyy-MM-dd");
  const [nombre, setNombre] = useState("");
  const [enunciado, setEnunciado] = useState("");
  const [lugar, setLugar] = useState("");
  const [fechaInicio, setFechaInicio] = useState(fechaFormateada);
  const [fechaFin, setFechaFin] = useState(fechaFormateada);
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
      errors.enunciado = "El campo de nombre no puede ser mayor a 1000 caracteres.";
    }
    if (!lugar) {
      errors.lugar = "El campo de lugar es obligatorio.";
    } else if (lugar.length > 250) {
      errors.lugar = "El campo de lugar no puede ser mayor a 250 caracteres.";
    }
    if (!fechaInicio) {
      errors.fechaInicio = "El campo de fecha de inicio es obligatorio.";
    }
    if (!fechaFin) {
      errors.fechaFin = "El campo de fecha de fin es obligatorio.";
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
  const crearNoticia = async (e) => {
    e.preventDefault();

    if (!validacion()) {
      return;
    }

    const datosFormulario = new FormData();

    datosFormulario.append("nombre", nombre);
    datosFormulario.append("enunciado", enunciado);
    datosFormulario.append("lugar", lugar);
    datosFormulario.append("fecha_inicio", fechaInicio);
    datosFormulario.append("fecha_fin", fechaFin);
    datosFormulario.append("mas_informacion", masInformacion);
    datosFormulario.append("id_administrador", idAdministrador);

    try {
      let rutaCargaNoticia = null;

      if (imagen) {
        datosFormulario.append("file", imagen);

        const cargaNoticia = await axios.post(`http://${localIP}:5000/cargaNoticia`, datosFormulario, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        rutaCargaNoticia = cargaNoticia.data.filePath;
      }

      await axios.post(`http://${localIP}:5000/noticia`, {
        nombre,
        enunciado,
        archivo_adjunto: rutaCargaNoticia === null ? "uploads/logo.png" : rutaCargaNoticia,
        lugar,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        mas_informacion: masInformacion === "" ? null : masInformacion,
        id_administrador: idAdministrador,
      });

      setEnviado(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setServidorError(error.response.data.error);
      } else {
        setServidorError("Error al crear la noticia. Por favor, inténtelo de nuevo.");
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
          <motion.div id="alertaAdministracionCrear" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <h1>Noticia creada con éxtio</h1>
            <p>Ve a la subsección de noticias para ver, editar y eliminar las noticias.</p>
            <button type="button" className="botonSeccionAlternativaFormularioAdministracionCrear" onClick={reiniciarFormulario}>
              Crear otra noticia
            </button>
          </motion.div>
        </>
      ) : (
        <form id="formularioAdministracionCrear" onSubmit={crearNoticia}>
          <motion.section className="seccionFormularioAdministracionCrear" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="nombre">Título*:</label>
              {validacionError.nombre && <span className="subSeccionFormularioAdministracionCrearError">{validacionError.nombre}</span>}
              <input type="text" name="nombre" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="enunciado">Enunciado*:</label>
              {validacionError.enunciado && <span className="subSeccionFormularioAdministracionCrearError">{validacionError.enunciado}</span>}
              <input type="text" name="enunciado" id="enunciado" value={enunciado} onChange={(e) => setEnunciado(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="lugar">Lugar*:</label>
              {validacionError.lugar && <span className="subSeccionFormularioAdministracionCrearError">{validacionError.lugar}</span>}
              <input type="text" name="lugar" id="lugar" value={lugar} onChange={(e) => setLugar(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="fechaInicio">Fecha de inicio*:</label>
              {validacionError.fechaInicio && <span className="subSeccionFormularioAdministracionCrearError">{validacionError.fechaInicio}</span>}
              <input type="date" name="fechaInicio" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="fechaFin">Fecha de finalización*:</label>
              {validacionError.fechaFin && <span className="subSeccionFormularioAdministracionCrearError">{validacionError.fechaFin}</span>}
              <input type="date" name="fechaFin" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="masInformacion">Más información:</label>
              <input type="text" name="masInformacion" id="masInformacion" value={masInformacion} onChange={(e) => setMasInformacion(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioRecomendacionPrincipal">
              <h2>Imagen adjunta:</h2>
              <label htmlFor="imagenAdjunta" className="subArchivoSeccionFormularioRecomendacionPrincipal">
                {validacionError.imagen && <span className="subSeccionFormularioAdministracionCrearError subSeccionFormularioAdministracionCrearErrorAlternativa2 ">{validacionError.imagen}</span>}
                {imagen ? <img src={URL.createObjectURL(imagen)} alt="Previsualización" className="imagenSubArchivoSeccionFormularioRecomendacionPrincipal" /> : "+"}
              </label>
              <input type="file" name="imagenAdjunta" id="imagenAdjunta" accept="image/*" onChange={subirImagen} />
            </fieldset>
          </motion.section>

          {servidorError && <span className="subSeccionFormularioAdministracionCrearError">{servidorError}</span>}

          <motion.section className="seccionFormularioAdministracionCrear seccionAlternativaFormularioAdministracionCrear" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <button type="submit" className="botonSeccionAlternativaFormularioAdministracionCrear">
              Crear noticia
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
export default AdministradorCrearNoticia;
