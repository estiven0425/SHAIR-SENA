import React, { useState, useEffect, useRef, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import AdministradorCrearAnuncio from "./AdministradorCrearAnuncio";
import axios from "axios";

function AdministradorAnuncio() {
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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const tokenDecodificacion = jwtDecode(token);
    const tokenIdAdministrador = tokenDecodificacion.id;
    setIdAdministradoresAnuncios(tokenIdAdministrador);
  }, []);
  useEffect(() => {
    const leerAnuncio = async () => {
      try {
        const respuesta = await axios.get("http://localhost:5000/anuncio");

        setAnuncios(respuesta.data);

        const nombres = respuesta.data.map((anuncio) => anuncio.nombre);
        const enunciados = respuesta.data.map((anuncio) => anuncio.enunciado);
        const imagenes = respuesta.data.map((anuncio) => anuncio.archivo_adjunto);
        const fechasExpiracion = respuesta.data.map((anuncio) => anuncio.fecha_expiracion);
        const administradores = respuesta.data.map((anuncio) => anuncio.Administrador.nombre);
        const masInformaciones = respuesta.data.map((anuncio) => anuncio.mas_informacion);

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
  }, [subSeccion]);
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
  const seleccionarAnuncio = (id) => {
    setSeleccionAnuncio(id);
  };
  const editarAnuncio = (id) => {
    setEditarSeleccionAnuncio((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((idAnuncio) => idAnuncio !== id);
      } else {
        return [...prevState, id];
      }
    });
  };
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
  const actualizarAnuncio = async (id) => {
    const anuncioIndex = anuncios.findIndex((anuncio) => anuncio.id === id);

    try {
      await axios.put(`http://localhost:5000/anuncio`, {
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
  const actualizardatos = (id) => {
    const anuncioIndex = anuncios.findIndex((anuncio) => anuncio.id === id);

    setNombresAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
    setEnunciadosAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
    setImagenesAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
    setFechasExpiracionAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
    setAdministradoresAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
    setMasInformacionAnuncios((prevState) => prevState.filter((_, index) => index !== anuncioIndex));
  };
  const eliminarAnuncio = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/anuncio`, {
        data: { id: id },
      });

      setAnuncios((prevState) => prevState.filter((anuncio) => anuncio.id !== id));
      actualizardatos(id);
    } catch (error) {
      console.error("Error al eliminar el anuncio:", error);
    }
  };

  let contenido;

  switch (subSeccion) {
    case 5:
      contenido = (
        <>
          {anuncios.map((anuncio, index) => (
            <div key={anuncio.id} className={seleccionAnuncio === anuncio.id ? "superadministradorSeleccioadoAdministradores" : "superadministradorAdministradores"} onClick={() => seleccionarAnuncio(anuncio.id)} ref={seleccionAnuncio === anuncio.id ? seleccionadoAnuncio : null}>
              <form className={editarSeleccionAnuncio.includes(anuncio.id) ? "articuloSuperadministradorAdministradores  articuloAlternativoSuperadministradorAdministradores" : "articuloSuperadministradorAdministradores"}>
                <input
                  type="text"
                  name="nombreArticuloSuperadministradorAdministradores"
                  id={editarSeleccionAnuncio.includes(anuncio.id) ? "nombreArticuloAlternativoSuperadministradorAdministradores" : "nombreArticuloSuperadministradorAdministradores"}
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
                  <input
                    type="text"
                    name="emailArticuloSuperadministradorAdministradores"
                    // id="emailArticuloSuperadministradorAdministradores"
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
                    name="telefonoArticuloSuperadministradorAdministradores"
                    // id="telefonoArticuloSuperadministradorAdministradores"
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
                    name="telefonoArticuloSuperadministradorAdministradores"
                    // id="telefonoArticuloSuperadministradorAdministradores"
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
                    name="telefonoArticuloSuperadministradorAdministradores"
                    // id="telefonoArticuloSuperadministradorAdministradores"
                    disabled={seleccionAnuncio !== anuncio.id}
                    value={masInformacionesAnuncios[index] || ""}
                    onChange={(e) => {
                      const nuevasMasInformacion = [...masInformacionesAnuncios];
                      nuevasMasInformacion[index] = e.target.value;
                      setMasInformacionAnuncios(nuevasMasInformacion);
                    }}
                  />
                </fieldset>
                <fieldset className="subSeccionFormularioRecomendacionPrincipal">
                  <div className="imagenArticuloSubContenedorNoticia">
                    <img src={`http://localhost:5000/${anuncio.archivo_adjunto}`} alt="Imagen no disponible" />
                  </div>
                </fieldset>
              </form>
              {seleccionAnuncio === anuncio.id &&
                (!editarSeleccionAnuncio.includes(anuncio.id) ? (
                  <div className="pieSuperadministradorSeleccioadoAdministradores">
                    <button type="button" onClick={() => editarAnuncio(anuncio.id)} className="botonPieSuperadministradorSeleccioadoAdministradores">
                      Editar
                    </button>
                    <button type="button" onClick={() => eliminarAnuncio(anuncio.id)} className="botonPieSuperadministradorSeleccioadoAdministradores">
                      Eliminar
                    </button>
                  </div>
                ) : (
                  <div className="pieSuperadministradorSeleccioadoAdministradores">
                    <button type="button" onClick={() => cancelarEditarAnuncio(anuncio.id)} className="botonPieSuperadministradorSeleccioadoAdministradores">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="botonPieSuperadministradorSeleccioadoAdministradores"
                      onClick={() => {
                        actualizarAnuncio(anuncio.id);
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
    case 6:
      contenido = <AdministradorCrearAnuncio />;
      break;
    default:
      contenido = (
        <>
          <h1 className="tituloAdministracionPrincipal">Anuncios</h1>
          <p className="parrafoAdministracionPrincipal">
            Bienvenido a la sección de anuncios. <br />
            Aquí podrás ver, modificar, eliminar y crear los anuncios, estos se asociarán a tu nombre y se eliminaran al pasar la fecha de expiración. <br />A continuación, en la parte superior de la página encontraras el acceso a el control de anuncios y al formulario de creación.
          </p>
        </>
      );
  }

  return <>{contenido}</>;
}

export default AdministradorAnuncio;
