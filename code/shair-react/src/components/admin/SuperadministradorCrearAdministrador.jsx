import React, { useState } from "react";
import axios from 'axios';

function SuperadministradorCrearAdministrador() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [telefono, setTelefono] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [enviado, setEnviado] = useState(false);

    const crearAdministrador = async e => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/administrador', {
                nombre: nombre,
                email: email,
                celular: celular,
                telefono: telefono == "" ? null : telefono,
                contraseña: contraseña,
            });

            setEnviado(true);

        } catch (error) {
            console.error('Error al crear el administrador: ', error);
        }
    }

    const reiniciarFormulario = () => {
        setNombre("");
        setEmail("");
        setCelular("");
        setTelefono("");
        setContraseña("");
        setEnviado(false);
    }

    return (
        <>
            {enviado == true ? (
                <>
                    <div id="alertaSuperadministradorCrearAdministrador">
                        <h1>Administrador creado con éxtio</h1>
                        <p>Ve a la sección de administradores para ver, editar y eliminar los administradores.</p>
                        <button type="button" onClick={reiniciarFormulario}>Crear otro administrador</button>
                    </div>
                </>
            ) : (
                <form id="formularioSuperadministradorCrearAdministrador" onSubmit={crearAdministrador}>
                    <section className="seccionFormularioSuperadministradorCrearAdministrador">
                        <fieldset className="subSeccionFormularioSuperadministradorCrearAdministrador">
                            <label htmlFor="nombre">Nombre*:</label>
                            <input type="text" name="nombre" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                        </fieldset>
                        <fieldset className="subSeccionFormularioSuperadministradorCrearAdministrador">
                            <label htmlFor="email">Email*:</label>
                            <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </fieldset>
                        <fieldset className="subSeccionFormularioSuperadministradorCrearAdministrador">
                            <label htmlFor="celular">Celular*:</label>
                            <input type="number" name="celular" id="celular" value={celular} onChange={e => setCelular(e.target.value)} />
                        </fieldset>
                        <fieldset className="subSeccionFormularioSuperadministradorCrearAdministrador">
                            <label htmlFor="telefono">Teléfono:</label>
                            <input type="number" name="telefono" id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)} />
                        </fieldset>
                        <fieldset className="subSeccionFormularioSuperadministradorCrearAdministrador">
                            <label htmlFor="contraseña">Contraseña*:</label>
                            <input type="password" name="contraseña" id="contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} />
                        </fieldset>
                    </section>
                    <section className="seccionFormularioSuperadministradorCrearAdministrador seccionAlternativaFormularioSuperadministradorCrearAdministrador">
                        <button type="submit" className="botonSeccionAlternativaFormularioSuperadministradorCrearAdministrador">Crear administrador</button>
                        <p>Los campos con <span>*</span> son obligatorios.</p>
                    </section>
                </form>)}
        </>
    )
}

export default SuperadministradorCrearAdministrador;