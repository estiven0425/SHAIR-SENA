import React, { useState, useEffect } from "react";
import axios from "axios";

function Noticia() {
  const [noticia, setNoticia] = useState([]);

  useEffect(() => {
    const leerNoticia = async () => {
      try {
        const respuesta = await axios.get("http://localhost:5000/noticia");

        setNoticia(respuesta.data);
      } catch (error) {
        console.error("Error al obtener noticias: ", error);
      }
    };

    leerNoticia();
  }, []);

  const noticiasFiltradas = noticia.filter((noticia) => {
    const fechaFin = new Date(noticia.fecha_fin);
    const fechaActual = new Date();
    return fechaFin >= fechaActual;
  });

  return (
    <>
      {noticiasFiltradas.map((noticia) => (
        <div key={noticia.id} className="subContenedorNoticia">
          <h2>{noticia.nombre}</h2>
          <article className="articuloSubContenedorNoticia">
            <div className="informacionArticuloSubContenedorNoticia">
              <div className="principalInformacionArticuloSubContenedorNoticia">
                <p>{noticia.enunciado}</p>
              </div>
              <div className="secundariaInformacionArticuloSubContenedorNoticia">
                <p>
                  <span>Lugar: </span>
                  {noticia.lugar}
                </p>
                <p>
                  <span>Desde: </span>
                  {new Date(noticia.fecha_inicio).toLocaleDateString()}
                </p>
                <p>
                  <span>Hasta: </span>
                  {new Date(noticia.fecha_fin).toLocaleDateString()}
                </p>
                <p>
                  <span>Organiza: </span>
                  {noticia.Administrador.nombre}
                </p>
                <p>
                  <span>Más información: </span>
                  {noticia.mas_informacion}
                </p>
              </div>
            </div>
            <div className="imagenArticuloSubContenedorNoticia">
              <img src={`http://localhost:5000/${noticia.archivo_adjunto}`} alt="Imagen no disponible" />
            </div>
          </article>
        </div>
      ))}
    </>
  );
}

export default Noticia;
