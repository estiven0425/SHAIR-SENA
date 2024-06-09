import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AdministracionContexto from "../../contexts/AdministracionContexto";

function AdministracionHeader() {
  const administracion = useContext(AdministracionContexto);
  const seccion = administracion.seccion;
  const setSeccion = administracion.setSeccion;
  const subSeccion = administracion.subSeccion;
  const setSubSeccion = administracion.setSubSeccion;

  const accesoSeccion = () => {
    setSeccion(seccion === 0 ? 1 : 0);
  };
  const accesoSeccion3 = () => {
    setSeccion(seccion !== 3 ? 3 : 2);
  };
  const accesoSeccion4 = () => {
    setSeccion(seccion !== 4 ? 4 : 2);
  };
  const accesoSeccion5 = () => {
    setSeccion(seccion !== 5 ? 5 : 2);
  };
  const accesoSubSeccion1 = () => {
    setSubSeccion(subSeccion !== 1 ? 1 : 0);
  };
  const accesoSubSeccion2 = () => {
    setSubSeccion(subSeccion !== 2 ? 2 : 0);
  };
  const accesoSubSeccion3 = () => {
    setSubSeccion(subSeccion !== 3 ? 3 : 2);
  };
  const accesoSubSeccion4 = () => {
    setSubSeccion(subSeccion !== 4 ? 4 : 2);
  };
  const accesoSubSeccion5 = () => {
    setSubSeccion(subSeccion !== 5 ? 5 : 2);
  };
  const accesoSubSeccion6 = () => {
    setSubSeccion(subSeccion !== 6 ? 6 : 2);
  };
  const accesoSubSeccion7 = () => {
    setSubSeccion(subSeccion !== 7 ? 7 : 2);
  };
  const seleccionHeader = () => {
    if (seccion === 0) {
      return (
        <>
          <section className="seccionAdministracionHeader">
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion}>
                Administradores
              </button>
            </nav>
          </section>
          <section className="seccionAlternativaAdministracionHeader">
            <nav className="navegacionSeccionAlternativaAdministracionHeader">
              <Link to="/">Volver a la página principal</Link>
            </nav>
          </section>
        </>
      );
    } else if (seccion === 1) {
      return (
        <>
          <section className="seccionAdministracionHeader">
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(57, 169, 0)" }}>
              <button type="button" onClick={accesoSeccion}>
                Administradores
              </button>
            </nav>
          </section>
          <section className="seccionAlternativaAdministracionHeader">
            <nav className="navegacionSeccionAlternativaAdministracionHeader">
              <button type="button" onClick={accesoSubSeccion1} style={{ backgroundColor: subSeccion === 1 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Administradores
              </button>
              <button type="button" onClick={accesoSubSeccion2} style={{ backgroundColor: subSeccion === 2 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Crear administrador
              </button>
            </nav>
          </section>
        </>
      );
    } else if (seccion === 2) {
      return (
        <>
          <section className="seccionAdministracionHeader">
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion3}>
                Noticias
              </button>
            </nav>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion4}>
                Anuncios
              </button>
            </nav>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion5}>
                Recomendaciones
              </button>
            </nav>
          </section>
          <section className="seccionAlternativaAdministracionHeader">
            <nav className="navegacionSeccionAlternativaAdministracionHeader">
              <Link to="/">Volver a la página principal</Link>
            </nav>
          </section>
        </>
      );
    } else if (seccion === 3) {
      return (
        <>
          <section className="seccionAdministracionHeader">
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(57, 169, 0)" }}>
              <button type="button" onClick={accesoSeccion3}>
                Noticias
              </button>
            </nav>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion4}>
                Anuncios
              </button>
            </nav>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion5}>
                Recomendaciones
              </button>
            </nav>
          </section>
          <section className="seccionAlternativaAdministracionHeader">
            <nav className="navegacionSeccionAlternativaAdministracionHeader">
              <button type="button" onClick={accesoSubSeccion3} style={{ backgroundColor: subSeccion === 3 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Noticias
              </button>
              <button type="button" onClick={accesoSubSeccion4} style={{ backgroundColor: subSeccion === 4 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Crear noticias
              </button>
            </nav>
          </section>
        </>
      );
    } else if (seccion === 4) {
      return (
        <>
          <section className="seccionAdministracionHeader">
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion3}>
                Noticias
              </button>
            </nav>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(57, 169, 0)" }}>
              <button type="button" onClick={accesoSeccion4}>
                Anuncios
              </button>
            </nav>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion5}>
                Recomendaciones
              </button>
            </nav>
          </section>
          <section className="seccionAlternativaAdministracionHeader">
            <nav className="navegacionSeccionAlternativa4AdministracionHeader">
              <button type="button" onClick={accesoSubSeccion5} style={{ backgroundColor: subSeccion === 5 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Anuncios
              </button>
              <button type="button" onClick={accesoSubSeccion6} style={{ backgroundColor: subSeccion === 6 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Crear anuncios
              </button>
            </nav>
          </section>
        </>
      );
    } else if (seccion === 5) {
      return (
        <>
          <section className="seccionAdministracionHeader">
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion3}>
                Noticias
              </button>
            </nav>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion4}>
                Anuncios
              </button>
            </nav>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(57, 169, 0)" }}>
              <button type="button" onClick={accesoSeccion5}>
                Recomendaciones
              </button>
            </nav>
          </section>
          <section className="seccionAlternativaAdministracionHeader">
            <nav className="navegacionSeccionAlternativa5AdministracionHeader">
              <button type="button" onClick={accesoSubSeccion7} style={{ backgroundColor: subSeccion === 7 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Recomendaciones
              </button>
            </nav>
          </section>
        </>
      );
    }
  };

  return <>{seleccionHeader()}</>;
}

export default AdministracionHeader;
