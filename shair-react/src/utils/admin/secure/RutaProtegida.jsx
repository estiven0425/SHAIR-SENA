// PROTECCIÓN DE RUTAS
// ---------- Importaciones ----------
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// ---------- Componente ----------
const RutaProtegida = ({ children }) => {
  // ---------- Estados de navegación ----------
  const navigate = useNavigate();
  // ---------- Redirección de página ----------
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  // ---------- Respuesta del proceso ----------
  return children;
};
// ---------- Exportación del componente ----------
export default RutaProtegida;
