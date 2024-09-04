// PÁGINA DEL FORMULARIO
// ---------- Importaciones ----------
import React, { useState } from "react";
import { motion } from "framer-motion";
import FormularioContexto from "../../contexts/FormularioContexto";
import FormularioRenderizado from "../../utils/admin/controllers/FormularioRenderizado";
import "./styles/formulario.css";
// ---------- Componente ----------
function Formulario() {
  // ---------- Estados ----------
  const [formulario, setFormulario] = useState(0);
  const [valorEmail, setValorEmail] = useState("");
  const [valorContraseña, setValorContraseña] = useState("");
  const formularioEstado = {
    formulario,
    setFormulario,
    valorEmail,
    setValorEmail,
    valorContraseña,
    setValorContraseña,
  };
  // ---------- Respuesta del proceso ----------
  return (
    <motion.main id="formularioPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      <FormularioContexto.Provider value={formularioEstado}>
        <FormularioRenderizado />
      </FormularioContexto.Provider>
    </motion.main>
  );
}
// ---------- Exportación del componente ----------
export default Formulario;
