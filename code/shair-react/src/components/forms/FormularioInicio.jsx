import React from "react";
import { useContext } from "react";
import FormularioContexto from "../../context/FormularioContexto";
import '../../pages/admin/styles/Formulario.css';

function FormularioInicio() {
    const formulario = useContext(FormularioContexto);
    const setFormulario = formulario.setFormulario;

    return (
        <div className="tarjetaFormulario">
            <header className="tarjetaFormularioCabecera">
                <h1>SHAIR<br />te da la bienvenida</h1>
            </header>

            <main className="tarjetaFormularioCuerpo tarjetaFormularioCuerpoAlternativo">
                <p>¿Cómo deseas acceder?</p>
            </main>
            
            <footer className="tarjetaFormularioPie tarjetaFormularioPieAlternativa">
                <button className="tarjetaFormularioPieBoton tarjetaFormularioPieBotonAlternativo" type="button" onClick={() => setFormulario(1)}>Superadministrador</button>
                <button className="tarjetaFormularioPieBoton tarjetaFormularioPieBotonAlternativo" type="button" onClick={() => setFormulario(2)}>Administador</button>
            </footer>
        </div>
    );
}

export default FormularioInicio;