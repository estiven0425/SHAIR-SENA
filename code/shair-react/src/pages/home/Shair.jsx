import React from "react";
import Header from "../../components/home/Header";
import './styles/shair.css';
import Anuncio from "../../components/home/Anuncio";
import Noticia from "../../components/home/Noticia";
import Herramienta from "../../components/home/Herramienta";

function Shair() {
    return (
        <>
            <header id="shairHeader">
                <Header />
            </header>
            <main id="shairPrincipal">
                <section id="sliderAnuncio">
                    <Anuncio />
                </section>
                <section id="contenedorNoticia">
                    <Noticia />
                </section>
                <Herramienta />
            </main>
        </>
    );
}

export default Shair;