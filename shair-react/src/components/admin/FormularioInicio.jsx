// FORMULARIO DE BIENVENIDA
// ---------- Importaciones ----------
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FormularioContexto from "../../contexts/FormularioContexto";
import "../../pages/admin/styles/formulario.css";
// ---------- Componente ----------
function FormularioInicio() {
  // ---------- Estados y contextos ----------
  const formulario = useContext(FormularioContexto);
  const setFormulario = formulario.setFormulario;
  // ---------- Formulario de bienvenida ----------
  return (
    <motion.article
      className="tarjetaFormulario"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <header className="tarjetaFormularioCabecera">
        <h1>
          SHAIR
          <br />
          te da la bienvenida
        </h1>
      </header>
      <main className="tarjetaFormularioCuerpo tarjetaFormularioCuerpoAlternativo">
        <p>¿Cómo deseas acceder?</p>
      </main>
      <footer className="tarjetaFormularioPie tarjetaFormularioPieAlternativa">
        <button
          className="tarjetaFormularioPieBoton tarjetaFormularioPieBotonAlternativo"
          type="button"
          onClick={() => setFormulario(1)}
        >
          Superadministrador
        </button>
        <button
          className="tarjetaFormularioPieBoton tarjetaFormularioPieBotonAlternativo"
          type="button"
          onClick={() => setFormulario(2)}
        >
          Administrador
        </button>
        <Link to="/" id="enlaceTarjetaFormularioPieBoton">
          Volver
        </Link>
      </footer>
    </motion.article>
  );
}
// ---------- Exportación del componente ----------
export default FormularioInicio;
