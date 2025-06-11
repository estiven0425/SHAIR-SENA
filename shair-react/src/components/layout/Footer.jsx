// PIE DE PÁGINA
// ---------- Importaciones ----------
import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import gobiernoCol from "../../assets/images/gobiernoColombia.svg";
import gov from "../../assets/images/gov.svg";
import normasIso from "../../assets/images/normasIso.svg";
// ---------- Componente ----------
function Footer() {
  // ---------- Respuesta del proceso ----------
  return (
    <>
      <Outlet />
      <motion.footer
        id="Footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <section className="seccionFooter" id="seccionFooterSuperior">
          <aside id="seccionFooter0">
            <div>
              <img src={gobiernoCol} alt=">Gobierno de Colombia" />
            </div>
          </aside>
          <article id="seccionFooter1">
            <div className="contenedorSeccionFooter1Superior">
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior0"></div>
                <a
                  href="https://petro.presidencia.gov.co/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior0"
                  rel="noreferrer"
                >
                  Presidencia
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior1"></div>
                <a
                  href="https://www.minjusticia.gov.co/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior1"
                  rel="noreferrer"
                >
                  MinJusticia
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior2"></div>
                <a
                  href="https://www.mininterior.gov.co/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior2"
                  rel="noreferrer"
                >
                  MinInterior
                </a>
              </div>
            </div>
            <div className="contenedorSeccionFooter1Superior">
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior3"></div>
                <a
                  href="https://www.mintic.gov.co/portal/inicio/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior3"
                  rel="noreferrer"
                >
                  MinTic
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior4"></div>
                <a
                  href="https://www.minsalud.gov.co/Portada2021/index.html"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior4"
                  rel="noreferrer"
                >
                  MinSalud
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior5"></div>
                <a
                  href="https://www.mincultura.gov.co/Paginas/default.aspx"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior5"
                  rel="noreferrer"
                >
                  MinCultura
                </a>
              </div>
            </div>
            <div className="contenedorSeccionFooter1Superior">
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior6"></div>
                <a
                  href="https://www.minminas.gov.co/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior6"
                  rel="noreferrer"
                >
                  MinMinas
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior7"></div>
                <a
                  href="https://www.mindefensa.gov.co/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior7"
                  rel="noreferrer"
                >
                  MinDefensa
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior8"></div>
                <a
                  href="https://www.mineducacion.gov.co/portal/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior8"
                  rel="noreferrer"
                >
                  MinEducación
                </a>
              </div>
            </div>
            <div className="contenedorSeccionFooter1Superior">
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior9"></div>
                <a
                  href="https://www.mintrabajo.gov.co/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior9"
                  rel="noreferrer"
                >
                  MinTrabajo
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior10"></div>
                <a
                  href="https://mintransporte.gov.co/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior10"
                  rel="noreferrer"
                >
                  MinTransporte
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior11"></div>
                <a
                  href="https://www.urnadecristal.gov.co/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior11"
                  rel="noreferrer"
                >
                  Urna de Cristal
                </a>
              </div>
            </div>
            <div className="contenedorSeccionFooter1Superior">
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior12"></div>
                <a
                  href="https://www.minhacienda.gov.co/webcenter/portal/Minhacienda"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior12"
                  rel="noreferrer"
                >
                  MinHacienda
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior13"></div>
                <a
                  href="https://www.mincit.gov.co/inicio"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior13"
                  rel="noreferrer"
                >
                  MinComercio
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior14"></div>
                <a
                  href="https://www.minvivienda.gov.co/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior14"
                  rel="noreferrer"
                >
                  MinVivienda
                </a>
              </div>
            </div>
            <div className="contenedorSeccionFooter1Superior">
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior15"></div>
                <a
                  href="https://www.minagricultura.gov.co/paginas/default.aspx"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior15"
                  rel="noreferrer"
                >
                  MinAgricultura
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior16"></div>
                <a
                  href="https://fmm.vicepresidencia.gov.co/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior16"
                  rel="noreferrer"
                >
                  Vicepresidencia
                </a>
              </div>
              <div className="subContenedorSeccionFooter1Superior">
                <div id="cuadroSubContenedorSeccionFooter1Superior17"></div>
                <a
                  href="https://www.minambiente.gov.co/"
                  target="_blank"
                  className="enlaceSubContenedorSeccionFooter1Superior"
                  id="enlaceSubContenedorSeccionFooter1Superior17"
                  rel="noreferrer"
                >
                  MinAmbiente
                </a>
              </div>
            </div>
          </article>
        </section>
        <section className="seccionFooter" id="seccionFooterMedia">
          <article id="contenidoSeccionFooterMedia">
            <p>Servicion Nacional de Aprendizaje SENA - Dirección General</p>
            <p>Calle 57 No. 8 - 69 Bogotá D.C. (Cundinamarca), Colombia</p>
            <p>Conmutador Nacional (57 1) 5461500 - Extensiones</p>
            <p>Atención presencial: lunes a viernes 8:00 a.m. a 5:30 p.m.</p>
            <a
              href="https://www.sena.edu.co/es-co/sena/Paginas/directorio.aspx"
              target="_blank"
              rel="noreferrer"
            >
              Resto del país sedes y horarios
            </a>
            <p>Atención telefónica: lunes a viernes 7:00 a.m. a 7:00 p.m. - </p>
            <p>sábados 8:00 a.m. a 1:00 p.m.</p>
            <p>
              Atención al ciudadano: Bogotá (5 71) 3430111 - Línea gratuita y
              resto del país 018000 910270
            </p>
            <p>
              Atención al empresario: Bogotá (5 71) 3430101 - Línea gratuita y
              resto del país 018000 910682
            </p>
            <a
              href="https://sciudadanos.sena.edu.co/SolicitudIndex.aspx"
              target="_blank"
              rel="noreferrer"
            >
              PQRS
            </a>
            <a
              href="https://www.sena.edu.co/es-co/ciudadano/Paginas/chat.aspx"
              target="_blank"
              rel="noreferrer"
            >
              Chat en línea
            </a>
            <p>
              Correo notificaciones judiciales: servicioalciudadano@sena.edu.co
            </p>
            <p>
              Todos los derechos 2017 SENA -{" "}
              <a
                href="https://www.sena.edu.co/es-co/Paginas/politicasCondicionesUso.aspx"
                target="_blank"
                rel="noreferrer"
              >
                Políticas de privacidad y condiciones de uso Portal Web SENA
              </a>
            </p>
            <a
              href="https://www.sena.edu.co/es-co/transparencia/Documents/proteccion_datos_personales_sena_2016.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Política de Tratamiento para Protección de Datos Personales -{" "}
            </a>
            <a
              href="https://compromiso.sena.edu.co/index.php?text=inicio&id=27"
              target="_blank"
              rel="noreferrer"
            >
              Política de seguridad y privacidad de la información
            </a>
          </article>
          <aside id="certificadoSeccionFooterMedia">
            <img src={normasIso} alt="Normas ISO" />
          </aside>
        </section>
        <section className="seccionFooter" id="seccionFooterInferior">
          <a href="https://www.gov.co/" target="_blank" rel="noreferrer">
            <img src={gov} alt="Gov.co" />
          </a>
        </section>
      </motion.footer>
    </>
  );
}
// ---------- Exportación del componente ----------
export default Footer;
