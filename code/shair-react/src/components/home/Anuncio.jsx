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
  // ---------- Obtención de anuncios ----------
  useEffect(() => {
    const leerAnuncio = async () => {
      try {
        const respuesta = await axios.get("http://192.168.1.192:5000/anuncio");
        setAnuncio(respuesta.data);
      } catch (error) {
        console.error("Error al obtener anuncios: ", error);
      }
    };

    leerAnuncio();
  }, []);
  // ---------- Control deslizante ----------
  const activarSlider = (indice) => {
    setSlider(indice);
    itemReferenciado.current[indice].scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
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
              <img src={`http://192.168.1.192:5000/${anuncio.archivo_adjunto}`} alt="Imagen no disponible" />
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
