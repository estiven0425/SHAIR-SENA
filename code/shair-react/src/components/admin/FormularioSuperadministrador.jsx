import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FormularioContexto from "../../contexts/FormularioContexto";
import '../../pages/admin/styles/formulario.css';

function FormularioSuperadministrador() {
    const formulario = useContext(FormularioContexto);
    const setFormulario = formulario.setFormulario;
    const setValorEmail = formulario.setValorEmail;
    const setValorContraseña = formulario.setValorContraseña;

    const enviarFormularioSuperadministrador = e => {
        e.preventDefault();
    }

    return (
        <article className="tarjetaFormulario">
            <header className="tarjetaFormularioCabecera">
                <h1>Superadministrador</h1>
            </header>

            <main className="tarjetaFormularioCuerpo">
                <form className="tarjetaFormularioCuerpoFormulario">
                    <fieldset className="tarjetaFormularioCuerpoFormularioGrupo">
                        <label htmlFor="email">E-mail:</label>

                        <input className="tarjetaFormularioCuerpoFormularioGrupoInput" type="email" name="email" id="email" defaultValue={formulario.valorEmail} onChange={(e) => setValorEmail(e.target.value)} />
                    </fieldset>
                    <fieldset className="tarjetaFormularioCuerpoFormularioGrupo">
                        <label htmlFor="contraseña">Contraseña:</label>

                        <input className="tarjetaFormularioCuerpoFormularioGrupoInput" type="password" name="contraseña" id="contraseña" value={formulario.contraseña} onChange={(e) => setValorContraseña(e.target.value)} />
                    </fieldset>
                </form>
            </main>

            <footer className="tarjetaFormularioPie">
                <button className="tarjetaFormularioPieBoton" type="button" onClick={() => setFormulario(0)}>Volver</button>
                <Link className="tarjetaFormularioPieBoton" to="/administracion/superadministrador">Acceder</Link>
            </footer>
        </article>
    );
}

export default FormularioSuperadministrador;