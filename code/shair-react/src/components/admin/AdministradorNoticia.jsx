import React, { useState, useEffect, useRef, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import AdministradorCrearNoticia from "./AdministradorCrearNoticia";
import axios from "axios";

function AdministradorNoticia() {
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
  const seleccionadaNoticia = useRef(null);
  const administracion = useContext(AdministracionContexto);
  const subSeccion = administracion.subSeccion;

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const tokenDecodificacion = jwtDecode(token);
    const tokenIdAdministrador = tokenDecodificacion.id;
    setIdAdministradoresNoticias(tokenIdAdministrador);
  }, []);
  useEffect(() => {
    const leerNoticia = async () => {
      try {
        const respuesta = await axios.get("http://localhost:5000/noticia");

        setNoticias(respuesta.data);

        const nombres = respuesta.data.map((noticia) => noticia.nombre);
        const enunciados = respuesta.data.map((noticia) => noticia.enunciado);
        const imagenes = respuesta.data.map((noticia) => noticia.archivo_adjunto);
        const lugares = respuesta.data.map((noticia) => noticia.lugar);
        const fechasInicio = respuesta.data.map((noticia) => noticia.fecha_inicio);
        const fechasFin = respuesta.data.map((noticia) => noticia.fecha_fin);
        const administradores = respuesta.data.map((noticia) => noticia.Administrador.nombre);
        const masInformaciones = respuesta.data.map((noticia) => noticia.mas_informacion);

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
  }, [subSeccion]);
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
  const editarNoticia = (id) => {
    setEditarSeleccionNoticia((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((idNoticia) => idNoticia !== id);
      } else {
        return [...prevState, id];
      }
    });
  };
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
  };
  const actualizarNoticia = async (id) => {
    const noticiaIndex = noticias.findIndex((noticia) => noticia.id === id);

    try {
      await axios.put(`http://localhost:5000/noticia`, {
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
  const eliminarNoticia = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/noticia`, {
        data: { id: id },
      });

      setNoticias((prevState) => prevState.filter((noticia) => noticia.id !== id));
      actualizardatos(id);
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
    }
  };

  let contenido;

  switch (subSeccion) {
    case 3:
      contenido = (
        <>
          {noticias.map((noticia, index) => (
            <div key={noticia.id} className={seleccionNoticia === noticia.id ? "superadministradorSeleccioadoAdministradores" : "superadministradorAdministradores"} onClick={() => seleccionarNoticia(noticia.id)} ref={seleccionNoticia === noticia.id ? seleccionadaNoticia : null}>
              <form className={editarSeleccionNoticia.includes(noticia.id) ? "articuloSuperadministradorAdministradores  articuloAlternativoSuperadministradorAdministradores" : "articuloSuperadministradorAdministradores"}>
                <input
                  type="text"
                  name="nombreArticuloSuperadministradorAdministradores"
                  id={editarSeleccionNoticia.includes(noticia.id) ? "nombreArticuloAlternativoSuperadministradorAdministradores" : "nombreArticuloSuperadministradorAdministradores"}
                  disabled={seleccionNoticia !== noticia.id}
                  value={nombresNoticias[index] || ""}
                  onChange={(e) => {
                    const nuevosNombres = [...nombresNoticias];
                    nuevosNombres[index] = e.target.value;
                    setNombresNoticias(nuevosNombres);
                  }}
                />
                <fieldset>
                  <h2>Enunciados:</h2>
                  <input
                    type="text"
                    name="emailArticuloSuperadministradorAdministradores"
                    // id="emailArticuloSuperadministradorAdministradores"
                    disabled={seleccionNoticia !== noticia.id}
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
                    name="celularArticuloSuperadministradorAdministradores"
                    // id="celularArticuloSuperadministradorAdministradores"
                    disabled={seleccionNoticia !== noticia.id}
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
                    name="telefonoArticuloSuperadministradorAdministradores"
                    // id="telefonoArticuloSuperadministradorAdministradores"
                    disabled={seleccionNoticia !== noticia.id}
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
                    name="telefonoArticuloSuperadministradorAdministradores"
                    // id="telefonoArticuloSuperadministradorAdministradores"
                    disabled={seleccionNoticia !== noticia.id}
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
                    name="telefonoArticuloSuperadministradorAdministradores"
                    // id="telefonoArticuloSuperadministradorAdministradores"
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
                    name="telefonoArticuloSuperadministradorAdministradores"
                    // id="telefonoArticuloSuperadministradorAdministradores"
                    disabled={seleccionNoticia !== noticia.id}
                    value={masInformacionesNoticias[index] || ""}
                    onChange={(e) => {
                      const nuevasMasInformacion = [...masInformacionesNoticias];
                      nuevasMasInformacion[index] = e.target.value;
                      setMasInformacionNoticias(nuevasMasInformacion);
                    }}
                  />
                </fieldset>
                <fieldset className="subSeccionFormularioRecomendacionPrincipal">
                  <div className="imagenArticuloSubContenedorNoticia">
                    <img src={`http://localhost:5000/${noticia.archivo_adjunto}`} alt="Imagen no disponible" />
                  </div>
                </fieldset>
              </form>
              {seleccionNoticia === noticia.id &&
                (!editarSeleccionNoticia.includes(noticia.id) ? (
                  <div className="pieSuperadministradorSeleccioadoAdministradores">
                    <button type="button" onClick={() => editarNoticia(noticia.id)} className="botonPieSuperadministradorSeleccioadoAdministradores">
                      Editar
                    </button>
                    <button type="button" onClick={() => eliminarNoticia(noticia.id)} className="botonPieSuperadministradorSeleccioadoAdministradores">
                      Eliminar
                    </button>
                  </div>
                ) : (
                  <div className="pieSuperadministradorSeleccioadoAdministradores">
                    <button type="button" onClick={() => cancelarEditarNoticia(noticia.id)} className="botonPieSuperadministradorSeleccioadoAdministradores">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="botonPieSuperadministradorSeleccioadoAdministradores"
                      onClick={() => {
                        actualizarNoticia(noticia.id);
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
      break;
    case 4:
      contenido = <AdministradorCrearNoticia />;
      break;
    default:
      contenido = (
        <>
          <h1 className="tituloAdministracionPrincipal">Noticias</h1>
          <p className="parrafoAdministracionPrincipal">
            Bienvenido a la sección de noticias, aquí podrás ver, modificar, eliminar y crear las noticias, estas se asociarán a tu nombre. <br />A continuación en la parte superior de la página, encontrarás el acceso al control de noticias y al formulario de creación.
          </p>
        </>
      );
  }

  return <>{contenido}</>;
}

export default AdministradorNoticia;
