import React, { useState } from "react";
import { motion } from 'framer-motion';
import FormularioContexto from "../../contexts/FormularioContexto";
import FormularioRenderizado from "../../utils/admin/controllers/FormularioRenderizado";
import './styles/formulario.css';

function Formulario() {
    const [formulario, setFormulario] = useState(0);
    const [valorEmail, setValorEmail] = useState("");
    const formularioEstado = {
        formulario,
        setFormulario,
        valorEmail,
        setValorEmail
    }

    return (
        <motion.main
            id="formularioPrincipal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}>
            <FormularioContexto.Provider value={formularioEstado}>
                <FormularioRenderizado />
            </FormularioContexto.Provider>
        </motion.main>
    );
}

export default Formulario;