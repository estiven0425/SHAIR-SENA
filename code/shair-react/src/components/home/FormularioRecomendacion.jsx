import React, { useState } from "react";

function FormularioRecomendacion() {
    const [imagen, setImagen] = useState(null);

    const subirImagen = (event) => {
        const archivo = event.target.files[0];

        if (archivo != null) {
            const leerImagen = new FileReader();

            leerImagen.onloadend = () => {
                setImagen(leerImagen.result);
            };
            leerImagen.readAsDataURL(archivo);
        }
    };

    return (
        <form id="formularioRecomendacionPrincipal">
            <section className="seccionFormularioRecomendacionPrincipal">
                <fieldset className="subSeccionFormularioRecomendacionPrincipal">
                    <label htmlFor="titulo">Título*:</label>
                    <input type="text" name="titulo" id="titulo" />
                </fieldset>
                <fieldset className="subSeccionFormularioRecomendacionPrincipal">
                    <label htmlFor="recomendacion">Recomendación*:</label>
                    <input type="text" name="recomendacion" id="recomendacion" />
                </fieldset>
                <fieldset className="subSeccionFormularioRecomendacionPrincipal">
                    <h2>Imagen adjunta*:</h2>
                    <label htmlFor="imagenAdjunta" className="subArchivoSeccionFormularioRecomendacionPrincipal">
                        {imagen != null ? (
                            <img src={imagen} alt="Previsualización" className="imagenSubArchivoSeccionFormularioRecomendacionPrincipal" />
                        ) : (
                            "+"
                        )}
                    </label>
                    <input
                        type="file"
                        name="imagenAdjunta"
                        id="imagenAdjunta"
                        onChange={subirImagen}
                    />
                </fieldset>
            </section>
            <section className="seccionFormularioRecomendacionPrincipal">
                <button type="submit" id="botonSeccionFormularioRecomendacionPrincipal">Enviar recomendación</button>
                <p>Los campos con <span>*</span> son obligatorios.</p>
            </section>
        </form>
    );
}

export default FormularioRecomendacion;
