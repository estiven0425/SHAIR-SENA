import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
      <motion.div id="contenidoSliderAnuncio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
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
      </motion.div>
      {anunciosFiltrados.length > 0 && (
        <motion.div className="controlSlider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          {anunciosFiltrados.map((_, indice) => (
            <button key={indice} className={`actualControlSlider ${indice === slider ? "Activo" : ""}`} onClick={() => activarSlider(indice)} type="button"></button>
          ))}
        </motion.div>
      )}
    </>
  );
}

export default Anuncio;
