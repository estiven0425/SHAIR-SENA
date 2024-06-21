import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function SuperadministradorAdministradores() {
  const [administradores, setAdministradores] = useState([]);
  const [seleccionAdministrador, setSeleccionAdministrador] = useState(null);
  const [editarSeleccionAdministrador, setEditarSeleccionAdministrador] = useState([]);
  const [nombresAdministradores, setNombresAdministradores] = useState([]);
  const [emailsAdministradores, setEmailsAdministradores] = useState([]);
  const [celularesAdministradores, setCelularesAdministradores] = useState([]);
  const [telefonosAdministradores, setTelefonosAdministradores] = useState([]);
  const seleccionadoAdministrador = useRef(null);

  useEffect(() => {
    const leerAdministrador = async () => {
      try {
        const respuesta = await axios.get("http://localhost:5000/administrador");

        setAdministradores(respuesta.data);

        const nombres = respuesta.data.map((admin) => admin.nombre);
        const emails = respuesta.data.map((admin) => admin.email);
        const celulares = respuesta.data.map((admin) => admin.celular);
        const telefonos = respuesta.data.map((admin) => admin.telefono || "No asignado");

        setNombresAdministradores(nombres);
        setEmailsAdministradores(emails);
        setCelularesAdministradores(celulares);
        setTelefonosAdministradores(telefonos);
      } catch (error) {
        console.error("Error al obtener administradores: ", error);
      }
    };

    leerAdministrador();
  }, []);
  useEffect(() => {
    const deseleccionarAdministrador = (event) => {
      if (seleccionadoAdministrador.current && !seleccionadoAdministrador.current.contains(event.target)) {
        setSeleccionAdministrador(null);
        setEditarSeleccionAdministrador([]);
      }
    };

    document.addEventListener("mousedown", deseleccionarAdministrador);

    return () => {
      document.removeEventListener("mousedown", deseleccionarAdministrador);
    };
  }, [seleccionadoAdministrador]);

  const seleccionarAdministrador = (id_administrador) => {
    setSeleccionAdministrador(id_administrador);
  };
  const editarAdministrador = (id_administrador) => {
    setEditarSeleccionAdministrador((prevState) => {
      if (prevState.includes(id_administrador)) {
        return prevState.filter((id) => id !== id_administrador);
      } else {
        return [...prevState, id_administrador];
      }
    });
  };
  const cancelarEditarAdministrador = (id_administrador) => {
    const adminIndex = administradores.findIndex((admin) => admin.id_administrador === id_administrador);
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
    setEditarSeleccionAdministrador((prevState) => prevState.filter((id) => id !== id_administrador));
  };
  const validacionTelefono = (telefonoAdministrador) => {
    return isNaN(parseInt(telefonoAdministrador));
  };
  const actualizarAdministrador = async (id_administrador) => {
    const adminIndex = administradores.findIndex((admin) => admin.id_administrador === id_administrador);

    try {
      await axios.put(`http://localhost:5000/administrador`, {
        id_administrador: id_administrador,
        nombre: nombresAdministradores[adminIndex],
        email: emailsAdministradores[adminIndex],
        celular: celularesAdministradores[adminIndex],
        telefono: validacionTelefono(telefonosAdministradores[adminIndex]) === false ? telefonosAdministradores[adminIndex] : null,
      });

      setEditarSeleccionAdministrador((prevState) => prevState.filter((id) => id !== id_administrador));
    } catch (error) {
      console.error("Error al actualizar el administrador:", error);
    }
  };
  const actualizardatos = (id_administrador) => {
    const adminIndex = administradores.findIndex((admin) => admin.id_administrador === id_administrador);

    setNombresAdministradores((prevState) => prevState.filter((_, index) => index !== adminIndex));
    setEmailsAdministradores((prevState) => prevState.filter((_, index) => index !== adminIndex));
    setCelularesAdministradores((prevState) => prevState.filter((_, index) => index !== adminIndex));
    setTelefonosAdministradores((prevState) => prevState.filter((_, index) => index !== adminIndex));
  };
  const eliminarAdministrador = async (id_administrador) => {
    try {
      await axios.delete(`http://localhost:5000/administrador`, {
        data: { id_administrador: id_administrador },
      });

      setAdministradores((prevState) => prevState.filter((admin) => admin.id_administrador !== id_administrador));
      actualizardatos(id_administrador);
    } catch (error) {
      console.error("Error al eliminar el administrador:", error);
    }
  };

  return (
    <>
      {administradores.map((administrador, index) => (
        <div key={administrador.id_administrador} className={seleccionAdministrador === administrador.id_administrador ? "AdministracionContenidoSeleccionado" : "AdministracionContenido"} onClick={() => seleccionarAdministrador(administrador.id_administrador)} ref={seleccionAdministrador === administrador.id_administrador ? seleccionadoAdministrador : null}>
          <form className={editarSeleccionAdministrador.includes(administrador.id_administrador) ? "articuloAdministracionContenido  articuloAlternativoAdministracionContenido" : "articuloAdministracionContenido"}>
            <input
              type="text"
              name="nombreArticuloAdministracionContenido"
              id={editarSeleccionAdministrador.includes(administrador.id_administrador) ? "nombreArticuloAlternativoAdministracionContenido" : "nombreArticuloAdministracionContenido"}
              disabled={seleccionAdministrador !== administrador.id_administrador}
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
                disabled={seleccionAdministrador !== administrador.id_administrador}
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
                disabled={seleccionAdministrador !== administrador.id_administrador}
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
                disabled={seleccionAdministrador !== administrador.id_administrador}
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
              <input type="text" name="fechaCreacionArticuloAdministracionContenido" id="fechaCreacionArticuloAdministracionContenido" disabled defaultValue={new Date(administrador.fecha_creacion).toLocaleDateString()} />
            </fieldset>
          </form>
          {seleccionAdministrador === administrador.id_administrador &&
            (!editarSeleccionAdministrador.includes(administrador.id_administrador) ? (
              <div className="pieAdministracionContenidoSeleccionado">
                <button type="button" onClick={() => editarAdministrador(administrador.id_administrador)} className="botonPieAdministracionContenidoSeleccionado">
                  Editar
                </button>
                <button type="button" onClick={() => eliminarAdministrador(administrador.id_administrador)} className="botonPieAdministracionContenidoSeleccionado">
                  Eliminar
                </button>
                <button type="button" className="botonPieAdministracionContenidoSeleccionado">
                  Noticias
                </button>
              </div>
            ) : (
              <div className="pieAdministracionContenidoSeleccionado">
                <button type="button" onClick={() => cancelarEditarAdministrador(administrador.id_administrador)} className="botonPieAdministracionContenidoSeleccionado">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="botonPieAdministracionContenidoSeleccionado"
                  onClick={() => {
                    actualizarAdministrador(administrador.id_administrador);
                  }}
                >
                  Guardar
                </button>
              </div>
            ))}
        </div>
      ))}
    </>
  );
}

export default SuperadministradorAdministradores;
