// ADMINISTRADOR
// ---------- Importaciones ----------
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import AdministradorAnuncio from "./AdministradorAnuncio";
import AdministradorNoticia from "./AdministradorNoticia";
import AdministradorRecomendacion from "./AdministradorRecomendacion";
// ---------- Componente ----------
function Administrador() {
  // ---------- Estados y contexto ----------
  const administracion = useContext(AdministracionContexto);
  const [administrador, setAdministrador] = useState("");
  const seccion = administracion.seccion;
  const setSeccion = administracion.setSeccion;
  // ---------- Obtención de información de inicio de sesión ----------
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ---------- Validación de estado ----------
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
          <motion.h1 className="tituloAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            ¡Hola {administrador}!
          </motion.h1>
          <motion.p className="parrafoAdministracionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            Bienvenido a SHAIR, un noticiero del SENA. <br />
            En el podrás promocionar tus eventos de manera sencilla y eficaz. <br />
            Publicar anuncios temporales y ver las recomendaciones realizadas por aprendices. <br />
            A continuación, en la parte superior de la página, podrás ver las secciones disponibles. <br />
            No dudes en acceder a ellas para obtener más información.
          </motion.p>
        </>
      );
      break;
  }
  // ---------- Respuesta del proceso ----------
  return <>{contenidoSeccion}</>;
}
// ---------- Exportación del componente ----------
export default Administrador;
