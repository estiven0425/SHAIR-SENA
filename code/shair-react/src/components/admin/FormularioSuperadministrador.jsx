// FORMULARIO DE SUPERADMINISTRADOR
// ---------- Importaciones ----------
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormularioContexto from "../../contexts/FormularioContexto";
import "../../pages/admin/styles/formulario.css";
// ---------- Componente ----------
function FormularioSuperadministrador() {
  // ---------- Estados y contextos ----------
  const formulario = useContext(FormularioContexto);
  const setFormulario = formulario.setFormulario;
  const [valorEmail, setValorEmail] = useState(formulario.valorEmail);
  const [valorContraseña, setValorContraseña] = useState(formulario.valorContraseña);
  const redireccion = useNavigate();
  const [validacionError, setValidacionError] = useState({});
  const [servidorError, setServidorError] = useState(null);
  // ---------- Validaciones de seguridad ----------
  const validacion = () => {
    const errors = {};

    if (!valorEmail) {
      errors.email = "El campo de correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorEmail)) {
      errors.email = "El correo electrónico ingresado no tiene un formato válido.";
    }
    if (!valorContraseña) {
      errors.contraseña = "El campo de contraseña es obligatorio.";
    }

    setValidacionError(errors);

    return Object.keys(errors).length === 0;
  };
  // ---------- Envío de formulario ----------
  const enviarFormularioSuperadministrador = async (e) => {
    e.preventDefault();

    if (!validacion()) {
      return;
    }

    try {
      const respuesta = await axios.post("http://localhost:5000/superadministradorlogin", {
        email: valorEmail,
        contraseña: valorContraseña,
      });

      sessionStorage.setItem("token", respuesta.data.token);
      redireccion("/administracion/superadministrador");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setServidorError(error.response.data.error);
      } else {
        setServidorError("Error al iniciar sesión. Por favor, inténtelo de nuevo.");
      }
    }

    setValorContraseña("");
  };
  // ---------- Respuesta del proceso ----------
  return (
    <motion.article className="tarjetaFormulario" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      <header className="tarjetaFormularioCabecera">
        <h1>Superadministrador</h1>
      </header>

      <main className="tarjetaFormularioCuerpo">
        <form className="tarjetaFormularioCuerpoFormulario">
          <fieldset className="tarjetaFormularioCuerpoFormularioGrupo">
            <label htmlFor="email">E-mail:</label>
            <input className="tarjetaFormularioCuerpoFormularioGrupoInput" type="email" name="email" id="email" value={valorEmail} onChange={(e) => setValorEmail(e.target.value)} />
            {validacionError.email && <span className="tarjetaFormularioCuerpoFormularioError">{validacionError.email}</span>}
          </fieldset>
          <fieldset className="tarjetaFormularioCuerpoFormularioGrupo">
            <label htmlFor="contraseña">Contraseña:</label>
            <input className="tarjetaFormularioCuerpoFormularioGrupoInput" type="password" name="contraseña" id="contraseña" value={valorContraseña} onChange={(e) => setValorContraseña(e.target.value)} />
            {validacionError.contraseña && <motion.span className="tarjetaFormularioCuerpoFormularioError">{validacionError.contraseña}</motion.span>}
          </fieldset>
        </form>
      </main>

      {servidorError && <span className="tarjetaFormularioCuerpoFormularioError">{servidorError}</span>}

      <footer className="tarjetaFormularioPie">
        <button className="tarjetaFormularioPieBoton" type="button" onClick={() => setFormulario(0)}>
          Volver
        </button>
        <button className="tarjetaFormularioPieBoton" type="button" onClick={enviarFormularioSuperadministrador}>
          Acceder
        </button>
      </footer>
    </motion.article>
  );
}
// ---------- Exportación del componente ----------
export default FormularioSuperadministrador;
