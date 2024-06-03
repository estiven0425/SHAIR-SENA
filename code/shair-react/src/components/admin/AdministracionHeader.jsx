import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AdministracionContexto from "../../contexts/AdministracionContexto";

function AdministracionHeader() {
    const administracion = useContext(AdministracionContexto);
    const seccion = administracion.seccion;
    const setSeccion = administracion.setSeccion;
    const subSeccion = administracion.subSeccion;
    const setSubSeccion = administracion.setSubSeccion;

    const accesoSeccion = () => {
        setSeccion(seccion == 0 ? 1 : 0)
    }

    const accesoSubSeccion1 = () => {
        setSubSeccion(subSeccion != 1 ? 1 : 0)
    }

    const accesoSubSeccion2 = () => {
        setSubSeccion(subSeccion != 2 ? 2 : 0)
    }

    return (
        <>
            {seccion == 0 ? (
                <>
                    <section className="seccionAdministracionHeader">
                        <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
                            <button type="button" onClick={accesoSeccion}>Administradores</button>
                        </nav>
                    </section>
                    <section className="seccionAlternativaAdministracionHeader">
                        <nav className="navegacionSeccionAlternativaAdministracionHeader">
                            <Link to="/">Volver a la página principal</Link>
                        </nav>
                    </section>
                </>
            ) : (
                <>
                    <section className="seccionAdministracionHeader">
                        <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(57, 169, 0)" }}>
                            <button type="button" onClick={accesoSeccion}>Administradores</button>
                        </nav>
                    </section>
                    <section className="seccionAlternativaAdministracionHeader">
                        <nav className="navegacionSeccionAlternativaAdministracionHeader">
                            <button type="button" onClick={accesoSubSeccion1} style={{ backgroundColor: subSeccion == 1 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>Administradores</button>
                            <button type="button" onClick={accesoSubSeccion2} style={{ backgroundColor: subSeccion == 2 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>Crear administrador</button>
                        </nav>
                    </section>
                </>
            )}
        </>
    );
}

export default AdministracionHeader;