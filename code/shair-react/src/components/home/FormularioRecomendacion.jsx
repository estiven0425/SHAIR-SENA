import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function FormularioRecomendacion() {
  const [imagen, setImagen] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [recomendacion, setRecomendacion] = useState("");
  const [enviado, setEnviado] = useState(false);

  const subirImagen = (event) => {
    const archivo = event.target.files[0];
    setImagen(archivo);
  };

  const enviarRecomendacion = async (event) => {
    event.preventDefault();

    const datosFormulario = new FormData();

    datosFormulario.append("titulo", titulo);
    datosFormulario.append("recomendacion", recomendacion);

    try {
      let rutaCargaRecomendacion = null;

      if (imagen) {
        datosFormulario.append("file", imagen);

        const cargaRecomendacion = await axios.post("http://localhost:5000/cargaRecomendacion", datosFormulario, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        rutaCargaRecomendacion = cargaRecomendacion.data.filePath;
      }

      await axios.post("http://localhost:5000/recomendacion", {
        titulo,
        recomendacion,
        archivo_adjunto: rutaCargaRecomendacion,
      });

      setEnviado(true);
    } catch (error) {
      console.error("Error al enviar la recomendación: ", error);
    }
  };

  const reiniciarFormulario = () => {
    setTitulo("");
    setRecomendacion("");
    setImagen(null);
    setEnviado(false);
  };

  return (
    <>
      {enviado === true ? (
        <motion.div id="alertaRecomendacionPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <h1>Recomendación enviada con éxito</h1>
          <p>Vuelve a la página principal para continuar navegando</p>
          <button onClick={reiniciarFormulario} type="button">
            Crear otra recomendación
          </button>
        </motion.div>
      ) : (
        <motion.form id="formularioRecomendacionPrincipal" onSubmit={enviarRecomendacion} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <section className="seccionFormularioRecomendacionPrincipal">
            <fieldset className="subSeccionFormularioRecomendacionPrincipal">
              <label htmlFor="titulo">Título*:</label>
              <input type="text" name="titulo" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </fieldset>
            <fieldset className="subSeccionFormularioRecomendacionPrincipal">
              <label htmlFor="recomendacion">Recomendación*:</label>
              <input type="text" name="recomendacion" id="recomendacion" value={recomendacion} onChange={(e) => setRecomendacion(e.target.value)} required />
            </fieldset>
            <fieldset className="subSeccionFormularioRecomendacionPrincipal">
              <h2>Imagen adjunta:</h2>
              <label htmlFor="imagenAdjunta" className="subArchivoSeccionFormularioRecomendacionPrincipal">
                {imagen ? <img src={URL.createObjectURL(imagen)} alt="Previsualización" className="imagenSubArchivoSeccionFormularioRecomendacionPrincipal" /> : "+"}
              </label>
              <input type="file" name="imagenAdjunta" id="imagenAdjunta" onChange={subirImagen} />
            </fieldset>
          </section>
          <section className="seccionFormularioRecomendacionPrincipal">
            <button type="submit" id="botonSeccionFormularioRecomendacionPrincipal">
              Enviar recomendación
            </button>
            <p>
              Los campos con <span>*</span> son obligatorios.
            </p>
          </section>
        </motion.form>
      )}
    </>
  );
}

export default FormularioRecomendacion;
