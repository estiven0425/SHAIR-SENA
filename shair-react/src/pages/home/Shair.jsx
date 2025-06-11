// PÁGINA PRINCIPAL
// ---------- Importaciones ----------
import React from "react";
import { motion } from "framer-motion";
import Anuncio from "../../components/home/Anuncio";
import Header from "../../components/home/Header";
import Herramienta from "../../components/home/Herramienta";
import Noticia from "../../components/home/Noticia";
import "./styles/shair.css";
// ---------- COmponente ----------
function Shair() {
  // ---------- Respuesta del proceso ----------
  return (
    <>
      <motion.header
        id="shairHeader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <Header />
      </motion.header>
      <motion.main
        id="shairPrincipal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <section id="sliderAnuncio">
          <Anuncio />
        </section>
        <section id="contenedorNoticia">
          <Noticia />
        </section>
        <Herramienta />
      </motion.main>
    </>
  );
}
// ---------- Exportación del componente ----------
export default Shair;
