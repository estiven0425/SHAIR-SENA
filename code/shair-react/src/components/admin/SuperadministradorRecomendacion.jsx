// RECOMENDACIONES DEL SUPERADMINISTRADOR
// ---------- Importaciones ----------
import React, { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AdministracionContexto from "../../contexts/AdministracionContexto";
// ---------- Componente ----------
function SuperadministradorRecomendacion() {
  // ---------- Estados, contextos y referencias ----------
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [editarSeleccionRecomendacion, setEditarSeleccionRecomendacion] = useState([]);
  const [seleccionRecomendacion, setSeleccionRecomendacion] = useState(null);
  const seleccionadoRecomendacion = useRef(null);
  const administracion = useContext(AdministracionContexto);
  const subSeccion = administracion.subSeccion;
  const localIP = process.env.REACT_APP_LOCAL_IP;
  // ---------- Obtención de recomendaciones ----------
  useEffect(() => {
    const leerRecomendacion = async () => {
      try {
        const respuesta = await axios.get(`http://${localIP}:5000/recomendacion`);
        setRecomendaciones(respuesta.data);
      } catch (error) {
        console.error("Error al obtener anuncios: ", error);
      }
    };

    leerRecomendacion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ---------- Deselección de recomendaciones ----------
  useEffect(() => {
    const deseleccionarRecomendacion = (event) => {
      if (seleccionadoRecomendacion.current && !seleccionadoRecomendacion.current.contains(event.target)) {
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
  // ---------- Actualizar recomendaciones ----------
  const actualizarAnuncio = async (id, estado) => {
    const recomendacionIndex = recomendaciones.findIndex((recomendacion) => recomendacion.id === id);
    const recomendacion = recomendaciones[recomendacionIndex];

    try {
      await axios.put(`http://${localIP}:5000/recomendacion`, {
        id: id,
        nombre: recomendacion.nombre,
        enunciado: recomendacion.enunciado,
        archivo_adjunto: recomendacion.archivo_adjunto,
        aprobacion: estado,
      });

      setRecomendaciones((prevState) => prevState.map((rec) => (rec.id === id ? { ...rec, aprobacion: true } : rec)));
    } catch (error) {
      console.error("Error al actualizar la recomendación:", error);
    }
  };
  // ---------- Eliminar recomendaciones ----------
  const eliminarRecomendacion = async (id) => {
    try {
      await axios.delete(`http://${localIP}:5000/recomendacion`, {
        data: { id: id },
      });

      setRecomendaciones((prevState) => prevState.filter((anuncio) => anuncio.id !== id));
    } catch (error) {
      console.error("Error al eliminar la recomendación:", error);
    }
  };
  // ---------- Respuesta del proceso ----------
  return (
    <>
      {subSeccion === 8 ? (
        recomendaciones.length > 0 ? (
            recomendaciones.map((recomendacion) => (
              <div key={recomendacion.id} className={seleccionRecomendacion === recomendacion.id ? "AdministracionAlternativaContenidoSeleccionado" : "AdministracionAlternativaContenido"} onClick={() => seleccionarRecomendacion(recomendacion.id)} ref={seleccionRecomendacion === recomendacion.id ? seleccionadoRecomendacion : null}>
                <h2>{recomendacion.nombre}</h2>
                <article className="articuloAdministracionAlternativaContenido">
                  <div className="articuloAdministracionAlternativaContenido0">
                    <p>{recomendacion.enunciado}</p>
                  </div>
                  <div className="articuloAdministracionAlternativaContenido1">
                    <div className="imagenArticuloAdministracionAlternativaContenido">
                      <img src={`http://${localIP}:5000/${recomendacion.archivo_adjunto}`} alt="Imagen no disponible" />
                    </div>
                  </div>
                </article>
                {seleccionRecomendacion === recomendacion.id &&
                  (!editarSeleccionRecomendacion.includes(recomendacion.id) ? (
                    <motion.div className="pieAdministracionAlternativaContenidoSeleccionado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                      {recomendacion.aprobacion ? (
                        <>
                          <motion.button type="button" onClick={() => actualizarAnuncio(recomendacion.id, false)} className="botonPieAdministracionAlternativaContenidoSeleccionado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                            Desaprobar
                          </motion.button>
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                            Recomendación aprobada
                          </motion.p>
                        </>
                      ) : (
                        <>
                          <motion.button type="button" onClick={() => actualizarAnuncio(recomendacion.id, true)} className="botonPieAdministracionAlternativaContenidoSeleccionado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                            Aprobar
                          </motion.button>
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                            Recomendación desaprobada
                          </motion.p>
                        </>
                      )}
                      <motion.button type="button" onClick={() => eliminarRecomendacion(recomendacion.id)} className="botonPieAdministracionAlternativaContenidoSeleccionado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                        Eliminar
                      </motion.button>
                    </motion.div>
                  ) : (
                    <></>
                  ))}
              </div>
            ))) : (
                  <motion.div className="AdministracionAlternativaContenidoSeleccionadoAlternativo">
                      <motion.h1 className="tituloAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                          Parece que aún no se han enviado recomendaciones o se trata de un error.
                      </motion.h1>
                      <motion.p className="parrafoAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                          Puedes recargar la página si crees que se trata de un error.
                      </motion.p>
                  </motion.div>
              )
      ) : (
        <>
          <motion.h1 className="tituloAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            Recomendaciones
          </motion.h1>
          <motion.p className="parrafoAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            Bienvenido a la sección de recomendaciones. <br />
            Aquí podrás ver las recomendaciones que hacen los aprendices y aprobarlas o eliminarlas.
            <br />A continuación, en la parte superior de la página encontraras el acceso a las recomendaciones.
          </motion.p>
        </>
      )}
    </>
  );
}
// ---------- Exportación del componente ----------
export default SuperadministradorRecomendacion;
