import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function SuperadministradorAdministradorNoticia(props) {
  const [noticias, setNoticias] = useState([]);
  const [seleccionNoticia, setSeleccionNoticia] = useState(null);
  const [editarSeleccionNoticia, setEditarSeleccionNoticia] = useState([]);
  const [nombresNoticias, setNombresNoticias] = useState([]);
  const [enunciadosNoticias, setEnunciadosNoticias] = useState([]);
  const [imagenesNoticias, setImagenesNoticias] = useState([]);
  const [lugaresNoticias, setLugaresNoticias] = useState([]);
  const [fechasInicioNoticias, setFechasInicioNoticias] = useState([]);
  const [fechasFinNoticias, setFechasFinNoticias] = useState([]);
  const [administradoresNoticias, setAdministradoresNoticias] = useState([]);
  const [masInformacionesNoticias, setMasInformacionNoticias] = useState([]);
  const seleccionadaNoticia = useRef(null);

  useEffect(() => {
    const leerNoticia = async () => {
      try {
        const respuesta = await axios.get("http://localhost:5000/noticia");
        const noticiasTotales = respuesta.data;
        const noticiasFiltradas = noticiasTotales.filter((noticia) => noticia.id_administrador === props.id_administrador);

        setNoticias(noticiasFiltradas);

        const nombres = noticiasFiltradas.map((noticia) => noticia.nombre);
        const enunciados = noticiasFiltradas.map((noticia) => noticia.enunciado);
        const imagenes = noticiasFiltradas.map((noticia) => noticia.archivo_adjunto);
        const lugares = noticiasFiltradas.map((noticia) => noticia.lugar);
        const fechasInicio = noticiasFiltradas.map((noticia) => noticia.fecha_inicio);
        const fechasFin = noticiasFiltradas.map((noticia) => noticia.fecha_fin);
        const administradores = noticiasFiltradas.map((noticia) => noticia.Administrador.nombre);
        const masInformaciones = noticiasFiltradas.map((noticia) => noticia.mas_informacion);

        setNombresNoticias(nombres);
        setEnunciadosNoticias(enunciados);
        setImagenesNoticias(imagenes);
        setLugaresNoticias(lugares);
        setFechasInicioNoticias(fechasInicio);
        setFechasFinNoticias(fechasFin);
        setAdministradoresNoticias(administradores);
        setMasInformacionNoticias(masInformaciones);
      } catch (error) {
        console.error("Error al obtener noticias: ", error);
      }
    };

    leerNoticia();
  }, [seleccionadaNoticia]);
  useEffect(() => {
    const deseleccionarNoticia = (event) => {
      if (seleccionadaNoticia.current && !seleccionadaNoticia.current.contains(event.target)) {
        setSeleccionNoticia(null);
        setEditarSeleccionNoticia([]);
      }
    };

    document.addEventListener("mousedown", deseleccionarNoticia);

    return () => {
      document.removeEventListener("mousedown", deseleccionarNoticia);
    };
  }, [seleccionadaNoticia]);
  const seleccionarNoticia = (id) => {
    setSeleccionNoticia(id);
  };
  const eliminarNoticia = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/noticia`, {
        data: { id: id },
      });

      setNoticias((prevState) => prevState.filter((noticia) => noticia.id !== id));
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
    }
  };
  return (
    <>
      {noticias.length !== 0 ? (
        noticias.map((noticia, index) => (
          <div key={noticia.id} className={seleccionNoticia === noticia.id ? "AdministracionAlternativaContenido2Seleccionado" : "AdministracionAlternativa2Contenido"} onClick={() => seleccionarNoticia(noticia.id)} ref={seleccionNoticia === noticia.id ? seleccionadaNoticia : null}>
            <motion.article className="articuloAdministracionAlternativa2Contenido" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <div className="articuloAdministracionAlternativa2Contenido0">
                <h2 id="contenidoArticuloAdministracionAlternativa2Contenido">{nombresNoticias[index] || ""}</h2>
                <br />
                <p className="contenidoArticuloAdministracionAlternativa2Contenido">{enunciadosNoticias[index] || ""}</p>
                <h3>Lugar:</h3>
                <p className="contenidoArticuloAdministracionAlternativa2Contenido">{lugaresNoticias[index] || ""}</p>
                <h3>Desde:</h3>
                <p className="contenidoArticuloAdministracionAlternativa2Contenido">{fechasInicioNoticias[index] || ""}</p>
                <h3>Hasta:</h3>
                <p className="contenidoArticuloAdministracionAlternativa2Contenido">{fechasFinNoticias[index] || ""}</p>
                <h3>Organiza:</h3>
                <p className="contenidoArticuloAdministracionAlternativa2Contenido">{administradoresNoticias[index] || ""}</p>
                <h3>Más información:</h3>
                <p className="contenidoArticuloAdministracionAlternativa2Contenido">{masInformacionesNoticias[index] || ""}</p>
              </div>
              <div className="articuloAdministracionAlternativa2Contenido1">
                <div className="imagenArticuloAdministracionAlternativa2Contenido">
                  <img src={`http://localhost:5000/${noticia.archivo_adjunto}`} alt="Imagen no disponible" />
                </div>
              </div>
            </motion.article>
            {seleccionNoticia === noticia.id &&
              (!editarSeleccionNoticia.includes(noticia.id) ? (
                <motion.div className="pieAdministracionAlternativa2ContenidoSeleccionado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  <button type="button" onClick={() => eliminarNoticia(noticia.id)} className="botonPieAdministracionAlternativa2ContenidoSeleccionado">
                    Eliminar
                  </button>
                </motion.div>
              ) : (
                <motion.div className="pieAdministracionAlternativa2ContenidoSeleccionado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}></motion.div>
              ))}
          </div>
        ))
      ) : (
        <>
          <p>No se encontraron noticias</p>
        </>
      )}
    </>
  );
}

export default SuperadministradorAdministradorNoticia;
