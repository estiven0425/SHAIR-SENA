import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";

function AdministradorCrearNoticia() {
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

  const crearNoticia = async (e) => {
    e.preventDefault();

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

        const cargaNoticia = await axios.post("http://localhost:5000/cargaNoticia", datosFormulario, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        rutaCargaNoticia = cargaNoticia.data.filePath;
      }

      await axios.post("http://localhost:5000/noticia", {
        nombre,
        enunciado,
        archivo_adjunto: rutaCargaNoticia,
        lugar,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        mas_informacion: masInformacion,
        id_administrador: idAdministrador,
      });

      setEnviado(true);
    } catch (error) {
      console.error("Error al crear la noticia: ", error);
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
            <h1>Noticia creada con éxtio</h1>
            <p>Ve a la subsección de noticias para ver, editar y eliminar las noticias.</p>
            <button type="button" onClick={reiniciarFormulario}>
              Crear otra noticia
            </button>
          </div>
        </>
      ) : (
        <form id="formularioAdministracionCrear" onSubmit={crearNoticia}>
          <section className="seccionFormularioAdministracionCrear">
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="nombre">Título*:</label>
              <input type="text" name="nombre" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="enunciado">Enunciado*:</label>
              <input type="text" name="enunciado" id="enunciado" value={enunciado} onChange={(e) => setEnunciado(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="lugar">Lugar*:</label>
              <input type="text" name="lugar" id="lugar" value={lugar} onChange={(e) => setLugar(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="fechaInicio">Fecha de inicio*:</label>
              <input type="date" name="fechaInicio" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="fechaFin">Fecha de finalización*:</label>
              <input type="date" name="fechaFin" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
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
              <input type="file" name="imagenAdjunta" id="imagenAdjunta" onChange={subirImagen} />
            </fieldset>
          </section>
          <section className="seccionFormularioAdministracionCrear seccionAlternativaFormularioAdministracionCrear">
            <button type="submit" className="botonSeccionAlternativaFormularioAdministracionCrear">
              Crear noticia
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

export default AdministradorCrearNoticia;
