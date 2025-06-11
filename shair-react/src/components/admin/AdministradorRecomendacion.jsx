// RECOMENDACIONES DEL ADMINISTRADOR
// ---------- Importaciones ----------
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AdministracionContexto from "../../contexts/AdministracionContexto";
// ---------- Componente ----------
function AdministradorRecomendacion() {
  // ---------- Estados, contextos y referencias ----------
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [editarSeleccionRecomendacion, setEditarSeleccionRecomendacion] =
    useState([]);
  const [seleccionRecomendacion, setSeleccionRecomendacion] = useState(null);

  const seleccionadoRecomendacion = useRef(null);

  const administracion = useContext(AdministracionContexto);
  const subSeccion = administracion.subSeccion;

  const localIP = process.env.REACT_APP_LOCAL_IP;
  // ---------- Obtención de recomendaciones ----------
  useEffect(() => {
    const leerRecomendacion = async () => {
      try {
        const respuesta = await axios.get(
          `http://${localIP}:5000/recomendacion`
        );
        const recomendacionesTotales = respuesta.data;
        const recomendacionesFiltradas = recomendacionesTotales.filter(
          (recomendacion) => recomendacion.aprobacion === 1
        );

        setRecomendaciones(recomendacionesFiltradas);
      } catch (error) {
        console.error("Error al obtener anuncios: ", error);
      }
    };

    leerRecomendacion();
  }, []);
  // ---------- Deselección de recomendaciones ----------
  useEffect(() => {
    const deseleccionarRecomendacion = (event) => {
      if (
        seleccionadoRecomendacion.current &&
        !seleccionadoRecomendacion.current.contains(event.target)
      ) {
        setSeleccionRecomendacion(null);
        setEditarSeleccionRecomendacion([]);
      }
    };

    document.addEventListener("mousedown", deseleccionarRecomendacion);

    return () => {
      document.removeEventListener("mousedown", deseleccionarRecomendacion);
    };
  }, [seleccionadoRecomendacion]);
  // ---------- Selección de recomendaciones ----------
  const seleccionarRecomendacion = (id) => {
    setSeleccionRecomendacion(id);
  };
  // ---------- Eliminar recomendaciones ----------
  const eliminarRecomendacion = async (id) => {
    try {
      await axios.delete(`http://${localIP}:5000/recomendacion`, {
        data: { id: id },
      });

      setRecomendaciones((prevState) =>
        prevState.filter((anuncio) => anuncio.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la recomendación:", error);
    }
  };
  // ---------- Validación de estado ----------
  let contenido;

  switch (subSeccion) {
    case 7:
      contenido =
        recomendaciones.length > 0 ? (
          <>
            {recomendaciones.map((recomendacion) => (
              <div
                key={recomendacion.id}
                className={
                  seleccionRecomendacion === recomendacion.id
                    ? "AdministracionAlternativaContenidoSeleccionado"
                    : "AdministracionAlternativaContenido"
                }
                onClick={() => seleccionarRecomendacion(recomendacion.id)}
                ref={
                  seleccionRecomendacion === recomendacion.id
                    ? seleccionadoRecomendacion
                    : null
                }
              >
                <h2>{recomendacion.nombre}</h2>
                <article className="articuloAdministracionAlternativaContenido">
                  <div className="articuloAdministracionAlternativaContenido0">
                    <p>{recomendacion.enunciado}</p>
                  </div>
                  <div className="articuloAdministracionAlternativaContenido1">
                    <div className="imagenArticuloAdministracionAlternativaContenido">
                      <img
                        src={`http://${localIP}:5000/${recomendacion.archivo_adjunto}`}
                        alt="Imagen no disponible"
                      />
                    </div>
                  </div>
                </article>
                {seleccionRecomendacion === recomendacion.id &&
                  (!editarSeleccionRecomendacion.includes(recomendacion.id) ? (
                    <motion.div
                      className="pieAdministracionAlternativaContenidoSeleccionado"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <button
                        type="button"
                        onClick={() => eliminarRecomendacion(recomendacion.id)}
                        className="botonPieAdministracionAlternativaContenidoSeleccionado"
                      >
                        Eliminar
                      </button>
                    </motion.div>
                  ) : (
                    <></>
                  ))}
              </div>
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
              Parece que aún no hay recomendaciones o se trata de un error.
            </motion.h1>
            <motion.p
              className="parrafoAdministracionPrincipal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              Puedes contactarte con el superadministrador para consultar si se
              trata de recomendaciones no aprobadas o un error.
            </motion.p>
          </motion.div>
        );
      break;
    default:
      contenido = (
        <>
          <motion.h1
            className="tituloAdministracionPrincipal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            Recomenadaciones
          </motion.h1>
          <motion.p
            className="parrafoAdministracionPrincipal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            Bienvenido a la sección de recomendaciones. <br />
            Aquí podrás ver las recomendaciones que hacen los aprendices.
            <br />A continuación, en la parte superior de la página encontraras
            el acceso a las recomendaciones.
          </motion.p>
        </>
      );
  }
  // ---------- Respuesta del proceso ----------
  return <>{contenido}</>;
}
// ---------- Exportación del componente ----------
export default AdministradorRecomendacion;
