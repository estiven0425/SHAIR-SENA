// ANUNCIO
// ---------- Importaciones ----------
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// ---------- Componente ----------
function Anuncio() {
  // ---------- Estados y referencias ----------
  const [anuncio, setAnuncio] = useState([]);
  const [slider, setSlider] = useState(0);
  const itemReferenciado = useRef([]);
  const localIP = process.env.REACT_APP_LOCAL_IP;
  // ---------- Obtención de anuncios ----------
  useEffect(() => {
    const leerAnuncio = async () => {
      try {
        const respuesta = await axios.get(`http://${localIP}:5000/anuncio`);
        setAnuncio(respuesta.data);
      } catch (error) {
        console.error("Error al obtener anuncios: ", error);
      }
    };

    leerAnuncio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ---------- Control deslizante ----------
  const activarSlider = (indice) => {
    setSlider(indice);
    itemReferenciado.current[indice].scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  // ---------- Automatización del slider ----------
  useEffect(() => {
      if (anunciosFiltrados.length > 0) {
        const delayIntervalo = setTimeout(() => {
          const intervalo = setInterval(() => {
              setSlider((prevSlider) => {
                  const nuevoSlider = (prevSlider + 1) % anuncio.length;
                  activarSlider(nuevoSlider);
                  return nuevoSlider;
              });
          }, 10000);
          return () => clearInterval(intervalo);
      }, 5000);

    return () => clearTimeout(delayIntervalo);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anuncio.length]);
  // ---------- Validación de anuncios ----------
  const anunciosFiltrados = anuncio.filter((anuncio) => {
    const fechaFin = new Date(anuncio.fecha_expiracion);
    const fechaActual = new Date();
    return fechaFin >= fechaActual;
  });
  // ---------- Respuesta del proceso ----------
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
              <img src={`http://${localIP}:5000/${anuncio.archivo_adjunto}`} alt="Imagen no disponible" />
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
// ---------- Exportación del componente ----------
export default Anuncio;
