import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function SuperadministradorAdministradores() {
    const [administradores, setAdministradores] = useState([]);
    const [seleccionAdministrador, setSeleccionAdministrador] = useState(null);
    const [editarSeleccionAdministrador, setEditarSeleccionAdministrador] = useState([]);
    const [nombresAdministradores, setNombresAdministradores] = useState([]);
    const [emailsAdministradores, setEmailsAdministradores] = useState([]);
    const [celularesAdministradores, setCelularesAdministradores] = useState([]);
    const [telefonosAdministradores, setTelefonosAdministradores] = useState([]);
    const seleccionadoAdministrador = useRef(null);

    useEffect(() => {
        const leerAdministrador = async () => {
            try {
                const respuesta = await axios.get('http://localhost:5000/administrador');

                setAdministradores(respuesta.data);

                const nombres = respuesta.data.map(admin => admin.nombre);
                const emails = respuesta.data.map(admin => admin.email);
                const celulares = respuesta.data.map(admin => admin.celular);
                const telefonos = respuesta.data.map(admin => admin.telefono || 'No asignado');

                setNombresAdministradores(nombres);
                setEmailsAdministradores(emails);
                setCelularesAdministradores(celulares);
                setTelefonosAdministradores(telefonos);
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
                setEditarSeleccionAdministrador([]);
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
        setEditarSeleccionAdministrador(prevState => {
            if (prevState.includes(id_administrador)) {
                return prevState.filter(id => id != id_administrador);
            } else {
                return [...prevState, id_administrador];
            }
        });
    };
    const cancelarEditarAdministrador = (id_administrador) => {
        const adminIndex = administradores.findIndex(admin => admin.id_administrador == id_administrador);
        const admin = administradores[adminIndex];

        setNombresAdministradores(prevState => {
            const newState = [...prevState];
            newState[adminIndex] = admin.nombre;
            return newState;
        });
        setEmailsAdministradores(prevState => {
            const newState = [...prevState];
            newState[adminIndex] = admin.email;
            return newState;
        });
        setCelularesAdministradores(prevState => {
            const newState = [...prevState];
            newState[adminIndex] = admin.celular;
            return newState;
        });
        setTelefonosAdministradores(prevState => {
            const newState = [...prevState];
            newState[adminIndex] = admin.telefono || 'No asignado';
            return newState;
        });
        setEditarSeleccionAdministrador(prevState => prevState.filter(id => id != id_administrador));
    };
    const validacionTelefono = (telefonoAdministrador) => {
        return isNaN(parseInt(telefonoAdministrador));
    }
    const actualizarAdministrador = async (id_administrador) => {
        const adminIndex = administradores.findIndex(admin => admin.id_administrador == id_administrador);
        
        try {
            await axios.put(`http://localhost:5000/administrador`, {
                id_administrador: id_administrador,
                nombre: nombresAdministradores[adminIndex],
                email: emailsAdministradores[adminIndex],
                celular: celularesAdministradores[adminIndex],
                telefono: validacionTelefono(telefonosAdministradores[adminIndex]) == false ? telefonosAdministradores[adminIndex] : null,
            });

            setEditarSeleccionAdministrador(prevState => prevState.filter(id => id != id_administrador));
        } catch (error) {
            console.error('Error al actualizar el administrador:', error);
        }
    };
    const eliminarAdministrador = () => {
    };

    return (
        <>
            {administradores.map((administrador, index) => (
                <div
                    key={administrador.id_administrador}
                    className={seleccionAdministrador == administrador.id_administrador ? "superadministradorSeleccioadoAdministradores" : "superadministradorAdministradores"}
                    onClick={() => seleccionarAdministrador(administrador.id_administrador)}
                    ref={seleccionAdministrador == administrador.id_administrador ? seleccionadoAdministrador : null}
                >
                    <form className={editarSeleccionAdministrador.includes(administrador.id_administrador) ? "articuloSuperadministradorAdministradores  articuloAlternativoSuperadministradorAdministradores" : "articuloSuperadministradorAdministradores"}>
                        <input 
                            type="text" 
                            name="nombreArticuloSuperadministradorAdministradores" 
                            id={editarSeleccionAdministrador.includes(administrador.id_administrador) ? "nombreArticuloAlternativoSuperadministradorAdministradores" : "nombreArticuloSuperadministradorAdministradores"} 
                            disabled={seleccionAdministrador != administrador.id_administrador} 
                            value={nombresAdministradores[index] || ''} 
                            onChange={e => { 
                                const newNombres = [...nombresAdministradores];
                                newNombres[index] = e.target.value;
                                setNombresAdministradores(newNombres);
                            }} 
                        />
                        <fieldset>
                            <h2>E-mail:</h2>
                            <input 
                                type="text" 
                                name="emailArticuloSuperadministradorAdministradores" 
                                id="emailArticuloSuperadministradorAdministradores" 
                                disabled={seleccionAdministrador != administrador.id_administrador} 
                                value={emailsAdministradores[index] || ''} 
                                onChange={e => { 
                                    const newEmails = [...emailsAdministradores];
                                    newEmails[index] = e.target.value;
                                    setEmailsAdministradores(newEmails);
                                }} 
                            />
                        </fieldset>
                        <fieldset>
                            <h2>Celular:</h2>
                            <input 
                                type="text" 
                                name="celularArticuloSuperadministradorAdministradores" 
                                id="celularArticuloSuperadministradorAdministradores" 
                                disabled={seleccionAdministrador != administrador.id_administrador} 
                                value={celularesAdministradores[index] || ''} 
                                onChange={e => { 
                                    const newCelulares = [...celularesAdministradores];
                                    newCelulares[index] = e.target.value;
                                    setCelularesAdministradores(newCelulares);
                                }} 
                            />
                        </fieldset>
                        <fieldset>
                            <h2>Teléfono:</h2>
                            <input 
                                type="text" 
                                name="telefonoArticuloSuperadministradorAdministradores" 
                                id="telefonoArticuloSuperadministradorAdministradores" 
                                disabled={seleccionAdministrador != administrador.id_administrador} 
                                value={telefonosAdministradores[index] || ''} 
                                onChange={e => { 
                                    const newTelefonos = [...telefonosAdministradores];
                                    newTelefonos[index] = e.target.value;
                                    setTelefonosAdministradores(newTelefonos);
                                }} 
                            />
                        </fieldset>
                        <fieldset>
                            <h2>Fecha de modificación:</h2>
                            <input 
                                type="text" 
                                name="fechaCreacionArticuloSuperadministradorAdministradores" 
                                id="fechaCreacionArticuloSuperadministradorAdministradores" 
                                disabled 
                                defaultValue={new Date(administrador.fecha_creacion).toLocaleDateString()} 
                            />
                        </fieldset>
                    </form>
                    {seleccionAdministrador == administrador.id_administrador && (
                        !editarSeleccionAdministrador.includes(administrador.id_administrador) ? (
                            <div className="pieSuperadministradorSeleccioadoAdministradores">
                                <button type="button" onClick={() => editarAdministrador(administrador.id_administrador)} className="botonPieSuperadministradorSeleccioadoAdministradores">Editar</button>
                                <button type="button" onClick={() => eliminarAdministrador()} className="botonPieSuperadministradorSeleccioadoAdministradores">Eliminar</button>
                                <button type="button" className="botonPieSuperadministradorSeleccioadoAdministradores">Noticias</button>
                            </div>
                        ) : (
                            <div className="pieSuperadministradorSeleccioadoAdministradores">
                                <button type="button" onClick={() => cancelarEditarAdministrador(administrador.id_administrador)} className="botonPieSuperadministradorSeleccioadoAdministradores">Cancelar</button>
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
