// BARRA DE NAVEGACIÓN
// ---------- Importaciones ----------
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// ---------- Componente ----------
function BarraDeNavegacion() {
  // ---------- Respuesta del proceso ----------
  return (
    <>
      <motion.section className="seccionRecomendacionHeader seccionAlternativaRecomendacionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        <nav className="navegacionSeccionRecomendacionHeader">
          <h1>Recomendación</h1>
        </nav>
      </motion.section>
      <motion.section className="seccionRecomendacionHeader">
        <nav className="navegacionSeccionRecomendacionHeader navegacionAlternativaSeccionRecomendacionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <Link to="/" id="enlaceNavegacionSeccionRecomendacionHeader">
            Volver a la página principal
          </Link>
        </nav>
      </motion.section>
    </>
  );
}
// ---------- Exportación del componente ----------
export default BarraDeNavegacion;
