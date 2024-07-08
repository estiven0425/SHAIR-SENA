import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return children;
};

export default RutaProtegida;
