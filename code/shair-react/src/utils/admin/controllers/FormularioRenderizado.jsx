// CONTROLADOR DEL FORMULARIO
// ---------- Importaciones ----------
import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FormularioAdministrador from "../../../components/admin/FormularioAdministrador";
import FormularioContexto from "../../../contexts/FormularioContexto";
import FormularioInicio from "../../../components/admin/FormularioInicio";
import FormularioSuperadministrador from "../../../components/admin/FormularioSuperadministrador";
import "../styles/formularioRenderizado.css";
// ---------- Animación derecha ----------
const animacionDerecha = {
  initial: {
    opacity: 0,
    rotateY: 90,
  },
  in: {
    opacity: 1,
    rotateY: 0,
  },
  out: {
    opacity: 0,
    rotateY: 90,
  },
};
// ---------- Animación izquierda ----------
const animacionIzquierda = {
  initial: {
    opacity: 0,
    rotateY: -90,
  },
  in: {
    opacity: 1,
    rotateY: 0,
  },
  out: {
    opacity: 0,
    rotateY: -90,
  },
};
// ---------- Transición ----------
const transicionPagina = {
  type: "tween",
  duration: 0.25,
};
// ---------- Componente ----------
function FormularioRenderizado() {
  // ---------- Contextos ----------
  const formulario = useContext(FormularioContexto);
  // ---------- Validación de contextos ----------
  let formularioRenderizado;

  switch (formulario.formulario) {
    case 0:
      formularioRenderizado = <FormularioInicio />;
      break;
    case 1:
      formularioRenderizado = <FormularioSuperadministrador />;
      break;
    case 2:
      formularioRenderizado = <FormularioAdministrador />;
      break;
    default:
      formularioRenderizado = <FormularioInicio />;
  }

  const varianteAnimacion = formulario.formulario === 0 ? animacionIzquierda : animacionDerecha;
  // ---------- Respuesta del proceso ----------
  return (
    <AnimatePresence mode="wait">
      <motion.section key={formulario.formulario} initial="initial" animate="in" exit="out" variants={varianteAnimacion} transition={transicionPagina} id="formularioTransicion">
        {formularioRenderizado}
      </motion.section>
    </AnimatePresence>
  );
}
// ---------- Exportación del componente ----------
export default FormularioRenderizado;
