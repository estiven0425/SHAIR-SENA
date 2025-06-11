// PÁGINA DE ERROR
// ---------- Importaciones ----------
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./styles/error.css";
// ---------- Componente ----------
function Error() {
  // ---------- Estados ----------
  const [temporizador, setTemporizador] = useState(5);

  const navigate = useNavigate();
  // ---------- Redireccion ----------
  useEffect(() => {
    const conteoTemporizador = setInterval(() => {
      setTemporizador((prev) => prev - 1);
    }, 1000);
    const tiempo = setTimeout(() => {
      navigate("/");
    }, 5500);

    return () => {
      clearInterval(conteoTemporizador);
      clearTimeout(tiempo);
    };
  }, []);
  // ---------- Respuesta del proceso ----------
  return (
    <>
      <motion.section
        className="seccionError"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <article>
          <div className="superiorSeccionError">
            <h1>Error 404</h1>
          </div>
          <div className="inferiorSeccionError">
            <p>
              ¡Oops! <br />
              Página no encontrada. <br />
              Seras redirigido a la página principal en <br />
              {temporizador} segundos.
            </p>
          </div>
        </article>
      </motion.section>
    </>
  );
}
// ---------- Exportación del componente ----------
export default Error;
