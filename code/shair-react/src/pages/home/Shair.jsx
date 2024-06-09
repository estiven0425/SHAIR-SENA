import React from "react";
import { motion } from "framer-motion";
import Header from "../../components/home/Header";
import Anuncio from "../../components/home/Anuncio";
import Noticia from "../../components/home/Noticia";
import Herramienta from "../../components/home/Herramienta";
import "./styles/shair.css";

function Shair() {
  return (
    <>
      <motion.header id="shairHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        <Header />
      </motion.header>
      <motion.main id="shairPrincipal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
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

export default Shair;
