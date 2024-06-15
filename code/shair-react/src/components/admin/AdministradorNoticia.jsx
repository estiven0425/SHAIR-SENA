import React, { useState, useEffect, useContext } from "react";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import AdministradorCrearNoticia from "./AdministradorCrearNoticia";
import axios from "axios";

function AdministradorNoticia() {
  const [noticia, setNoticia] = useState([]);
  const administracion = useContext(AdministracionContexto);
  const subSeccion = administracion.subSeccion;

  useEffect(() => {
    const leerNoticia = async () => {
      try {
        const respuesta = await axios.get("http://localhost:5000/noticia");

        setNoticia(respuesta.data);
      } catch (error) {
        console.error("Error al obtener noticias: ", error);
      }
    };

    leerNoticia();
  }, [subSeccion]);

  let contenido;

  switch (subSeccion) {
    case 3:
      contenido = (
        <>
          {noticia.map((noticia) => (
            <div key={noticia.id} className="subContenedorNoticia">
              <h2>{noticia.nombre}</h2>
              <article className="articuloSubContenedorNoticia">
                <div className="informacionArticuloSubContenedorNoticia">
                  <div className="principalInformacionArticuloSubContenedorNoticia">
                    <p>{noticia.enunciado}</p>
                  </div>
                  <div className="secundariaInformacionArticuloSubContenedorNoticia">
                    <p>
                      <span>Lugar: </span>
                      {noticia.lugar}
                    </p>
                    <p>
                      <span>Desde: </span>
                      {new Date(noticia.fecha_inicio).toLocaleDateString()}
                    </p>
                    <p>
                      <span>Hasta: </span>
                      {new Date(noticia.fecha_fin).toLocaleDateString()}
                    </p>
                    <p>
                      <span>Organiza: </span>
                      {noticia.Administrador.nombre}
                    </p>
                    <p>
                      <span>Más información: </span>
                      {noticia.mas_informacion}
                    </p>
                  </div>
                </div>
                <div className="imagenArticuloSubContenedorNoticia">
                  <img src={`http://localhost:5000/${noticia.archivo_adjunto}`} alt="Imagen no disponible" />
                </div>
              </article>
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
