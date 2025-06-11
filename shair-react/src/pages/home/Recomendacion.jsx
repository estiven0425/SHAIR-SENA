// PÁGINA DE RECOMENDACIONES
// ---------- Importaciones ----------
import React from "react";
import { motion } from "framer-motion";
import BarraDeNavegacion from "../../components/home/BarraDeNavegacion";
import FormularioRecomendacion from "../../components/home/FormularioRecomendacion";
import "./styles/recomendacion.css";
// ---------- Componente ----------
function Recomendacion() {
  // ---------- Respuesta del proceso ----------
  return (
    <>
      <motion.header
        id="recomendacionHeader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <BarraDeNavegacion />
      </motion.header>
      <motion.main
        id="recomendacionPrincipal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <FormularioRecomendacion />
      </motion.main>
    </>
  );
}
// ---------- Exportación del componente ----------
export default Recomendacion;
