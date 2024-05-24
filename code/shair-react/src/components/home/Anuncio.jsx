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
            <div id="contenidoSliderAnuncio">
                {anuncio.map(anuncio => (
                    <article key={anuncio.id} className="articuloContenidoSliderAnuncio">
                        <div className="informacionArticuloContenidoSliderAnuncio">
                            <div className="principalInformacionArticuloContenidoSliderAnuncio">
                                <h2>{anuncio.nombre}</h2>
                                <p>{anuncio.enunciado}</p>
                            </div>
                            <div className="secundariaInformacionArticuloContenidoSliderAnuncio">
                                <p><span>Más información: </span>{anuncio.mas_informacion}</p>
                            </div>
                        </div>
                        <div className="imagenArticuloContenidoSliderAnuncio">
                            <img src={`http://localhost:5000/${anuncio.archivo_adjunto}`} alt="Imagen no disponible" />
                        </div>
                    </article>
                ))}
            </div>
            <div>
                <p>control de slider</p>
            </div>

        </>
    );
}

export default Anuncio;