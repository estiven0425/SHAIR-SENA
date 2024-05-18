import React, { useState } from "react";
import './styles/Formulario.css';
import FormularioContexto from "../../context/FormularioContexto";
import FormularioRenderizado from "../../utils/controller/FormularioRenderizado";

function Formulario() {
    const [formulario, setFormulario] = useState(0);
    const formularioEstado = {
        formulario,
        setFormulario
    }
    return (
        <section id="formularioPrincipal">
            <FormularioContexto.Provider value={formularioEstado}>
                <FormularioRenderizado />
            </FormularioContexto.Provider>
        </section>
    );
}

export default Formulario;