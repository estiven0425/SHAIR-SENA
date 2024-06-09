import React from "react";
import { Link } from "react-router-dom";

function BarraDeNavegacion() {
  return (
    <>
      <section className="seccionRecomendacionHeader seccionAlternativaRecomendacionHeader">
        <nav className="navegacionSeccionRecomendacionHeader">
          <h1>Recomendación</h1>
        </nav>
      </section>
      <section className="seccionRecomendacionHeader">
        <nav className="navegacionSeccionRecomendacionHeader navegacionAlternativaSeccionRecomendacionHeader">
          <Link to="/" id="enlaceNavegacionSeccionRecomendacionHeader">
            Volver a la página principal
          </Link>
        </nav>
      </section>
    </>
  );
}

export default BarraDeNavegacion;
