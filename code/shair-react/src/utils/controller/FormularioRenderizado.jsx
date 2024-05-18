import React from "react";
import { useContext } from "react";
import FormularioContexto from "../../context/FormularioContexto";
import FormularioInicio from "../../components/forms/FormularioInicio";
import FormularioSuperadministrador from "../../components/forms/FormularioSuperadministrador";
import FormularioAdministrador from "../../components/forms/FormularioAdministrador";

function FormularioRenderizado() {
    const formulario = useContext(FormularioContexto);

    let formularioRenderizado;

    switch (formulario.formulario) {
        case 0:
            formularioRenderizado = <FormularioInicio />
            break;
        case 1:
            formularioRenderizado = <FormularioSuperadministrador />
            break;
        case 2:
            formularioRenderizado = <FormularioAdministrador />
            break;
        default:
            formularioRenderizado = <FormularioInicio />
    }

    return (
        <>
            {formularioRenderizado}
        </>
    )
}

export default FormularioRenderizado;