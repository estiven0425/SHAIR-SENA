import React, { useEffect, useContext } from "react";
import AdministracionContexto from "../../contexts/AdministracionContexto";
import SuperadministradorAdministradores from "./SuperadministradorAdministradores";
import SuperadministradorCrearAdministrador from "./SuperadministradorCrearAdministrador";

function Superadministrador() {
    const administracion = useContext(AdministracionContexto);
    const seccion = administracion.seccion;
    const setSeccion = administracion.setSeccion;
    const subSeccion = administracion.subSeccion;

    useEffect(() => {
        setSeccion(0)
    }, [])

    let explicacion;

    switch (subSeccion) {
        case 1:
            explicacion = <SuperadministradorAdministradores />;
            break;
        case 2:
            explicacion = <SuperadministradorCrearAdministrador />;
            break;
        default:
            explicacion = <>
                <h1 className="tituloAdministracionPrincipal">Administradores</h1>
                <p className="parrafoAdministracionPrincipal">
                    Bienvenido a la sección de administradores, aquí puedes gestionar a los administadores de la plataforma. <br />
                    A continuación, en la parte superior de la página encontraras el acceso a el control de administradores y al formulario de creación.
                </p>
            </>;
            break;
    }

    return (
        <>
            {seccion === 0 ? (
                <>
                    <h1 className="tituloAdministracionPrincipal">¡Hola Estiven Montoya Torres!</h1>
                    <p className="parrafoAdministracionPrincipal">
                        Bienvenido a la vista de superadministrador de SHAIR. <br />
                        Aquí puedes gestionar a los demás administradores de la plataforma, ya sea crear nuevos administadores, modificarlos o eliminarlos.
                    </p>
                </>
            ) : (
                <>
                    {explicacion}
                </>
            )}
        </>
    );
}

export default Superadministrador;