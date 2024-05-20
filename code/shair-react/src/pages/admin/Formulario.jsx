import React, { useState } from "react";
import './styles/Formulario.css';
import FormularioContexto from "../../context/FormularioContexto";
import FormularioRenderizado from "../../utils/controller/FormularioRenderizado";

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
        <main id="formularioPrincipal">
            <FormularioContexto.Provider value={formularioEstado}>
                <FormularioRenderizado />
            </FormularioContexto.Provider>
        </main>
    );
}

export default Formulario;