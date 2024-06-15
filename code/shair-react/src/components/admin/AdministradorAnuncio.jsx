import React, { useState, useEffect, useContext } from "react";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import AdministradorCrearAnuncio from "./AdministradorCrearAnuncio";
import axios from "axios";

function AdministradorAnuncio() {
  const [anuncio, setAnuncio] = useState([]);
  const administracion = useContext(AdministracionContexto);
  const subSeccion = administracion.subSeccion;

  useEffect(() => {
    const leerAnuncio = async () => {
      try {
        const respuesta = await axios.get("http://localhost:5000/anuncio");

        setAnuncio(respuesta.data);
      } catch (error) {
        console.error("Error al obtener anuncios: ", error);
      }
    };

    leerAnuncio();
  }, [subSeccion]);

  let contenido;

  switch (subSeccion) {
    case 5:
      contenido = (
        <>
          {anuncio.map((anuncio) => (
            <article key={anuncio.id} className="articuloContenidoSliderAnuncio">
              <div className="informacionArticuloContenidoSliderAnuncio">
                <div className="principalInformacionArticuloContenidoSliderAnuncio">
                  <h2>{anuncio.nombre}</h2>
                  <p>{anuncio.enunciado}</p>
                </div>
                <div className="secundariaInformacionArticuloContenidoSliderAnuncio">
                  <p>
                    <span>Más información: </span>
                    {anuncio.mas_informacion}
                  </p>
                </div>
              </div>
              <div className="imagenArticuloContenidoSliderAnuncio">
                <img src={`http://localhost:5000/${anuncio.archivo_adjunto}`} alt="Imagen no disponible" />
              </div>
            </article>
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
