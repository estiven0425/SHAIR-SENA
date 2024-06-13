import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormularioContexto from "../../contexts/FormularioContexto";
import "../../pages/admin/styles/formulario.css";

function FormularioAdministrador() {
  const formulario = useContext(FormularioContexto);
  const setFormulario = formulario.setFormulario;
  const valorEmail = formulario.valorEmail;
  const setValorEmail = formulario.setValorEmail;
  const valorContraseña = formulario.valorContraseña;
  const setValorContraseña = formulario.setValorContraseña;
  const redireccion = useNavigate();
  const enviarFormularioAdministrador = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await axios.post("http://localhost:5000/administradorlogin", {
        email: valorEmail,
        contraseña: valorContraseña,
      });

      sessionStorage.setItem("token", respuesta.data.token);
      redireccion("/administracion/administrador");
    } catch (error) {
      console.log("Error al iniciar sesión: ", error);
    }

    setValorContraseña("");
  };

  return (
    <article className="tarjetaFormulario">
      <header className="tarjetaFormularioCabecera">
        <h1>Administrador</h1>
      </header>

      <main className="tarjetaFormularioCuerpo">
        <form className="tarjetaFormularioCuerpoFormulario">
          <fieldset className="tarjetaFormularioCuerpoFormularioGrupo">
            <label htmlFor="email">E-mail:</label>

            <input className="tarjetaFormularioCuerpoFormularioGrupoInput" type="email" name="email" id="email" value={valorEmail} onChange={(e) => setValorEmail(e.target.value)} />
          </fieldset>
          <fieldset className="tarjetaFormularioCuerpoFormularioGrupo">
            <label htmlFor="contraseña">Contraseña:</label>

            <input className="tarjetaFormularioCuerpoFormularioGrupoInput" type="password" name="contraseña" id="contraseña" value={valorContraseña} onChange={(e) => setValorContraseña(e.target.value)} />
          </fieldset>
        </form>
      </main>

      <footer className="tarjetaFormularioPie">
        <button className="tarjetaFormularioPieBoton" type="button" onClick={() => setFormulario(0)}>
          Volver
        </button>
        <button className="tarjetaFormularioPieBoton" type="button" onClick={enviarFormularioAdministrador}>
          Acceder
        </button>
      </footer>
    </article>
  );
}

export default FormularioAdministrador;
