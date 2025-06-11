// ADMINISTRADORES DEL SUPERADMINISTRADOR
// ---------- Importaciones ----------
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import SuperadministradorAdministradorNoticia from "./SuperadministradorAdministradorNoticia";
import SuperadministradorCrearAdministrador from "./SuperadministradorCrearAdministrador";
// ---------- Componente ----------
function SuperadministradorAdministradores() {
  // ---------- Estados, contextos y referencias ----------
  const [administradores, setAdministradores] = useState([]);
  const [seleccionAdministrador, setSeleccionAdministrador] = useState(null);
  const [editarSeleccionAdministrador, setEditarSeleccionAdministrador] =
    useState([]);
  const [nombresAdministradores, setNombresAdministradores] = useState([]);
  const [emailsAdministradores, setEmailsAdministradores] = useState([]);
  const [celularesAdministradores, setCelularesAdministradores] = useState([]);
  const [telefonosAdministradores, setTelefonosAdministradores] = useState([]);
  const [ventanaAdministradorNoticias, setVentanaAdministradorNoticias] =
    useState(false);

  const seleccionadoAdministrador = useRef(null);

  const administracion = useContext(AdministracionContexto);
  const subSeccion = administracion.subSeccion;

  const localIP = process.env.REACT_APP_LOCAL_IP;
  // ---------- Obtención de administradores ----------
  useEffect(() => {
    const leerAdministrador = async () => {
      try {
        const respuesta = await axios.get(
          `http://${localIP}:5000/administrador`
        );

        setAdministradores(respuesta.data);

        const nombres = respuesta.data.map((admin) => admin.nombre);
        const emails = respuesta.data.map((admin) => admin.email);
        const celulares = respuesta.data.map((admin) => admin.celular);
        const telefonos = respuesta.data.map(
          (admin) => admin.telefono || "No asignado"
        );

        setNombresAdministradores(nombres);
        setEmailsAdministradores(emails);
        setCelularesAdministradores(celulares);
        setTelefonosAdministradores(telefonos);
      } catch (error) {
        console.error("Error al obtener administradores: ", error);
      }
    };

    leerAdministrador();
  }, [subSeccion]);
  // ---------- Deselección de administradores ----------
  useEffect(() => {
    const deseleccionarAdministrador = (event) => {
      if (
        seleccionadoAdministrador.current &&
        !seleccionadoAdministrador.current.contains(event.target)
      ) {
        setSeleccionAdministrador(null);
        setEditarSeleccionAdministrador([]);
      }
    };

    document.addEventListener("mousedown", deseleccionarAdministrador);

    return () => {
      document.removeEventListener("mousedown", deseleccionarAdministrador);
    };
  }, [seleccionadoAdministrador]);
  // ---------- Selección de administradores ----------
  const seleccionarAdministrador = (id_administrador) => {
    setSeleccionAdministrador(id_administrador);
  };
  // ---------- Editar administradores ----------
  const editarAdministrador = (id_administrador) => {
    setEditarSeleccionAdministrador((prevState) => {
      if (prevState.includes(id_administrador)) {
        return prevState.filter((id) => id !== id_administrador);
      } else {
        return [...prevState, id_administrador];
      }
    });
  };
  // ---------- Cancelar edición ----------
  const cancelarEditarAdministrador = (id_administrador) => {
    const adminIndex = administradores.findIndex(
      (admin) => admin.id_administrador === id_administrador
    );
    const admin = administradores[adminIndex];

    setNombresAdministradores((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[adminIndex] = admin.nombre;
      return nuevoEstado;
    });
    setEmailsAdministradores((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[adminIndex] = admin.email;
      return nuevoEstado;
    });
    setCelularesAdministradores((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[adminIndex] = admin.celular;
      return nuevoEstado;
    });
    setTelefonosAdministradores((prevState) => {
      const nuevoEstado = [...prevState];
      nuevoEstado[adminIndex] = admin.telefono || "No asignado";
      return nuevoEstado;
    });
    setEditarSeleccionAdministrador((prevState) =>
      prevState.filter((id) => id !== id_administrador)
    );
  };
  // ---------- Validación de seguridad ----------
  const validacionTelefono = (telefonoAdministrador) => {
    return isNaN(parseInt(telefonoAdministrador));
  };
  // ---------- Actualizar administradores ----------
  const actualizarAdministrador = async (id_administrador) => {
    const adminIndex = administradores.findIndex(
      (admin) => admin.id_administrador === id_administrador
    );

    try {
      await axios.put(`http://${localIP}:5000/administrador`, {
        id_administrador: id_administrador,
        nombre: nombresAdministradores[adminIndex],
        email: emailsAdministradores[adminIndex],
        celular: celularesAdministradores[adminIndex],
        telefono:
          validacionTelefono(telefonosAdministradores[adminIndex]) === false
            ? telefonosAdministradores[adminIndex]
            : null,
      });

      setEditarSeleccionAdministrador((prevState) =>
        prevState.filter((id) => id !== id_administrador)
      );
    } catch (error) {
      console.error("Error al actualizar el administrador:", error);
    }
  };
  // ---------- Recargar administradores ----------
  const actualizardatos = (id_administrador) => {
    const adminIndex = administradores.findIndex(
      (admin) => admin.id_administrador === id_administrador
    );

    setNombresAdministradores((prevState) =>
      prevState.filter((_, index) => index !== adminIndex)
    );
    setEmailsAdministradores((prevState) =>
      prevState.filter((_, index) => index !== adminIndex)
    );
    setCelularesAdministradores((prevState) =>
      prevState.filter((_, index) => index !== adminIndex)
    );
    setTelefonosAdministradores((prevState) =>
      prevState.filter((_, index) => index !== adminIndex)
    );
  };
  // ---------- Eliminar administradores ----------
  const eliminarAdministrador = async (id_administrador) => {
    try {
      await axios.delete(`http://${localIP}:5000/administrador`, {
        data: { id_administrador: id_administrador },
      });

      setAdministradores((prevState) =>
        prevState.filter((admin) => admin.id_administrador !== id_administrador)
      );

      actualizardatos(id_administrador);
    } catch (error) {
      console.error("Error al eliminar el administrador:", error);
    }
  };
  // ---------- Ventana de noticias de administradores ----------
  const ventanaAdministradorNotica = (id_administrador) => {
    if (id_administrador) {
      setVentanaAdministradorNoticias(!ventanaAdministradorNoticias);
    }
  };
  // ---------- Validación de estado ----------
  let contenido;

  switch (subSeccion) {
    case 1:
      contenido =
        administradores.length > 0 ? (
          <>
            {administradores.map((administrador, index) => (
              <div
                key={administrador.id_administrador}
                className={
                  seleccionAdministrador === administrador.id_administrador
                    ? "AdministracionContenidoSeleccionado"
                    : "AdministracionContenido"
                }
                onClick={() =>
                  seleccionarAdministrador(administrador.id_administrador)
                }
                ref={
                  seleccionAdministrador === administrador.id_administrador
                    ? seleccionadoAdministrador
                    : null
                }
              >
                <form
                  className={
                    editarSeleccionAdministrador.includes(
                      administrador.id_administrador
                    )
                      ? "articuloAdministracionContenido  articuloAlternativoAdministracionContenido"
                      : "articuloAdministracionContenido"
                  }
                >
                  <input
                    type="text"
                    name="nombreArticuloAdministracionContenido"
                    id={
                      editarSeleccionAdministrador.includes(
                        administrador.id_administrador
                      )
                        ? "nombreArticuloAlternativoAdministracionContenido"
                        : "nombreArticuloAdministracionContenido"
                    }
                    disabled={
                      seleccionAdministrador !== administrador.id_administrador
                    }
                    value={nombresAdministradores[index] || ""}
                    onChange={(e) => {
                      const nuevosNombres = [...nombresAdministradores];
                      nuevosNombres[index] = e.target.value;
                      setNombresAdministradores(nuevosNombres);
                    }}
                  />
                  <fieldset>
                    <h2>E-mail:</h2>
                    <input
                      type="text"
                      name="emailArticuloAdministracionContenido"
                      id="emailArticuloAdministracionContenido"
                      disabled={
                        seleccionAdministrador !==
                        administrador.id_administrador
                      }
                      value={emailsAdministradores[index] || ""}
                      onChange={(e) => {
                        const nuevosEmails = [...emailsAdministradores];
                        nuevosEmails[index] = e.target.value;
                        setEmailsAdministradores(nuevosEmails);
                      }}
                    />
                  </fieldset>
                  <fieldset>
                    <h2>Celular:</h2>
                    <input
                      type="text"
                      name="celularArticuloAdministracionContenido"
                      id="celularArticuloAdministracionContenido"
                      disabled={
                        seleccionAdministrador !==
                        administrador.id_administrador
                      }
                      value={celularesAdministradores[index] || ""}
                      onChange={(e) => {
                        const nuevosCelulares = [...celularesAdministradores];
                        nuevosCelulares[index] = e.target.value;
                        setCelularesAdministradores(nuevosCelulares);
                      }}
                    />
                  </fieldset>
                  <fieldset>
                    <h2>Teléfono:</h2>
                    <input
                      type="text"
                      name="telefonoArticuloAdministracionContenido"
                      id="telefonoArticuloAdministracionContenido"
                      disabled={
                        seleccionAdministrador !==
                        administrador.id_administrador
                      }
                      value={telefonosAdministradores[index] || ""}
                      onChange={(e) => {
                        const nuevosTelefonos = [...telefonosAdministradores];
                        nuevosTelefonos[index] = e.target.value;
                        setTelefonosAdministradores(nuevosTelefonos);
                      }}
                    />
                  </fieldset>
                  <fieldset>
                    <h2>Fecha de modificación:</h2>
                    <input
                      type="text"
                      name="fechaCreacionArticuloAdministracionContenido"
                      id="fechaCreacionArticuloAdministracionContenido"
                      disabled
                      defaultValue={new Date(
                        administrador.fecha_creacion
                      ).toLocaleDateString()}
                    />
                  </fieldset>
                </form>
                {seleccionAdministrador === administrador.id_administrador &&
                  (!editarSeleccionAdministrador.includes(
                    administrador.id_administrador
                  ) ? (
                    <div className="pieAdministracionContenidoSeleccionado">
                      <button
                        type="button"
                        onClick={() =>
                          editarAdministrador(administrador.id_administrador)
                        }
                        className="botonPieAdministracionContenidoSeleccionado"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          eliminarAdministrador(administrador.id_administrador)
                        }
                        className="botonPieAdministracionContenidoSeleccionado"
                      >
                        Eliminar
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          ventanaAdministradorNotica(
                            administrador.id_administrador
                          )
                        }
                        className="botonPieAdministracionContenidoSeleccionado"
                      >
                        Noticias
                      </button>
                      <aside
                        className="ventanaPieAdministracionContenidoSeleccionado"
                        style={{
                          display:
                            ventanaAdministradorNoticias === true
                              ? "flex"
                              : "none",
                        }}
                      >
                        <SuperadministradorAdministradorNoticia
                          id_administrador={administrador.id_administrador}
                        />
                      </aside>
                    </div>
                  ) : (
                    <div className="pieAdministracionContenidoSeleccionado">
                      <button
                        type="button"
                        onClick={() =>
                          cancelarEditarAdministrador(
                            administrador.id_administrador
                          )
                        }
                        className="botonPieAdministracionContenidoSeleccionado"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="botonPieAdministracionContenidoSeleccionado"
                        onClick={() => {
                          actualizarAdministrador(
                            administrador.id_administrador
                          );
                        }}
                      >
                        Guardar
                      </button>
                    </div>
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
              Parece que aún no existen administradores o se trata de un error.
            </motion.h1>
            <motion.p
              className="parrafoAdministracionPrincipal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              En el panel superior puedes acceder a la sección para crear un
              administrador.
            </motion.p>
          </motion.div>
        );
      break;
    case 2:
      contenido = <SuperadministradorCrearAdministrador />;
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
            Administradores
          </motion.h1>
          <motion.p
            className="parrafoAdministracionPrincipal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            Bienvenido a la sección de administradores, aquí puedes gestionar a
            los administadores de la plataforma. <br />A continuación, en la
            parte superior de la página encontraras el acceso a el control de
            administradores y al formulario de creación.
          </motion.p>
        </>
      );
  }
  // ---------- Respuesta del proceso ----------
  return <>{contenido}</>;
}
// ---------- Exportación del componente ----------
export default SuperadministradorAdministradores;
