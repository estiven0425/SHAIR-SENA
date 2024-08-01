import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Anuncio() {
  const [anuncio, setAnuncio] = useState([]);
  const [slider, setSlider] = useState(0);
  const itemReferenciado = useRef([]);

  useEffect(() => {
    const leerAnuncio = async () => {
      try {
        const respuesta = await axios.get("http://localhost:5000/anuncio");
        setAnuncio(respuesta.data);
      } catch (error) {
        console.error("Error al obtener anuncios: ", error);
      }
    };

    leerAnuncio();
  }, []);

  const activarSlider = (indice) => {
    setSlider(indice);
    itemReferenciado.current[indice].scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const anunciosFiltrados = anuncio.filter((anuncio) => {
    const fechaFin = new Date(anuncio.fecha_expiracion);
    const fechaActual = new Date();
    return fechaFin >= fechaActual;
  });

  return (
    <>
      <div id="contenidoSliderAnuncio">
        {anunciosFiltrados.map((anuncio, indice) => (
          <article key={anuncio.id} className="articuloContenidoSliderAnuncio" ref={(articulo) => (itemReferenciado.current[indice] = articulo)}>
            <div className="informacionArticuloContenidoSliderAnuncio">
              <div className="principalInformacionArticuloContenidoSliderAnuncio">
                <h2>{anuncio.nombre}</h2>
                <p>{anuncio.enunciado}</p>
              </div>
              <div className="secundariaInformacionArticuloContenidoSliderAnuncio">
                <p>
                  <span>Más información: </span>
                  {anuncio.mas_informacion}
                </p>
              </div>
            </div>
            <div className="imagenArticuloContenidoSliderAnuncio">
              <img src={`http://localhost:5000/${anuncio.archivo_adjunto}`} alt="Imagen no disponible" />
            </div>
          </article>
        ))}
      </div>
      {anunciosFiltrados.length > 0 && (
        <div className="controlSlider">
          {anunciosFiltrados.map((_, indice) => (
            <button key={indice} className={`actualControlSlider ${indice === slider ? "Activo" : ""}`} onClick={() => activarSlider(indice)} type="button"></button>
          ))}
        </div>
      )}
    </>
  );
}

export default Anuncio;
