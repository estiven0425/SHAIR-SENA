import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function SuperadministradorAdministradores() {
    const [administrador, setAdministrador] = useState([]);
    const [seleccionAdministrador, setSeleccionAdministrador] = useState(null);
    const [editarSeleccionAdministrador, setEditarSeleccionAdministrador] = useState(false);
    const [nombreAdministrador, setNombreAdministrador] = useState("");
    const [emailAdministrador, setEmailAdministrador] = useState("");
    const [celularAdministrador, setCelularAdministrador] = useState("");
    const [telefonoAdministrador, setTelefonoAdministrador] = useState("");
    const seleccionadoAdministrador = useRef(null);

    useEffect(() => {
        const leerAdministrador = async () => {
            try {
                const respuesta = await axios.get('http://localhost:5000/administrador');
                setAdministrador(respuesta.data);
            } catch (error) {
                console.error('Error al obtener administradores: ', error);
            }
        };

        leerAdministrador();
    }, []);
    useEffect(() => {
        const deseleccionarAdministrador = (event) => {
            if (seleccionadoAdministrador.current && !seleccionadoAdministrador.current.contains(event.target)) {
                setSeleccionAdministrador(null);
                setEditarSeleccionAdministrador(false);
            }
        };

        document.addEventListener("mousedown", deseleccionarAdministrador);

        return () => {
            document.removeEventListener("mousedown", deseleccionarAdministrador);
        };
    }, [seleccionadoAdministrador]);

    const seleccionarAdministrador = (id_administrador) => {
        setSeleccionAdministrador(id_administrador);
    }
    const editarAdministrador = (id_administrador) => {
        setEditarSeleccionAdministrador(editarSeleccionAdministrador == false ? true : false);
    };
    const eliminarAdministrador = (id_administrador) => {
        console.log("Eliminar administrador:", id_administrador);
    };
    const actualizarAdministrador = async () => {
        try {
            await axios.put(`http://localhost:5000/administrador`, {
                id_administrador: seleccionAdministrador,
                nombre: nombreAdministrador,
                email: emailAdministrador,
                celular: celularAdministrador,
                telefono: telefonoAdministrador
            });

            setAdministrador(administrador.map(administrador =>
                administrador.id_administrador == seleccionAdministrador
                    ? { ...administrador, nombre: nombreAdministrador, email: emailAdministrador, celular: celularAdministrador, telefono: telefonoAdministrador }
                    : administrador
            ));
            setEditarSeleccionAdministrador(false);
        } catch (error) {
            console.error('Error al actualizar el administrador:', error);
        }
    };

    return (
        <>
            {administrador.map(administrador => (
                <div
                    key={administrador.id_administrador}
                    className={seleccionAdministrador == administrador.id_administrador ? "superadministradorSeleccioadoAdministradores" : "superadministradorAdministradores"}
                    onClick={() => seleccionarAdministrador(administrador.id_administrador)}
                    ref={seleccionAdministrador == administrador.id_administrador ? seleccionadoAdministrador : null}
                >
                    <form className={editarSeleccionAdministrador == true ? "articuloSuperadministradorAdministradores  articuloAlternativoSuperadministradorAdministradores" : "articuloSuperadministradorAdministradores"}>
                        <input type="text" name="nombreArticuloSuperadministradorAdministradores" id={editarSeleccionAdministrador == true ? "nombreArticuloAlternativoSuperadministradorAdministradores" : "nombreArticuloSuperadministradorAdministradores"} disabled={seleccionAdministrador != administrador.id_administrador} value={nombreAdministrador != "" ? nombreAdministrador : setNombreAdministrador(administrador.nombre)} onChange={e => { setNombreAdministrador(e.target.value) }} />
                        <fieldset>
                            <h2>E-mail:</h2>
                            <input type="text" name="emailArticuloSuperadministradorAdministradores" id="emailArticuloSuperadministradorAdministradores" disabled={seleccionAdministrador != administrador.id_administrador} value={emailAdministrador != "" ? emailAdministrador : setEmailAdministrador(administrador.email)} onChange={e => { setEmailAdministrador(e.target.value) }} />
                        </fieldset>
                        <fieldset>
                            <h2>Celular:</h2>
                            <input type="text" name="celularArticuloSuperadministradorAdministradores" id="celularArticuloSuperadministradorAdministradores" disabled={seleccionAdministrador != administrador.id_administrador} value={celularAdministrador != "" ? celularAdministrador : setCelularAdministrador(administrador.celular)} onChange={e => { setCelularAdministrador(e.target.value) }} />
                        </fieldset>
                        <fieldset>
                            <h2>Teléfono:</h2>
                            <input type="text" name="telefonoArticuloSuperadministradorAdministradores" id="telefonoArticuloSuperadministradorAdministradores" disabled={seleccionAdministrador != administrador.id_administrador} value={telefonoAdministrador != "" ? telefonoAdministrador : setTelefonoAdministrador(administrador.telefono)} onChange={e => { setTelefonoAdministrador(e.target.value) }} />
                        </fieldset>
                        <fieldset>
                            <h2>Fecha de modificación:</h2>
                            <input type="text" name="fechaCreacionArticuloSuperadministradorAdministradores" id="fechaCreacionArticuloSuperadministradorAdministradores" disabled defaultValue={new Date(administrador.fecha_creacion).toLocaleDateString()} />
                        </fieldset>
                    </form>
                    {seleccionAdministrador == administrador.id_administrador && (
                        editarSeleccionAdministrador == false ? (
                            <div className="pieSuperadministradorSeleccioadoAdministradores">
                                <button type="button" onClick={() => editarAdministrador(administrador.id_administrador)} className="botonPieSuperadministradorSeleccioadoAdministradores">Editar</button>
                                <button type="button" onClick={() => eliminarAdministrador(administrador.id_administrador)} className="botonPieSuperadministradorSeleccioadoAdministradores">Eliminar</button>
                                <button type="button" className="botonPieSuperadministradorSeleccioadoAdministradores">Noticias</button>
                            </div>) : (
                            <div className="pieSuperadministradorSeleccioadoAdministradores">
                                <button type="button" onClick={() => editarAdministrador(administrador.id_administrador)} className="botonPieSuperadministradorSeleccioadoAdministradores">Cancelar</button>
                                <button type="submit" className="botonPieSuperadministradorSeleccioadoAdministradores" onClick={() => { actualizarAdministrador(administrador.id_administrador) }}>Guardar</button>
                            </div>
                        )
                    )}
                </div>
            ))}
        </>
    );
}

export default SuperadministradorAdministradores;
