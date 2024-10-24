// NOTICIAS DEL ADMINISTRADOR
// ---------- Importaciones ----------
import React, { useState, useEffect, useRef, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import axios from "axios";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import AdministradorCrearNoticia from "./AdministradorCrearNoticia";
// ---------- Componente ----------
function AdministradorNoticia() {
  // ---------- Estados, contextos y referencias ----------
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
  const [idAdministradoresNoticias, setIdAdministradoresNoticias] = useState([]);
  const [masInformacionesNoticias, setMasInformacionNoticias] = useState([]);
  const [editarSeleccionNoticiaInterruptor, setEditarSeleccionNoticiaInterruptor] = useState(false)
  const seleccionadaNoticia = useRef(null);
  const administracion = useContext(AdministracionContexto);
  const subSeccion = administracion.subSeccion;
  const localIP = process.env.REACT_APP_LOCAL_IP;
  // ---------- Obtención de información de inicios de sesión ----------
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const tokenDecodificacion = jwtDecode(token);
    const tokenIdAdministrador = tokenDecodificacion.id;
    setIdAdministradoresNoticias(tokenIdAdministrador);
  }, []);
  // ---------- Obtención de noticias ----------
  useEffect(() => {
    const leerNoticia = async () => {
      try {
        const respuesta = await axios.get(`http://${localIP}:5000/noticia`);
        const noticiasTotales = respuesta.data;
        const noticiasFiltradas = noticiasTotales.filter((noticia) => noticia.id_administrador === idAdministradoresNoticias);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subSeccion]);
  // ---------- Deselección de noticias ----------
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
  // ---------- Interruptor en deselección de noticia ----------
  useEffect(() => {
    setEditarSeleccionNoticiaInterruptor(false);
  }, [seleccionNoticia]);
  // ---------- Selección de noticia ----------
  const seleccionarNoticia = (id) => {
    setSeleccionNoticia(id);
  };
  // ---------- Editar noticia ----------
  const editarNoticia = (id) => {
    setEditarSeleccionNoticia((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((idNoticia) => idNoticia !== id);
      } else {
        return [...prevState, id];
      }
    });
    setEditarSeleccionNoticiaInterruptor(() => !editarSeleccionNoticiaInterruptor);
  };
  // ---------- Cancelar edición ----------
  const cancelarEditarNoticia = (id) => {
    const noticiaIndex = noticias.findIndex((noticia) => noticia.id === id);
    const noticia = noticias[noticiaIndex];

    setNombresNoticias((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[noticiaIndex] = noticia.nombre;
      return nuevoEstado;
    });
    setEnunciadosNoticias((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[noticiaIndex] = noticia.enunciado;
      return nuevoEstado;
    });
    setImagenesNoticias((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[noticiaIndex] = noticia.archivo_adjunto;
      return nuevoEstado;
    });
    setLugaresNoticias((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[noticiaIndex] = noticia.lugar;
      return nuevoEstado;
    });
    setFechasInicioNoticias((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[noticiaIndex] = noticia.fecha_inicio;
      return nuevoEstado;
    });
    setFechasFinNoticias((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[noticiaIndex] = noticia.fecha_fin;
      return nuevoEstado;
    });
    setAdministradoresNoticias((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[noticiaIndex] = noticia.Administrador.nombre;
      return nuevoEstado;
    });
    setMasInformacionNoticias((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[noticiaIndex] = noticia.mas_informacion;
      return nuevoEstado;
    });
    setEditarSeleccionNoticia((prevState) => prevState.filter((idNoticia) => idNoticia !== id));
    setEditarSeleccionNoticiaInterruptor(() => !editarSeleccionNoticiaInterruptor);
  };
  // ---------- Actualizar de noticias ----------
  const actualizarNoticia = async (id) => {
    const noticiaIndex = noticias.findIndex((noticia) => noticia.id === id);

    try {
      await axios.put(`http://${localIP}:5000/noticia`, {
        id: id,
        nombre: nombresNoticias[noticiaIndex],
        enunciado: enunciadosNoticias[noticiaIndex],
        archivo_adjunto: imagenesNoticias[noticiaIndex],
        lugar: lugaresNoticias[noticiaIndex],
        fecha_inicio: fechasInicioNoticias[noticiaIndex],
        fecha_fin: fechasFinNoticias[noticiaIndex],
        mas_informacion: masInformacionesNoticias[noticiaIndex],
        id_administrador: idAdministradoresNoticias,
      });

      setEditarSeleccionNoticia((prevState) => prevState.filter((idNoticia) => idNoticia !== id));
    } catch (error) {
      console.error("Error al actualizar la noticia:", error);
    }
  };
  // ---------- Recarga de noticias ----------
  const actualizardatos = (id) => {
    const noticiaIndex = noticias.findIndex((noticia) => noticia.id === id);

    setNombresNoticias((prevState) => prevState.filter((_, index) => index !== noticiaIndex));
    setEnunciadosNoticias((prevState) => prevState.filter((_, index) => index !== noticiaIndex));
    setImagenesNoticias((prevState) => prevState.filter((_, index) => index !== noticiaIndex));
    setLugaresNoticias((prevState) => prevState.filter((_, index) => index !== noticiaIndex));
    setFechasInicioNoticias((prevState) => prevState.filter((_, index) => index !== noticiaIndex));
    setFechasFinNoticias((prevState) => prevState.filter((_, index) => index !== noticiaIndex));
    setAdministradoresNoticias((prevState) => prevState.filter((_, index) => index !== noticiaIndex));
    setMasInformacionNoticias((prevState) => prevState.filter((_, index) => index !== noticiaIndex));
  };
  // ---------- Eliminar noticias ----------
  const eliminarNoticia = async (id) => {
    try {
      await axios.delete(`http://${localIP}:5000/noticia`, {
        data: { id: id },
      });

      setNoticias((prevState) => prevState.filter((noticia) => noticia.id !== id));
      actualizardatos(id);
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
    }
  };
  // ---------- Validación de estado ----------
  let contenido;

  switch (subSeccion) {
    case 3:
      contenido = noticias.length > 0 ? (
        <>
          {noticias.map((noticia, index) => (
            <div key={noticia.id} className={seleccionNoticia === noticia.id ? "AdministracionAlternativaContenidoSeleccionado" : "AdministracionAlternativaContenido"} onClick={() => seleccionarNoticia(noticia.id)} ref={seleccionNoticia === noticia.id ? seleccionadaNoticia : null}>
              <form className={editarSeleccionNoticia.includes(noticia.id) ? "articuloAdministracionAlternativaContenido  articuloAlternativoAdministracionAlternativaContenido" : "articuloAdministracionAlternativaContenido"}>
                <div className="articuloAdministracionAlternativaContenido0">
                  <input
                    type="text"
                    name="nombreArticuloAdministracionAlternativaContenido"
                    id={editarSeleccionNoticia.includes(noticia.id) ? "nombreArticuloAlternativoAdministracionAlternativaContenido" : "nombreArticuloAdministracionAlternativaContenido"}
                    disabled={editarSeleccionNoticiaInterruptor === false}
                    value={nombresNoticias[index] || ""}
                    onChange={(e) => {
                      const nuevosNombres = [...nombresNoticias];
                      nuevosNombres[index] = e.target.value;
                      setNombresNoticias(nuevosNombres);
                    }}
                  />
                  <fieldset>
                    <h2>Enunciados:</h2>
                    <textarea
                      rows="5"
                      type="text"
                      name="enunciadoArticuloAdministracionAlternativaContenido"
                      id="enunciadoArticuloAdministracionAlternativaContenido"
                      disabled={editarSeleccionNoticiaInterruptor === false}
                      value={enunciadosNoticias[index] || ""}
                      onChange={(e) => {
                        const nuevosEnunciados = [...enunciadosNoticias];
                        nuevosEnunciados[index] = e.target.value;
                        setEnunciadosNoticias(nuevosEnunciados);
                      }}
                    />
                  </fieldset>
                  <fieldset>
                    <h2>Lugar:</h2>
                    <input
                      type="text"
                      name="lugarArticuloAdministracionAlternativaContenido"
                      id="lugarArticuloAdministracionAlternativaContenido"
                      disabled={editarSeleccionNoticiaInterruptor === false}
                      value={lugaresNoticias[index] || ""}
                      onChange={(e) => {
                        const nuevosLugares = [...lugaresNoticias];
                        nuevosLugares[index] = e.target.value;
                        setLugaresNoticias(nuevosLugares);
                      }}
                    />
                  </fieldset>
                  <fieldset>
                    <h2>Desde:</h2>
                    <input
                      type="date"
                      name="fechaInicioArticuloAdministracionAlternativaContenido"
                      id="fechaInicioArticuloAdministracionAlternativaContenido"
                      disabled={editarSeleccionNoticiaInterruptor === false}
                      value={fechasInicioNoticias[index] || ""}
                      onChange={(e) => {
                        const nuevasFechasInicio = [...fechasInicioNoticias];
                        nuevasFechasInicio[index] = e.target.value;
                        setFechasInicioNoticias(nuevasFechasInicio);
                      }}
                    />
                  </fieldset>
                  <fieldset>
                    <h2>Hasta:</h2>
                    <input
                      type="date"
                      name="fechaFinArticuloAdministracionAlternativaContenido"
                      id="fechaFinArticuloAdministracionAlternativaContenido"
                      disabled={editarSeleccionNoticiaInterruptor === false}
                      value={fechasFinNoticias[index] || ""}
                      onChange={(e) => {
                        const nuevasFechasFin = [...fechasFinNoticias];
                        nuevasFechasFin[index] = e.target.value;
                        setFechasFinNoticias(nuevasFechasFin);
                      }}
                    />
                  </fieldset>
                  <fieldset>
                    <h2>Organiza:</h2>
                    <input
                      type="text"
                      name="administradorArticuloAdministracionAlternativaContenido"
                      id="administradorArticuloAdministracionAlternativaContenido"
                      disabled
                      value={administradoresNoticias[index] || ""}
                      onChange={(e) => {
                        const nuevosAdministradores = [...administradoresNoticias];
                        nuevosAdministradores[index] = e.target.value;
                        setAdministradoresNoticias(nuevosAdministradores);
                      }}
                    />
                  </fieldset>
                  <fieldset>
                    <h2>Más información:</h2>
                    <input
                      type="text"
                      name="masInformacionArticuloAdministracionAlternativaContenido"
                      id="masInformacionArticuloAdministracionAlternativaContenido"
                      disabled={editarSeleccionNoticiaInterruptor === false}
                      value={masInformacionesNoticias[index] || ""}
                      onChange={(e) => {
                        const nuevasMasInformacion = [...masInformacionesNoticias];
                        nuevasMasInformacion[index] = e.target.value;
                        setMasInformacionNoticias(nuevasMasInformacion);
                      }}
                    />
                  </fieldset>
                </div>
                <div className="articuloAdministracionAlternativaContenido1">
                  <fieldset className="subSeccionArticuloAdministracionAlternativaContenido">
                    <div className="imagenArticuloAdministracionAlternativaContenido">
                      <img src={`http://${localIP}:5000/${noticia.archivo_adjunto}`} alt="Imagen no disponible" />
                    </div>
                  </fieldset>
                </div>
              </form>
              {seleccionNoticia === noticia.id &&
                (!editarSeleccionNoticia.includes(noticia.id) ? (
                  <motion.div className="pieAdministracionAlternativaContenidoSeleccionado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                    <button type="button" onClick={() => editarNoticia(noticia.id)} className="botonPieAdministracionAlternativaContenidoSeleccionado">
                      Editar
                    </button>
                    <button type="button" onClick={() => eliminarNoticia(noticia.id)} className="botonPieAdministracionAlternativaContenidoSeleccionado">
                      Eliminar
                    </button>
                  </motion.div>
                ) : (
                  <motion.div className="pieAdministracionAlternativaContenidoSeleccionado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                    <button type="button" onClick={() => cancelarEditarNoticia(noticia.id)} className="botonPieAdministracionAlternativaContenidoSeleccionado">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="botonPieAdministracionAlternativaContenidoSeleccionado"
                      onClick={() => {
                        actualizarNoticia(noticia.id);
                      }}
                    >
                      Guardar
                    </button>
                  </motion.div>
                ))}
            </div>
          ))}
        </>
      ) : (
      <motion.div className="AdministracionAlternativaContenidoSeleccionadoAlternativo">
        <motion.h1 className="tituloAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            Parece que aún no tienes noticias o se trata de un error.
        </motion.h1>
        <motion.p  className="parrafoAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            En el panel superior puedes acceder a la sección para crear una noticia.
        </motion.p>
      </motion.div>
      );
      break;
    case 4:
      contenido = <AdministradorCrearNoticia />;
      break;
    default:
      contenido = (
        <>
          <motion.h1 className="tituloAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            Noticias
          </motion.h1>
          <motion.p className="parrafoAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            Bienvenido a la sección de noticias, aquí podrás ver, modificar, eliminar y crear las noticias, estas se asociarán a tu nombre. <br />A continuación en la parte superior de la página, encontrarás el acceso al control de noticias y al formulario de creación.
          </motion.p>
        </>
      );
  }
  // ---------- Respuesta del proceso ----------
  return <>{contenido}</>;
}
// ---------- Exportación del componente ----------
export default AdministradorNoticia;
