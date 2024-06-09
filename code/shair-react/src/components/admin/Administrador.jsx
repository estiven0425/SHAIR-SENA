import React, { useEffect, useContext } from "react";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import AdministradorNoticia from "./AdministradorNoticia";
import AdministradorAnuncio from "./AdministradorAnuncio";
import AdministradorRecomendacion from "./AdministradorRecomendacion";

function Administrador() {
  const administracion = useContext(AdministracionContexto);
  const seccion = administracion.seccion;
  const setSeccion = administracion.setSeccion;

  useEffect(() => {
    setSeccion(2);
  }, []);

  let contenidoSeccion;

  switch (seccion) {
    case 3:
      contenidoSeccion = <AdministradorNoticia />;
      break;
    case 4:
      contenidoSeccion = <AdministradorAnuncio />;
      break;
    case 5:
      contenidoSeccion = <AdministradorRecomendacion />;
      break;
    default:
      contenidoSeccion = (
        <>
          <h1 className="tituloAdministracionPrincipal">¡Hola Estiven Montoya!</h1>
          <p className="parrafoAdministracionPrincipal">
            Bienvenido a SHAIR, un noticiero del SENA. <br />
            En el podrás promocionar tus eventos de manera sencilla y eficaz. <br />
            Publicar anuncios temporales y ver las recomendaciones realizadas por aprendices. <br />
            A continuación, en la parte superior de la página, podrás ver las secciones disponibles. <br />
            No dudes en acceder a ellas para obtener más información.
          </p>
        </>
      );
      break;
  }

  return <>{contenidoSeccion}</>;
}

export default Administrador;
