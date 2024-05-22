import React, { useState, useEffect } from "react";
import axios from "axios";

function Anuncio() {
    const [anuncio, setAnuncio] = useState([]);

    useEffect(() => {
        const leerAnuncio = async () => {
            try {
                const respuesta = await axios.get('http://localhost:5000/anuncio');

                setAnuncio(respuesta.data);
            } catch (error) {
                console.error('Error al obtener anuncios: ', error);
            }
        };

        leerAnuncio();
    }, []);

    return (
        <>
            <div>
                {anuncio.map(anuncio => (
                    <article key={anuncio.id}>
                        <h2>{anuncio.nombre}</h2>
                        <p>{anuncio.enunciado}</p>
                        <p><span>Más información: </span>{anuncio.mas_informacion}</p>
                        <img src={`http://localhost:5000/${anuncio.archivo_adjunto}`} alt="Imagen no disponible" />
                    </article>
                ))}
            </div>

        </>
    );
}

export default Anuncio;