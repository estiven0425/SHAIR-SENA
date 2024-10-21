// ANUNCIOS DEL ADMINISTRADOR
// ---------- Importaciones ----------
import React, { useState, useEffect, useRef, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import axios from "axios";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import AdministradorCrearAnuncio from "./AdministradorCrearAnuncio";
// ---------- Componente ----------
function AdministradorAnuncio() {
  // ---------- Estados, contextos y referencias ----------
  const [anuncios, setAnuncios] = useState([]);
  const [seleccionAnuncio, setSeleccionAnuncio] = useState(null);
  const [editarSeleccionAnuncio, setEditarSeleccionAnuncio] = useState([]);
  const [nombresAnuncios, setNombresAnuncios] = useState([]);
  const [enunciadosAnuncios, setEnunciadosAnuncios] = useState([]);
  const [imagenesAnuncios, setImagenesAnuncios] = useState([]);
  const [fechasExpiracionAnuncios, setFechasExpiracionAnuncios] = useState([]);
  const [administradoresAnuncios, setAdministradoresAnuncios] = useState([]);
  const [idAdministradoresAnuncios, setIdAdministradoresAnuncios] = useState([]);
  const [masInformacionesAnuncios, setMasInformacionAnuncios] = useState([]);
  const seleccionadoAnuncio = useRef(null);
  const administracion = useContext(AdministracionContexto);
  const subSeccion = administracion.subSeccion;
  const localIP = process.env.REACT_APP_LOCAL_IP;
  // ---------- Obtención de información de inicio de sesión ----------
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const tokenDecodificacion = jwtDecode(token);
    const tokenIdAdministrador = tokenDecodificacion.id;
    setIdAdministradoresAnuncios(tokenIdAdministrador);
  }, []);
  // ---------- Obtención de anuncios ----------
  useEffect(() => {
    const leerAnuncio = async () => {
      try {
        const respuesta = await axios.get(`http://${localIP}:5000/anuncio`);
        const anunciosTotales = respuesta.data;
        const anunciosFiltrados = anunciosTotales.filter((anuncio) => anuncio.id_administrador === idAdministradoresAnuncios);

        setAnuncios(anunciosFiltrados);

        const nombres = anunciosFiltrados.map((anuncio) => anuncio.nombre);
        const enunciados = anunciosFiltrados.map((anuncio) => anuncio.enunciado);
        const imagenes = anunciosFiltrados.map((anuncio) => anuncio.archivo_adjunto);
        const fechasExpiracion = anunciosFiltrados.map((anuncio) => anuncio.fecha_expiracion);
        const administradores = anunciosFiltrados.map((anuncio) => anuncio.Administrador.nombre);
        const masInformaciones = anunciosFiltrados.map((anuncio) => anuncio.mas_informacion);

        setNombresAnuncios(nombres);
        setEnunciadosAnuncios(enunciados);
        setImagenesAnuncios(imagenes);
        setFechasExpiracionAnuncios(fechasExpiracion);
        setAdministradoresAnuncios(administradores);
        setMasInformacionAnuncios(masInformaciones);
      } catch (error) {
        console.error("Error al obtener anuncios: ", error);
      }
    };

    leerAnuncio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subSeccion]);
  // ---------- Deselección de anuncios ----------
  useEffect(() => {
    const deseleccionarAnuncio = (event) => {
      if (seleccionadoAnuncio.current && !seleccionadoAnuncio.current.contains(event.target)) {
        setSeleccionAnuncio(null);
        setEditarSeleccionAnuncio([]);
      }
    };

    document.addEventListener("mousedown", deseleccionarAnuncio);

    return () => {
      document.removeEventListener("mousedown", deseleccionarAnuncio);
    };
  }, [seleccionadoAnuncio]);
  // ---------- Selección de anuncio ----------
  const seleccionarAnuncio = (id) => {
    setSeleccionAnuncio(id);
  };
  // ---------- Editar anuncio ----------
  const editarAnuncio = (id) => {
    setEditarSeleccionAnuncio((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((idAnuncio) => idAnuncio !== id);
      } else {
        return [...prevState, id];
      }
    });
  };
  // ---------- Cancelar edición ----------
  const cancelarEditarAnuncio = (id) => {
    const anuncioIndex = anuncios.findIndex((noticia) => noticia.id === id);
    const anuncio = anuncios[anuncioIndex];

    setNombresAnuncios((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[anuncioIndex] = anuncio.nombre;
      return nuevoEstado;
    });
    setEnunciadosAnuncios((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[anuncioIndex] = anuncio.enunciado;
      return nuevoEstado;
    });
    setImagenesAnuncios((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[anuncioIndex] = anuncio.archivo_adjunto;
      return nuevoEstado;
    });
    setFechasExpiracionAnuncios((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[anuncioIndex] = anuncio.fecha_expiracion;
      return nuevoEstado;
    });
    setAdministradoresAnuncios((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[anuncioIndex] = anuncio.Administrador.nombre;
      return nuevoEstado;
    });
    setMasInformacionAnuncios((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[anuncioIndex] = anuncio.mas_informacion;
      return nuevoEstado;
    });
    setEditarSeleccionAnuncio((prevState) => prevState.filter((idNoticia) => idNoticia !== id));
  };
  // ---------- Actualizar anuncios ----------
  const actualizarAnuncio = async (id) => {
    const anuncioIndex = anuncios.findIndex((anuncio) => anuncio.id === id);

    try {
      await axios.put(`http://${localIP}:5000/anuncio`, {
        id: id,
        nombre: nombresAnuncios[anuncioIndex],
        enunciado: enunciadosAnuncios[anuncioIndex],
        archivo_adjunto: imagenesAnuncios[anuncioIndex],
        fecha_expiracion: fechasExpiracionAnuncios[anuncioIndex],
        mas_informacion: masInformacionesAnuncios[anuncioIndex],
        id_administrador: idAdministradoresAnuncios,
      });

      setEditarSeleccionAnuncio((prevState) => prevState.filter((idAnuncio) => idAnuncio !== id));
    } catch (error) {
      console.error("Error al actualizar el anuncio:", error);
    }
  };
  // ---------- Recarga de anuncios ----------
  const actualizardatos = (id) => {
    const anuncioIndex = anuncios.findIndex((anuncio) => anuncio.id === id);

    setNombresAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
    setEnunciadosAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
    setImagenesAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
    setFechasExpiracionAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
    setAdministradoresAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
    setMasInformacionAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
  };
  // ---------- Eliminar anuncios ----------
  const eliminarAnuncio = async (id) => {
    try {
      await axios.delete(`http://${localIP}:5000/anuncio`, {
        data: { id: id },
      });

      setAnuncios((prevState) => prevState.filter((anuncio) => anuncio.id !== id));
      actualizardatos(id);
    } catch (error) {
      console.error("Error al eliminar el anuncio:", error);
    }
  };
  // ---------- Validación de estado ----------
  let contenido;

  switch (subSeccion) {
    case 5:
      contenido = anuncios.length > 0 ? (
        <>
          {anuncios.map((anuncio, index) => (
            <div key={anuncio.id} className={seleccionAnuncio === anuncio.id ? "AdministracionAlternativaContenidoSeleccionado" : "AdministracionAlternativaContenido"} onClick={() => seleccionarAnuncio(anuncio.id)} ref={seleccionAnuncio === anuncio.id ? seleccionadoAnuncio : null}>
              <form className={editarSeleccionAnuncio.includes(anuncio.id) ? "articuloAdministracionAlternativaContenido  articuloAlternativoAdministracionAlternativaContenido" : "articuloAdministracionAlternativaContenido"}>
                <div className="articuloAdministracionAlternativaContenido0">
                  <input
                    type="text"
                    name="nombreArticuloAdministracionAlternativaContenido"
                    id={editarSeleccionAnuncio.includes(anuncio.id) ? "nombreArticuloAlternativoAdministracionAlternativaContenido" : "nombreArticuloAdministracionAlternativaContenido"}
                    disabled={seleccionAnuncio !== anuncio.id}
                    value={nombresAnuncios[index] || ""}
                    onChange={(e) => {
                      const nuevosNombres = [...nombresAnuncios];
                      nuevosNombres[index] = e.target.value;
                      setNombresAnuncios(nuevosNombres);
                    }}
                  />
                  <fieldset>
                    <h2>Enunciados:</h2>
                    <textarea
                      rows="5"
                      type="text"
                      name="enunciadoArticuloAdministracionAlternativaContenido"
                      id="enunciadoArticuloAdministracionAlternativaContenido"
                      disabled={seleccionAnuncio !== anuncio.id}
                      value={enunciadosAnuncios[index] || ""}
                      onChange={(e) => {
                        const nuevosEnunciados = [...enunciadosAnuncios];
                        nuevosEnunciados[index] = e.target.value;
                        setEnunciadosAnuncios(nuevosEnunciados);
                      }}
                    />
                  </fieldset>
                  <fieldset>
                    <h2>Fecha de expiración:</h2>
                    <input
                      type="date"
                      name="fechaExpiracionArticuloAdministracionAlternativaContenido"
                      id="fechaExpiracionArticuloAdministracionAlternativaContenido"
                      disabled={seleccionAnuncio !== anuncio.id}
                      value={fechasExpiracionAnuncios[index] || ""}
                      onChange={(e) => {
                        const nuevasFechasExpiracion = [...fechasExpiracionAnuncios];
                        nuevasFechasExpiracion[index] = e.target.value;
                        setFechasExpiracionAnuncios(nuevasFechasExpiracion);
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
                      value={administradoresAnuncios[index] || ""}
                      onChange={(e) => {
                        const nuevosAdministradores = [...administradoresAnuncios];
                        nuevosAdministradores[index] = e.target.value;
                        setAdministradoresAnuncios(nuevosAdministradores);
                      }}
                    />
                  </fieldset>
                  <fieldset>
                    <h2>Más información:</h2>
                    <input
                      type="text"
                      name="masInformacionArticuloAdministracionAlternativaContenido"
                      id="masInformacionArticuloAdministracionAlternativaContenido"
                      disabled={seleccionAnuncio !== anuncio.id}
                      value={masInformacionesAnuncios[index] || ""}
                      onChange={(e) => {
                        const nuevasMasInformacion = [...masInformacionesAnuncios];
                        nuevasMasInformacion[index] = e.target.value;
                        setMasInformacionAnuncios(nuevasMasInformacion);
                      }}
                    />
                  </fieldset>
                </div>
                <div className="articuloAdministracionAlternativaContenido1">
                  <fieldset className="ArticuloAdministracionAlternativaContenido">
                    <div className="imagenArticuloAdministracionAlternativaContenido">
                      <img src={`http://${localIP}:5000/${anuncio.archivo_adjunto}`} alt="Imagen no disponible" />
                    </div>
                  </fieldset>
                </div>
              </form>
              {seleccionAnuncio === anuncio.id &&
                (!editarSeleccionAnuncio.includes(anuncio.id) ? (
                  <motion.div className="pieAdministracionAlternativaContenidoSeleccionado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                    <button type="button" onClick={() => editarAnuncio(anuncio.id)} className="botonPieAdministracionAlternativaContenidoSeleccionado">
                      Editar
                    </button>
                    <button type="button" onClick={() => eliminarAnuncio(anuncio.id)} className="botonPieAdministracionAlternativaContenidoSeleccionado">
                      Eliminar
                    </button>
                  </motion.div>
                ) : (
                  <motion.div className="pieAdministracionAlternativaContenidoSeleccionado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                    <button type="button" onClick={() => cancelarEditarAnuncio(anuncio.id)} className="botonPieAdministracionAlternativaContenidoSeleccionado">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="botonPieAdministracionAlternativaContenidoSeleccionado"
                      onClick={() => {
                        actualizarAnuncio(anuncio.id);
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
            Parece que aún no tienes anuncios o se trata de un error.
        </motion.h1>
        <motion.p  className="parrafoAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            En el panel superior puedes acceder a la sección para crear un anuncio.
        </motion.p>
      </motion.div>
      );
      break;
    case 6:
      contenido = <AdministradorCrearAnuncio />;
      break;
    default:
      contenido = (
        <>
          <motion.h1 className="tituloAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            Anuncios
          </motion.h1>
          <motion.p className="parrafoAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            Bienvenido a la sección de anuncios. <br />
            Aquí podrás ver, modificar, eliminar y crear los anuncios, estos se asociarán a tu nombre y se eliminaran al pasar la fecha de expiración. <br />A continuación, en la parte superior de la página encontraras el acceso a el control de anuncios y al formulario de creación.
          </motion.p>
        </>
      );
  }
  // ---------- Respuesta del proceso ----------
  return <>{contenido}</>;
}
// ---------- Exportación del componente ----------
export default AdministradorAnuncio;
