// FORMULARIO DE ADMINISTRADORES DEL SUPERADMINISTRADOR
// ---------- Importaciones ----------
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// ---------- Componente ----------
function SuperadministradorCrearAdministrador() {
  // ---------- Estados ----------
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [validacionError, setValidacionError] = useState({});
  const [servidorError, setServidorError] = useState(null);

  const localIP = process.env.REACT_APP_LOCAL_IP;
  // ---------- Validaciones de seguridad ----------
  const validacion = () => {
    const errors = {};

    if (!nombre) {
      errors.nombre = "El campo de nombre es obligatorio es obligatorio.";
    } else if (nombre.length > 250) {
      errors.nombre = "El campo de nombre no puede ser mayor a 250 caracteres.";
    }

    if (!email) {
      errors.email = "El campo de email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email =
        "El correo electrónico ingresado no tiene un formato válido.";
    }

    if (!celular) {
      errors.celular = "El campo de celular es obligatorio es obligatorio.";
    } else if (isNaN(celular)) {
      errors.celular = "El campo de celular debe ser solo numeros.";
    }
    if (!contraseña) {
      errors.contraseña = "El campo de contraseña es obligatorio.";
    }

    setValidacionError(errors);

    return Object.keys(errors).length === 0;
  };
  // ---------- Envío de formulario ----------
  const crearAdministrador = async (e) => {
    e.preventDefault();

    if (!validacion()) {
      return;
    }

    try {
      await axios.post(`http://${localIP}:5000/administrador`, {
        nombre: nombre,
        email: email,
        celular: celular,
        telefono: telefono === "" ? null : telefono,
        contraseña: contraseña,
      });

      setEnviado(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setServidorError(error.response.data.error);
      } else {
        setServidorError(
          "Error al crear el administrador. Por favor, inténtelo de nuevo."
        );
      }
    }
  };
  // ---------- Reinicio de formulario ----------
  const reiniciarFormulario = () => {
    setNombre("");
    setEmail("");
    setCelular("");
    setTelefono("");
    setContraseña("");
    setEnviado(false);
  };
  // ---------- Respuesta del proceso ----------
  return (
    <>
      {enviado === true ? (
        <>
          <motion.div
            id="alertaAdministracionCrear"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <h1>Administrador creado con éxtio</h1>
            <p>
              Ve a la sección de administradores para ver, editar y eliminar los
              administradores.
            </p>
            <button
              type="button"
              className="botonSeccionAlternativaFormularioAdministracionCrear"
              onClick={reiniciarFormulario}
            >
              Crear otro administrador
            </button>
          </motion.div>
        </>
      ) : (
        <form id="formularioAdministracionCrear" onSubmit={crearAdministrador}>
          <motion.section
            className="seccionFormularioAdministracionCrear"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="nombre">Nombre*:</label>
              {validacionError.nombre && (
                <span className="subSeccionFormularioAdministracionCrearError">
                  {validacionError.nombre}
                </span>
              )}
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="email">Email*:</label>
              {validacionError.email && (
                <span className="subSeccionFormularioAdministracionCrearError">
                  {validacionError.email}
                </span>
              )}
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="celular">Celular*:</label>
              {validacionError.celular && (
                <span className="subSeccionFormularioAdministracionCrearError">
                  {validacionError.celular}
                </span>
              )}
              <input
                type="number"
                name="celular"
                id="celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
              />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="number"
                name="telefono"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </fieldset>
            <fieldset className="subSeccionFormularioAdministracionCrear">
              <label htmlFor="contraseña">Contraseña*:</label>
              {validacionError.contraseña && (
                <span className="subSeccionFormularioAdministracionCrearError">
                  {validacionError.contraseña}
                </span>
              )}
              <input
                type="password"
                name="contraseña"
                id="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </fieldset>
          </motion.section>
          {servidorError && (
            <span className="subSeccionFormularioAdministracionCrearError">
              {servidorError}
            </span>
          )}
          <motion.section
            className="seccionFormularioAdministracionCrear seccionAlternativaFormularioAdministracionCrear"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="submit"
              className="botonSeccionAlternativaFormularioAdministracionCrear"
            >
              Crear administrador
            </button>
            <p>
              Los campos con <span>*</span> son obligatorios.
            </p>
          </motion.section>
        </form>
      )}
    </>
  );
}
// ---------- Exportación del componente ----------
export default SuperadministradorCrearAdministrador;
