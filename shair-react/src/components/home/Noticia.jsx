// NOTICIAS
// ---------- Importaciones ----------
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// ---------- Componente ----------
function Noticia() {
  // ---------- Estados ----------
  const [noticia, setNoticia] = useState([]);

  const localIP = process.env.REACT_APP_LOCAL_IP;
  // ---------- Obtención de noticias ----------
  useEffect(() => {
    const leerNoticia = async () => {
      try {
        const respuesta = await axios.get(`http://${localIP}:5000/noticia`);

        setNoticia(respuesta.data);
      } catch (error) {
        console.error("Error al obtener noticias: ", error);
      }
    };

    leerNoticia();
  }, []);
  // ---------- Validación de noticias ----------
  const noticiasFiltradas = noticia.filter((noticia) => {
    const fechaFin = new Date(noticia.fecha_fin);
    const fechaActual = new Date();

    return fechaFin >= fechaActual;
  });
  // ---------- Respuesta del proceso ----------
  return noticiasFiltradas.length > 0 ? (
    <>
      {noticiasFiltradas.map((noticia) => (
        <motion.div
          key={noticia.id}
          className="subContenedorNoticia"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <h2>{noticia.nombre}</h2>
          <article className="articuloSubContenedorNoticia">
            <div className="informacionArticuloSubContenedorNoticia">
              <div className="principalInformacionArticuloSubContenedorNoticia">
                <p>{noticia.enunciado}</p>
              </div>
              <div className="secundariaInformacionArticuloSubContenedorNoticia">
                <p>
                  <span>Lugar: </span>
                  {noticia.lugar}
                </p>
                <p>
                  <span>Desde: </span>
                  {new Date(noticia.fecha_inicio).toLocaleDateString()}
                </p>
                <p>
                  <span>Hasta: </span>
                  {new Date(noticia.fecha_fin).toLocaleDateString()}
                </p>
                <p>
                  <span>Organiza: </span>
                  {noticia.Administrador.nombre}
                </p>
                <p>
                  <span>Más información: </span>
                  {noticia.mas_informacion}
                </p>
              </div>
            </div>
            <div className="imagenArticuloSubContenedorNoticia">
              <img
                src={`http://${localIP}:5000/${noticia.archivo_adjunto}`}
                alt="Imagen no disponible"
              />
            </div>
          </article>
        </motion.div>
      ))}
    </>
  ) : (
    <motion.div className="AdministracionAlternativaContenidoSeleccionadoAlternativo">
      <motion.h1
        className="tituloAdministracionPrincipal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        Parece que aún no existen noticias o se trata de un error.
      </motion.h1>
      <motion.p
        className="parrafoAdministracionPrincipal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        Puedes ponerte en contacto con un administrador mediante una
        recomendación para notificar la novedad.
      </motion.p>
    </motion.div>
  );
}
// ---------- Exportación del proceso ----------
export default Noticia;
