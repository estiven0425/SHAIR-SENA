import React from "react";
import Header from "../../components/home/Header";
import './styles/shair.css';
import Anuncio from "../../components/home/Anuncio";
import Noticia from "../../components/home/Noticia";

function Shair() {
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <section id="sliderAnuncio">
                    <Anuncio />
                </section>
                <section id="contenedorNoticia">
                    <Noticia />
                </section>
            </main>
        </>
    );
}

export default Shair;