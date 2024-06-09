import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FormularioContexto from "../../../contexts/FormularioContexto";
import FormularioInicio from "../../../components/admin/FormularioInicio";
import FormularioSuperadministrador from "../../../components/admin/FormularioSuperadministrador";
import FormularioAdministrador from "../../../components/admin/FormularioAdministrador";
import "../styles/formularioRenderizado.css";

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
const transicionPagina = {
  type: "tween",
  duration: 0.25,
};

function FormularioRenderizado() {
  const formulario = useContext(FormularioContexto);

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

  return (
    <AnimatePresence mode="wait">
      <motion.section key={formulario.formulario} initial="initial" animate="in" exit="out" variants={varianteAnimacion} transition={transicionPagina} id="formularioTransicion">
        {formularioRenderizado}
      </motion.section>
    </AnimatePresence>
  );
}

export default FormularioRenderizado;
