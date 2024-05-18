import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FormularioContexto from "../../context/FormularioContexto";
import FormularioInicio from "../../components/forms/FormularioInicio";
import FormularioSuperadministrador from "../../components/forms/FormularioSuperadministrador";
import FormularioAdministrador from "../../components/forms/FormularioAdministrador";
import '../styles/transicion.css';

const animacionDerecha = {
    initial: {
        opacity: 0,
        rotateY: 90
    },
    in: {
        opacity: 1,
        rotateY: 0
    },
    out: {
        opacity: 0,
        rotateY: 90
    }
};
const animacionIzquierda = {
    initial: {
        opacity: 0,
        rotateY: -90
    },
    in: {
        opacity: 1,
        rotateY: 0
    },
    out: {
        opacity: 0,
        rotateY: -90
    }
};
const transicionPagina = {
    type: "tween",
    duration: 0.25
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

    const varianteAnimacion = formulario.formulario == 0 ? animacionIzquierda : animacionDerecha;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={formulario.formulario}
                initial="initial"
                animate="in"
                exit="out"
                variants={varianteAnimacion}
                transition={transicionPagina}
                id="formularioTransicion"
            >
                {formularioRenderizado}
            </motion.div>
        </AnimatePresence>
    );
}

export default FormularioRenderizado;