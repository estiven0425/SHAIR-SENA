import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";

function AdministradorCrearAnuncio() {
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
      errors.enunciado = "El campo de enunciado no puede ser mayor a 1000 caracteres.";
    }

    if (!fechaExpiracion) {
      errors.fechaExpiracion = "El campo de fecha de expiración.";
    }

    setValidacionError(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const tokenDecodificacion = jwtDecode(token);
    const tokenIdAdministrador = tokenDecodificacion.id;
    setIdAdministrador(tokenIdAdministrador);
  }, []);

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

        const cargaAnuncio = await axios.post("http://localhost:5000/cargaAnuncio", datosFormulario, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        rutaCargaAnuncio = cargaAnuncio.data.filePath;
      }

      await axios.post("http://localhost:5000/anuncio", {
        nombre,
        enunciado,
        archivo_adjunto: rutaCargaAnuncio,
        fecha_expiracion: fechaExpiracion,
        mas_informacion: masInformacion === "" ? null : masInformacion,
        id_administrador: idAdministrador,
      });

      setEnviado(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setServidorError(error.response.data.error);
      } else {
        setServidorError("Error al crear el anuncio. Por favor, inténtelo de nuevo.");
      }
    }
  };

  const reiniciarFormulario = () => {
    setEnviado(false);
  };

  return (
    <>
      {enviado === true ? (
        <>
          <div id="alertaAdministracionCrear">
            <h1>Anuncio creado con éxtio</h1>
            <p>Ve a la subsección de anuncios para ver, editar y eliminar los anuncios.</p>
            <button type="button" className="botonSeccionAlternativaFormularioAdministracionCrear" onClick={reiniciarFormulario}>
              Crear otro anuncio
            </button>
          </div>
        </>
      ) : (
        <form id="formularioAdministracionCrear" onSubmit={crearAnuncio}>
          <section className="seccionFormularioAdministracionCrear">
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
              <label htmlFor="fechaExpiracion">Fecha de expiración*:</label>
              {validacionError.fechaExpiracion && <span className="subSeccionFormularioAdministracionCrearError">{validacionError.fechaExpiracion}</span>}
              <input type="date" name="fechaExpiracion" id="fechaExpiracion" value={fechaExpiracion} onChange={(e) => setFechaExpiracion(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="masInformacion">Más información:</label>
              <input type="text" name="masInformacion" id="masInformacion" value={masInformacion} onChange={(e) => setMasInformacion(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioRecomendacionPrincipal">
              <h2>Imagen adjunta:</h2>
              <label htmlFor="imagenAdjunta" className="subArchivoSeccionFormularioRecomendacionPrincipal">
                {imagen ? <img src={URL.createObjectURL(imagen)} alt="Previsualización" className="imagenSubArchivoSeccionFormularioRecomendacionPrincipal" /> : "+"}
              </label>
              {validacionError.imagen && <span className="subSeccionFormularioAdministracionCrearError subSeccionFormularioAdministracionCrearErrorAlternativa">{validacionError.imagen}</span>}
              <input type="file" name="imagenAdjunta" id="imagenAdjunta" accept="image/*" onChange={subirImagen} />
            </fieldset>
          </section>

          {servidorError && <span className="subSeccionFormularioAdministracionCrearError">{servidorError}</span>}

          <section className="seccionFormularioAdministracionCrear seccionAlternativaFormularioAdministracionCrear">
            <button type="submit" className="botonSeccionAlternativaFormularioAdministracionCrear">
              Crear anuncio
            </button>
            <p>
              Los campos con <span>*</span> son obligatorios.
            </p>
          </section>
        </form>
      )}
    </>
  );
}

export default AdministradorCrearAnuncio;
