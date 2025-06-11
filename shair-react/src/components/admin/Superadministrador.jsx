// SUPERADMINISTRADOR
// ---------- Importaciones ----------
import React, { useEffect, useContext, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import SuperadministradorAdministradores from "./SuperadministradorAdministradores";
import SuperadministradorRecomendacion from "./SuperadministradorRecomendacion";
// ---------- Componente ----------
function Superadministrador() {
  // ---------- Estados y contextos ----------
  const administracion = useContext(AdministracionContexto);
  const seccion = administracion.seccion;
  const setSeccion = administracion.setSeccion;
  const subSeccion = administracion.subSeccion;

  const [superadministrador, setSuperadministrador] = useState("");

  const localIP = process.env.REACT_APP_LOCAL_IP;
  // ---------- Obtención de información de inicio de sesión ----------
  useEffect(() => {
    setSeccion(0);

    const token = sessionStorage.getItem("token");

    const obtenerSuperadministrador = async () => {
      try {
        const respuesta = await axios.post(
          `http://${localIP}:5000/superadministradorlogin/inicio`,
          {
            token: token,
          }
        );

        setSuperadministrador(respuesta.data.nombre);
      } catch (error) {
        console.error("Error al obtener el superadministrador:", error);
      }
    };
    obtenerSuperadministrador();

    return () => {
      sessionStorage.removeItem("token");
    };
  }, []);
  // ---------- Validación de estado ----------
  let contenidoSeccion;

  switch (seccion) {
    case 1:
      contenidoSeccion = <SuperadministradorAdministradores />;
      break;
    case 6:
      contenidoSeccion = <SuperadministradorRecomendacion />;
      break;
    default:
      contenidoSeccion = (
        <>
          <motion.h1
            className="tituloAdministracionPrincipal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            ¡Hola {superadministrador}!
          </motion.h1>
          <motion.p
            className="parrafoAdministracionPrincipal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            Bienvenido a la vista de superadministrador de SHAIR. <br />
            Aquí puedes gestionar a los demás administradores de la plataforma,
            ya sea crear nuevos administadores, modificarlos o eliminarlos.
          </motion.p>
        </>
      );
      break;
  }
  // ---------- Respuesta del proceso ----------
  return <>{contenidoSeccion}</>;
}
// ---------- Exportación del componente ----------
export default Superadministrador;
