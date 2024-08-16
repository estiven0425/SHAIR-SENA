import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Enlaces from "../../assets/images/enlaces.png";
import Mensaje from "../../assets/images/mensaje.png";
import Acceder from "../../assets/images/acceder.png";

function Herramienta() {
  const [herramienta, setHerramienta] = useState(false);

  const usarHerramienta = () => {
    setHerramienta(!herramienta);
  };

  return (
    <>
      <motion.div id="herramienta" initial={{ display: "none", opacity: 0 }} animate={{ display: herramienta === true ? "flex" : "none", opacity: herramienta === true ? 1 : 0 }} transition={{ duration: 0.25 }}>
        <h2>Herramientas</h2>
        <div className="cajaHerramienta">
          <Link to="/recomendacion" className="subCajaHerramienta">
            <img src={Mensaje} alt="Mensaje" />
            Enviar recomendación
          </Link>
          <Link to="/ingreso" className="subCajaHerramienta">
            <img src={Acceder} alt="Acceder" />
            Ingresar
          </Link>
        </div>
      </motion.div>
      <motion.button type="button" id="botonHerramienta" onClick={usarHerramienta} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        <img src={Enlaces} alt="Enlaces" />
      </motion.button>
    </>
  );
}

export default Herramienta;
