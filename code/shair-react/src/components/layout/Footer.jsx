import React from "react";
import { Outlet } from "react-router-dom";
import './styles/style.css';
import gobiernoCol from '../../assets/images/gobiernoColombia.svg';
import normasIso from '../../assets/images/normasIso.svg';
import gov from '../../assets/images/gov.svg';

function Footer() {
    return (
        <>
            <Outlet />
            <footer id="Footer">
                <section className="seccionFooter" id="seccionFooterSuperior">
                    <aside>
                        <img src={gobiernoCol} alt=">Gobierno de Colombia" draggable="false" />
                    </aside>
                    <div className="contenedorSeccionFooterSuperior">
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior0"></div>
                            <a href="https://petro.presidencia.gov.co/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior0">Presidencia</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior1"></div>
                            <a href="https://www.minjusticia.gov.co/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior1">MinJusticia</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior2"></div>
                            <a href="https://www.mininterior.gov.co/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior2">MinInterior</a>
                        </div>
                    </div>
                    <div className="contenedorSeccionFooterSuperior">
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior3"></div>
                            <a href="https://www.mintic.gov.co/portal/inicio/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior3">MinTic</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior4"></div>
                            <a href="https://www.minsalud.gov.co/Portada2021/index.html" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior4">MinSalud</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior5"></div>
                            <a href="https://www.mincultura.gov.co/Paginas/default.aspx" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior5">MinCultura</a>
                        </div>
                    </div>
                    <div className="contenedorSeccionFooterSuperior">
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior6"></div>
                            <a href="https://www.minminas.gov.co/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior6">MinMinas</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior7"></div>
                            <a href="https://www.mindefensa.gov.co/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior7">MinDefensa</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior8"></div>
                            <a href="https://www.mineducacion.gov.co/portal/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior8">MinEducación</a>
                        </div>
                    </div>
                    <div className="contenedorSeccionFooterSuperior">
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior9"></div>
                            <a href="https://www.mintrabajo.gov.co/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior9">MinTrabajo</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior10"></div>
                            <a href="https://mintransporte.gov.co/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior10">MinTransporte</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior11"></div>
                            <a href="https://www.urnadecristal.gov.co/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior11">Urna de Cristal</a>
                        </div>
                    </div>
                    <div className="contenedorSeccionFooterSuperior">
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior12"></div>
                            <a href="https://www.minhacienda.gov.co/webcenter/portal/Minhacienda" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior12">MinHacienda</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior13"></div>
                            <a href="https://www.mincit.gov.co/inicio" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior13">MinComercio</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior14"></div>
                            <a href="https://www.minvivienda.gov.co/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior14">MinVivienda</a>
                        </div>
                    </div>
                    <div className="contenedorSeccionFooterSuperior">
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior15"></div>
                            <a href="https://www.minagricultura.gov.co/paginas/default.aspx" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior15">MinAgricultura</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior16"></div>
                            <a href="https://fmm.vicepresidencia.gov.co/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior16">Vicepresidencia</a>
                        </div>
                        <div className="subContenedorSeccionFooterSuperior">
                            <div id="cuadroSubContenedorSeccionFooterSuperior17"></div>
                            <a href="https://www.minambiente.gov.co/" target="_blank" className="enlaceSubContenedorSeccionFooterSuperior" id="enlaceSubContenedorSeccionFooterSuperior17">MinAmbiente</a>
                        </div>
                    </div>
                </section>
                <section className="seccionFooter" id="seccionFooterMedia">
                    <article id="contenidoSeccionFooterMedia">
                        <p>Servicion Nacional de Aprendizaje SENA - Dirección General</p>
                        <p>Calle 57 No. 8 - 69 Bogotá D.C. (Cundinamarca), Colombia</p>
                        <p>Conmutador Nacional (57 1) 5461500 - Extensiones</p>
                        <p>Atención presencial: lunes a viernes 8:00 a.m. a 5:30 p.m.</p>
                        <a href="https://www.sena.edu.co/es-co/sena/Paginas/directorio.aspx" target="_blank">Resto del país sedes y horarios</a>
                        <p>Atención telefónica: lunes a viernes 7:00 a.m. a 7:00 p.m. - </p>
                        <p>sábados 8:00 a.m. a 1:00 p.m.</p>
                        <p>Atención al ciudadano: Bogotá (5 71) 3430111 - Línea gratuita y resto del país 018000 910270</p>
                        <p>Atención al empresario: Bogotá (5 71) 3430101 - Línea gratuita y resto del país 018000 910682</p>
                        <a href="https://sciudadanos.sena.edu.co/SolicitudIndex.aspx" target="_blank">PQRS</a>
                        <a href="https://www.sena.edu.co/es-co/ciudadano/Paginas/chat.aspx" target="_blank">Chat en línea</a>
                        <p>Correo notificaciones judiciales: servicioalciudadano@sena.edu.co</p>
                        <p>Todos los derechos 2017 SENA - <a href="https://www.sena.edu.co/es-co/Paginas/politicasCondicionesUso.aspx" target="_blank">Políticas de privacidad y condiciones de uso Portal Web SENA</a></p>
                        <a href="https://www.sena.edu.co/es-co/transparencia/Documents/proteccion_datos_personales_sena_2016.pdf" target="_blank">Política de Tratamiento para Protección de Datos Personales - </a>
                        <a href="https://compromiso.sena.edu.co/index.php?text=inicio&id=27" target="_blank">Política de seguridad y privacidad de la información</a>
                    </article>
                    <aside>
                        <img src={normasIso} alt="Normas ISO" draggable="false" />
                    </aside>
                </section>
                <section className="seccionFooter" id="seccionFooterInferior">
                    <a href="https://www.gov.co/" target="_blank">
                        <img src={gov} alt="Gov.co" draggable="false" />
                    </a>
                </section>
            </footer>
        </>
    );
}

export default Footer;