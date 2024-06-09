import React, { useState, useEffect, useContext } from "react";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import axios from "axios";

function AdministradorRecomendacion() {
  const [recomendacion, setRecomendacion] = useState([]);
  const administracion = useContext(AdministracionContexto);
  const subSeccion = administracion.subSeccion;

  useEffect(() => {
    const leerRecomendacion = async () => {
      try {
        const respuesta = await axios.get("http://localhost:5000/recomendacion");
        setRecomendacion(respuesta.data);
      } catch (error) {
        console.error("Error al obtener anuncios: ", error);
      }
    };

    leerRecomendacion();
  }, []);

  let contenido;

  switch (subSeccion) {
    case 7:
      contenido = (
        <>
          {recomendacion.map((recomendacion) => (
            <article key={recomendacion.id} className="articuloContenidoSliderRecomendacion">
              <div className="informacionArticuloContenidoSliderRecomendacion">
                <div className="principalInformacionArticuloContenidoSliderRecomendacion">
                  <h2>{recomendacion.nombre}</h2>
                  <p>{recomendacion.enunciado}</p>
                </div>
              </div>
              <div className="imagenArticuloContenidoSliderRecomendacion">
                <img src={`http://localhost:5000/${recomendacion.archivo_adjunto}`} alt="Imagen no disponible" />
              </div>
            </article>
          ))}
        </>
      );
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

export default AdministradorRecomendacion;
