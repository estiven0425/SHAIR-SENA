import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import AdministracionHeader from "../../components/admin/AdministracionHeader";
import "./styles/administracion.css";

function Administracion() {
  const [seccion, setSeccion] = useState(0);
  const [subSeccion, setSubSeccion] = useState(0);
  const seccionEstado = {
    seccion,
    setSeccion,
    subSeccion,
    setSubSeccion,
  };

  let estiloSeccion = "";
  let estiloFormularioSeccion = "";

  switch (subSeccion) {
    case 1:
      if (seccion === 1) {
        estiloSeccion = "administracionAlternativaPrincipal";
      } else {
        estiloSeccion = "administracionPrincipal";
      }
      break;
    case 3:
      if (seccion === 3) {
        estiloSeccion = "administracionAlternativaPrincipalAlternativa";
      } else {
        estiloSeccion = "administracionPrincipal";
      }
      break;
    case 5:
      if (seccion === 4) {
        estiloSeccion = "administracionAlternativaPrincipalAlternativa";
      } else {
        estiloSeccion = "administracionPrincipal";
      }
      break;
    case 7:
      if (seccion === 5) {
        estiloSeccion = "administracionAlternativaPrincipalAlternativa";
      } else {
        estiloSeccion = "administracionPrincipal";
      }
      break;
    default:
      estiloSeccion = "administracionPrincipal";
      break;
  }
  switch (subSeccion) {
    case 2:
      if (seccion === 1) {
        estiloSeccion = "administracionAlternativaPrincipal";
        estiloFormularioSeccion = "administracionAlternativaFormularioPrincipalAlternativa";
      } else {
        estiloFormularioSeccion = "";
      }
      break;
    case 4:
      if (seccion === 3) {
        estiloSeccion = "administracionAlternativaPrincipal";
        estiloFormularioSeccion = "administracionAlternativaFormularioPrincipalAlternativa";
      } else {
        estiloFormularioSeccion = "";
      }
      break;
    case 6:
      if (seccion === 4) {
        estiloSeccion = "administracionAlternativaPrincipal";
        estiloFormularioSeccion = "administracionAlternativaFormularioPrincipalAlternativa";
      } else {
        estiloFormularioSeccion = "";
      }
      break;
    default:
      estiloFormularioSeccion = "";
      break;
  }

  return (
    <>
      <AdministracionContexto.Provider value={seccionEstado}>
        <motion.header id="administracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <AdministracionHeader />
        </motion.header>
        <motion.main id={estiloSeccion} className={estiloFormularioSeccion} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <Outlet />
        </motion.main>
      </AdministracionContexto.Provider>
    </>
  );
}

export default Administracion;
