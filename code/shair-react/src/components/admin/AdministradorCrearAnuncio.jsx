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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const tokenDecodificacion = jwtDecode(token);
    const tokenIdAdministrador = tokenDecodificacion.id;
    setIdAdministrador(tokenIdAdministrador);
  }, []);

  const subirImagen = (event) => {
    const archivo = event.target.files[0];
    setImagen(archivo);
  };

  const crearAnuncio = async (e) => {
    e.preventDefault();

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
        mas_informacion: masInformacion,
        id_administrador: idAdministrador,
      });

      setEnviado(true);
    } catch (error) {
      console.error("Error al crear el anuncio: ", error);
    }
  };

  const reiniciarFormulario = () => {
    setEnviado(false);
  };

  return (
    <>
      {enviado === true ? (
        <>
          <div id="alertaSuperadministradorCrearAdministrador">
            <h1>Anuncio creado con éxtio</h1>
            <p>Ve a la subsección de anuncios para ver, editar y eliminar los anuncios.</p>
            <button type="button" onClick={reiniciarFormulario}>
              Crear otro anuncio
            </button>
          </div>
        </>
      ) : (
        <form id="formularioSuperadministradorCrearAdministrador" onSubmit={crearAnuncio}>
          <section className="seccionFormularioSuperadministradorCrearAdministrador">
            <fieldset className="subSeccionFormularioSuperadministradorCrearAdministrador">
              <label htmlFor="nombre">Título*:</label>
              <input type="text" name="nombre" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioSuperadministradorCrearAdministrador">
              <label htmlFor="enunciado">Enunciado*:</label>
              <input type="text" name="enunciado" id="enunciado" value={enunciado} onChange={(e) => setEnunciado(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioSuperadministradorCrearAdministrador">
              <label htmlFor="fechaExpiracion">Fecha de expiración*:</label>
              <input type="date" name="fechaExpiracion" id="fechaExpiracion" value={fechaExpiracion} onChange={(e) => setFechaExpiracion(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioSuperadministradorCrearAdministrador">
              <label htmlFor="masInformacion">Más información:</label>
              <input type="text" name="masInformacion" id="masInformacion" value={masInformacion} onChange={(e) => setMasInformacion(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioRecomendacionPrincipal">
              <h2>Imagen adjunta:</h2>
              <label htmlFor="imagenAdjunta" className="subArchivoSeccionFormularioRecomendacionPrincipal">
                {imagen ? <img src={URL.createObjectURL(imagen)} alt="Previsualización" className="imagenSubArchivoSeccionFormularioRecomendacionPrincipal" /> : "+"}
              </label>
              <input type="file" name="imagenAdjunta" id="imagenAdjunta" onChange={subirImagen} />
            </fieldset>
          </section>
          <section className="seccionFormularioSuperadministradorCrearAdministrador seccionAlternativaFormularioSuperadministradorCrearAdministrador">
            <button type="submit" className="botonSeccionAlternativaFormularioSuperadministradorCrearAdministrador">
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
