import React, { useContext } from "react";
import FormularioContexto from "../../contexts/FormularioContexto";
import '../../pages/admin/styles/formulario.css';
import { Link } from "react-router-dom";

function FormularioInicio() {
    const formulario = useContext(FormularioContexto);
    const setFormulario = formulario.setFormulario;

    return (
        <article className="tarjetaFormulario">
            <header className="tarjetaFormularioCabecera">
                <h1>SHAIR<br />te da la bienvenida</h1>
            </header>

            <main className="tarjetaFormularioCuerpo tarjetaFormularioCuerpoAlternativo">
                <p>¿Cómo deseas acceder?</p>
            </main>

            <footer className="tarjetaFormularioPie tarjetaFormularioPieAlternativa">
                <button className="tarjetaFormularioPieBoton tarjetaFormularioPieBotonAlternativo" type="button" onClick={() => setFormulario(1)}>Superadministrador</button>
                <button className="tarjetaFormularioPieBoton tarjetaFormularioPieBotonAlternativo" type="button" onClick={() => setFormulario(2)}>Administador</button>
                <Link to="/" id="enlaceTarjetaFormularioPieBoton">Volver</Link>
            </footer>
        </article>
    );
}

export default FormularioInicio;