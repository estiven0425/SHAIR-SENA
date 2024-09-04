// BARRA DE NAVEGACIÓN DE LA ADMINISTRACIÓN
// ---------- Importaciones ----------
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AdministracionContexto from "../../contexts/AdministracionContexto";
// ---------- Componente ----------
function AdministracionHeader() {
  // ---------- Estados y contextos ----------
  const administracion = useContext(AdministracionContexto);
  const seccion = administracion.seccion;
  const setSeccion = administracion.setSeccion;
  const subSeccion = administracion.subSeccion;
  const setSubSeccion = administracion.setSubSeccion;
  // ---------- Validaciones de estado ----------
  const accesoSeccion = () => {
    setSeccion(seccion !== 1 ? 1 : 0);
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
  const accesoSeccion6 = () => {
    setSeccion(seccion !== 6 ? 6 : 0);
  };
  const accesoSubSeccion1 = () => {
    setSubSeccion(subSeccion !== 1 ? 1 : 0);
  };
  const accesoSubSeccion2 = () => {
    setSubSeccion(subSeccion !== 2 ? 2 : 0);
  };
  const accesoSubSeccion3 = () => {
    setSubSeccion(subSeccion !== 3 ? 3 : 0);
  };
  const accesoSubSeccion4 = () => {
    setSubSeccion(subSeccion !== 4 ? 4 : 0);
  };
  const accesoSubSeccion5 = () => {
    setSubSeccion(subSeccion !== 5 ? 5 : 0);
  };
  const accesoSubSeccion6 = () => {
    setSubSeccion(subSeccion !== 6 ? 6 : 0);
  };
  const accesoSubSeccion7 = () => {
    setSubSeccion(subSeccion !== 7 ? 7 : 0);
  };
  const accesoSubSeccion8 = () => {
    setSubSeccion(subSeccion !== 8 ? 8 : 0);
  };
  // ---------- Función de renderizado de estado ----------
  const seleccionHeader = () => {
    if (seccion === 0) {
      return (
        <>
          <motion.section className="seccionAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion}>
                Administradores
              </button>
            </nav>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion6}>
                Recomendaciones
              </button>
            </nav>
          </motion.section>
          <motion.section className="seccionAlternativaAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <nav className="navegacionSeccionAlternativaAdministracionHeader">
              <Link to="/">Volver a la página principal</Link>
            </nav>
          </motion.section>
        </>
      );
    } else if (seccion === 1) {
      return (
        <>
          <motion.section className="seccionAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(57, 169, 0)" }}>
              <button type="button" onClick={accesoSeccion}>
                Administradores
              </button>
            </nav>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion6}>
                Recomendaciones
              </button>
            </nav>
          </motion.section>
          <motion.section className="seccionAlternativaAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <nav className="navegacionSeccionAlternativaAdministracionHeader">
              <button type="button" onClick={accesoSubSeccion1} style={{ backgroundColor: subSeccion === 1 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Administradores
              </button>
              <button type="button" onClick={accesoSubSeccion2} style={{ backgroundColor: subSeccion === 2 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Crear administrador
              </button>
            </nav>
          </motion.section>
        </>
      );
    } else if (seccion === 6) {
      return (
        <>
          <motion.section className="seccionAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(4, 50, 77)" }}>
              <button type="button" onClick={accesoSeccion}>
                Administradores
              </button>
            </nav>
            <nav className="navegacionSeccionAdministracionHeader" style={{ backgroundColor: "rgb(57, 169, 0)" }}>
              <button type="button" onClick={accesoSeccion6}>
                Recomendaciones
              </button>
            </nav>
          </motion.section>
          <motion.section className="seccionAlternativaAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <nav className="navegacionSeccionAlternativa6AdministracionHeader navegacionSeccionAlternativaAdministracionHeader">
              <button type="button" onClick={accesoSubSeccion8} style={{ backgroundColor: subSeccion === 8 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Recomendaciones
              </button>
            </nav>
          </motion.section>
        </>
      );
    } else if (seccion === 2) {
      return (
        <>
          <motion.section className="seccionAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
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
          </motion.section>
          <motion.section className="seccionAlternativaAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <nav className="navegacionSeccionAlternativaAdministracionHeader">
              <Link to="/">Volver a la página principal</Link>
            </nav>
          </motion.section>
        </>
      );
    } else if (seccion === 3) {
      return (
        <>
          <motion.section className="seccionAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
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
          </motion.section>
          <motion.section className="seccionAlternativaAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <nav className="navegacionSeccionAlternativaAdministracionHeader">
              <button type="button" onClick={accesoSubSeccion3} style={{ backgroundColor: subSeccion === 3 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Noticias
              </button>
              <button type="button" onClick={accesoSubSeccion4} style={{ backgroundColor: subSeccion === 4 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Crear noticias
              </button>
            </nav>
          </motion.section>
        </>
      );
    } else if (seccion === 4) {
      return (
        <>
          <motion.section className="seccionAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
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
          </motion.section>
          <motion.section className="seccionAlternativaAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <nav className="navegacionSeccionAlternativa4AdministracionHeader navegacionSeccionAlternativaAdministracionHeader">
              <button type="button" onClick={accesoSubSeccion5} style={{ backgroundColor: subSeccion === 5 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Anuncios
              </button>
              <button type="button" onClick={accesoSubSeccion6} style={{ backgroundColor: subSeccion === 6 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Crear anuncios
              </button>
            </nav>
          </motion.section>
        </>
      );
    } else if (seccion === 5) {
      return (
        <>
          <motion.section className="seccionAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
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
          </motion.section>
          <motion.section className="seccionAlternativaAdministracionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <nav className="navegacionSeccionAlternativa5AdministracionHeader navegacionSeccionAlternativaAdministracionHeader">
              <button type="button" onClick={accesoSubSeccion7} style={{ backgroundColor: subSeccion === 7 ? "rgb(57, 169, 0)" : "rgb(4, 50, 77)" }}>
                Recomendaciones
              </button>
            </nav>
          </motion.section>
        </>
      );
    }
  };
  // ---------- Respuesta del proceso ----------
  return <>{seleccionHeader()}</>;
}
// ---------- Exportación del componente ----------
export default AdministracionHeader;
