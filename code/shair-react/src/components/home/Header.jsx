// CABEZERA
// ---------- Importaciones ----------
import React, { useState, useEffect } from "react";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { motion } from "framer-motion";
// ---------- Componente ----------
function Header() {
  // ---------- Estados ----------
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  // ---------- Formateo de fecha y hora ----------
  useEffect(() => {
    const actualizarFechaHora = () => {
      const actual = new Date();
      const fechaFormateada = format(actual, "EEEE dd 'de' MMMM 'del' yyyy", { locale: es });
      const horaFormateada = format(actual, "hh:mm a", { locale: es });
      setFecha(fechaFormateada);
      setHora(horaFormateada);
    };
    const intervalo = setInterval(actualizarFechaHora, 1000);

    actualizarFechaHora();

    return () => clearInterval(intervalo);
  }, []);
  // ---------- Respuesta del proceso ----------
  return (
    <>
      <motion.section className="seccionHeader" id="fechaSeccionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        <p>{fecha}</p>
      </motion.section>
      <motion.section className="seccionHeader" id="nombreSeccionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        <h1>SHAIR|SENA</h1>
      </motion.section>
      <motion.section className="seccionHeader" id="horaSeccionHeader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        <p>{hora}</p>
      </motion.section>
    </>
  );
}
// ---------- Exportación del componente ----------
export default Header;
