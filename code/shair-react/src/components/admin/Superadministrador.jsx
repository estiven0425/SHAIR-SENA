import React, { useContext } from "react";
import AdministracionContexto from "../../contexts/AdministracionContexto";

function Superadministrador() {
    const administracion = useContext(AdministracionContexto);
    const seccion = administracion.seccion;
    const subSeccion = administracion.subSeccion;

    let explicacion;

    switch (subSeccion) {
        case 1:
            explicacion = <h1>Hola</h1>;
            break;
        case 2:
            explicacion = <h1>Chao</h1>;
            break;
        default:
            explicacion = <>
                <h1>Administradores</h1>
                <p>
                    Bienvenido a la sección de administradores, aquí puedes gestionar a los administadores de la plataforma. <br />
                    A continuación, en la parte superior de la página encontraras el acceso a el control de administradores y al formulario de creación.
                </p>
            </>;
            break;
    }

    return (
        <>
            {seccion == 0 ? (
                <>
                    <h1 className="TituloAdministracionPrincipal">¡Hola Estiven Montoya Torres!</h1>
                    <p>
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