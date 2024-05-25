import React from "react";
import BarraDeNavegacion from "../../components/home/BarraDeNavegacion";
import FormularioRecomendacion from "../../components/home/FormularioRecomendacion";
import './styles/recomendacion.css';

function Recomendacion() {
    return (
        <>
            <header id="recomendacionHeader">
                <BarraDeNavegacion />
            </header>
            <main id="recomendacionPrincipal">
                <FormularioRecomendacion />
            </main>
        </>
    );
}

export default Recomendacion;