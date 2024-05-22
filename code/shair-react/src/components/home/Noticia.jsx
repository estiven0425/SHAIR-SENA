import React, { useState, useEffect } from "react";
import axios from "axios";

function Noticia() {
    const [noticia, setNoticia] = useState([]);

    useEffect(() => {
        const leerNoticias = async () => {
            try {
                const respuesta = await axios.get('http://localhost:5000/noticia');

                setNoticia(respuesta.data);
            } catch (error) {
                console.error('Error al obtener noticias: ', error);
            }
        };

        leerNoticias();
    }, []);

    return (
        <>
            {noticia.map(noticia => (
                <article key={noticia.id}>
                    <h2>{noticia.nombre}</h2>
                    <p>{noticia.enunciado}</p>
                    <p><span>Lugar: </span>{noticia.lugar}</p>
                    <p><span>Desde: </span>{new Date(noticia.fecha_inicio).toLocaleDateString()}</p>
                    <p><span>Hasta: </span>{new Date(noticia.fecha_fin).toLocaleDateString()}</p>
                    <p><span>Organiza: </span>{noticia.id_administrador}</p>
                    <p><span>Más información: </span>{noticia.mas_informacion}</p>
                    <img src={`http://localhost:5000/${noticia.archivo_adjunto}`} alt="Imagen no disponible" />
                </article>
            ))}
        </>
    );
}

export default Noticia;
