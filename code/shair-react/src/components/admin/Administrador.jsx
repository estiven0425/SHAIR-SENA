import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import AdministradorNoticia from "./AdministradorNoticia";
import AdministradorAnuncio from "./AdministradorAnuncio";
import AdministradorRecomendacion from "./AdministradorRecomendacion";

function Administrador() {
  const administracion = useContext(AdministracionContexto);
  const [administrador, setAdministrador] = useState("");
  const seccion = administracion.seccion;
  const setSeccion = administracion.setSeccion;

  useEffect(() => {
    setSeccion(2);

    const token = sessionStorage.getItem("token");
    const obtenerSuperadministrador = async () => {
      try {
        const respuesta = await axios.post("http://localhost:5000/administradorlogin/inicio", {
          token: token,
        });

        setAdministrador(respuesta.data.nombre);
      } catch (error) {
        console.error("Error al obtener el superadministrador:", error);
      }
    };
    obtenerSuperadministrador();

    return () => {
      sessionStorage.removeItem("token");
    };
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
          <h1 className="tituloAdministracionPrincipal">¡Hola {administrador}!</h1>
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
