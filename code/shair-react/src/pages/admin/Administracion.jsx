import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdministracionContexto from "../../contexts/AdministracionContexto";

function Administracion() {
    const [seccion, setSeccion] = useState(0);
    const [subSeccion, setSubSeccion] = useState(0);
    const seccionEstado = {
        seccion,
        setSeccion,
        subSeccion,
        setSubSeccion
    }

    return (
        <>
            <header>
                <AdministracionContexto.Provider value={seccionEstado}>

                </AdministracionContexto.Provider>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Administracion;