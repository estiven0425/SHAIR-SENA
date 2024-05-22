import React, { useState } from "react";
import './styles/formulario.css';
import FormularioContexto from "../../contexts/FormularioContexto";
import FormularioRenderizado from "../../utils/admin/controllers/FormularioRenderizado";

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