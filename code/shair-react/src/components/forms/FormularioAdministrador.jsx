import React from "react";
import { useContext } from "react";
import FormularioContexto from "../../context/FormularioContexto";
import '../../pages/admin/styles/Formulario.css';

function FormularioAdministrador() {
    const formulario = useContext(FormularioContexto);
    const setFormulario = formulario.setFormulario;

    return (
        <div className="tarjetaFormulario">
            <header className="tarjetaFormularioCabecera">
                <h1>Administrador</h1>
            </header>

            <main className="tarjetaFormularioCuerpo">
                <form className="tarjetaFormularioCuerpoFormulario">
                    <fieldset className="tarjetaFormularioCuerpoFormularioGrupo">
                        <label htmlFor="email">E-mail:</label>

                        <input className="tarjetaFormularioCuerpoFormularioGrupoInput" type="email" name="email" id="email" />
                    </fieldset>
                    <fieldset className="tarjetaFormularioCuerpoFormularioGrupo">
                        <label htmlFor="contraseña">Contraseña:</label>

                        <input className="tarjetaFormularioCuerpoFormularioGrupoInput" type="password" name="contraseña" id="contraseña" />
                    </fieldset>
                </form>
            </main>
            
            <footer className="tarjetaFormularioPie">
                <button className="tarjetaFormularioPieBoton" type="button" onClick={() => setFormulario(0)}>Volver</button>
                <button className="tarjetaFormularioPieBoton" type="button" >Acceder</button>
            </footer>
        </div>
    );
}

export default FormularioAdministrador;