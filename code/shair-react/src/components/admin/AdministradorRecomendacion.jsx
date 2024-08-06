import React, { useState, useEffect, useRef, useContext } from "react";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import axios from "axios";

function AdministradorRecomendacion() {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [editarSeleccionRecomendacion, setEditarSeleccionRecomendacion] = useState([]);
  const [seleccionRecomendacion, setSeleccionRecomendacion] = useState(null);
  const seleccionadoRecomendacion = useRef(null);
  const administracion = useContext(AdministracionContexto);
  const subSeccion = administracion.subSeccion;

  useEffect(() => {
    const leerRecomendacion = async () => {
      try {
        const respuesta = await axios.get("http://localhost:5000/recomendacion");
        const recomendacionesTotales = respuesta.data;
        const recomendacionesFiltradas = recomendacionesTotales.filter((recomendacion) => recomendacion.aprobacion === 1);
        setRecomendaciones(recomendacionesFiltradas);
      } catch (error) {
        console.error("Error al obtener anuncios: ", error);
      }
    };

    leerRecomendacion();
  }, []);
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

  const seleccionarRecomendacion = (id) => {
    setSeleccionRecomendacion(id);
  };
  const eliminarRecomendacion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recomendacion`, {
        data: { id: id },
      });

      setRecomendaciones((prevState) => prevState.filter((anuncio) => anuncio.id !== id));
    } catch (error) {
      console.error("Error al eliminar la recomendación:", error);
    }
  };

  let contenido;

  switch (subSeccion) {
    case 7:
      contenido = (
        <>
          {recomendaciones.map((recomendacion) => (
            <div key={recomendacion.id} className={seleccionRecomendacion === recomendacion.id ? "AdministracionAlternativaContenidoSeleccionado" : "AdministracionAlternativaContenido"} onClick={() => seleccionarRecomendacion(recomendacion.id)} ref={seleccionRecomendacion === recomendacion.id ? seleccionadoRecomendacion : null}>
              <h2>{recomendacion.nombre}</h2>
              <article className="articuloAdministracionAlternativaContenido">
                <div className="articuloAdministracionAlternativaContenido0">
                  <p>{recomendacion.enunciado}</p>
                </div>
                <div className="articuloAdministracionAlternativaContenido1">
                  <div className="imagenArticuloAdministracionAlternativaContenido">
                    <img src={`http://localhost:5000/${recomendacion.archivo_adjunto}`} alt="Imagen no disponible" />
                  </div>
                </div>
              </article>
              {seleccionRecomendacion === recomendacion.id &&
                (!editarSeleccionRecomendacion.includes(recomendacion.id) ? (
                  <div className="pieAdministracionAlternativaContenidoSeleccionado">
                    <button type="button" onClick={() => eliminarRecomendacion(recomendacion.id)} className="botonPieAdministracionAlternativaContenidoSeleccionado">
                      Eliminar
                    </button>
                  </div>
                ) : (
                  <></>
                ))}
            </div>
          ))}
        </>
      );
      break;
    default:
      contenido = (
        <>
          <h1 className="tituloAdministracionPrincipal">Recomenadaciones</h1>
          <p className="parrafoAdministracionPrincipal">
            Bienvenido a la sección de recomendaciones. <br />
            Aquí podrás ver las recomendaciones que hacen los aprendices.
            <br />A continuación, en la parte superior de la página encontraras el acceso a las recomendaciones.
          </p>
        </>
      );
  }

  return <>{contenido}</>;
}

export default AdministradorRecomendacion;
