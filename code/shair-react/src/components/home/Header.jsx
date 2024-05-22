import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function Header() {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    useEffect(() => {
        const actualizarFechaHora = () => {
            const actual = new Date();
            const fechaFormateada = format(actual, 'EEEE dd \'de\' MMMM \'del\' yyyy', { locale: es });
            const horaFormateada = format(actual, 'hh:mm a', { locale: es });
            setFecha(fechaFormateada);
            setHora(horaFormateada);
        };
        const intervalo = setInterval(actualizarFechaHora, 1000);

        actualizarFechaHora();

        return () => clearInterval(intervalo);
    }, []);

    return (
        <>
            <section className="seccionHeader" id="fechaSeccionHeader"><p>{fecha}</p></section>
            <section className="seccionHeader" id="nombreSeccionHeader"><h1>SHAIR|SENA</h1></section>
            <section className="seccionHeader" id="horaSeccionHeader"><p>{hora}</p></section>
        </>
    );
}

export default Header;