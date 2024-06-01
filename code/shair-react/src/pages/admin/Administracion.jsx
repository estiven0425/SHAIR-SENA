import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from 'framer-motion';
import AdministracionContexto from "../../contexts/AdministracionContexto";
import AdministracionHeader from "../../components/admin/AdministracionHeader";
import './styles/administracion.css';

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
            <AdministracionContexto.Provider value={seccionEstado}>
                <motion.header
                    id="administracionHeader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}>
                    <AdministracionHeader />
                </motion.header>
                <motion.main
                    id={subSeccion == 0 || seccion == 0 ? "administracionPrincipal" : "administracionAlternativaPrincipal"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}>
                    <Outlet />
                </motion.main>
            </AdministracionContexto.Provider>
        </>
    );
}

export default Administracion;