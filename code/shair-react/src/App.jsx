// ARCHIVO DE ENCUENTRO
// ---------- Importaciones ----------
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Administracion from "./pages/admin/Administracion";
import Administrador from "./components/admin/Administrador";
import Error from "./pages/error/Error";
import Footer from "./components/layout/Footer";
import Formulario from "./pages/admin/Formulario";
import Recomendacion from "./pages/home/Recomendacion";
import RutaProtegida from "./utils/admin/secure/RutaProtegida";
import Shair from "./pages/home/Shair";
import Superadministrador from "./components/admin/Superadministrador";
import "./assets/styles/style.css";
// ---------- Componente ----------
function App() {
  // ---------- Respuesta del proceso ----------
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Footer />}>
          <Route index element={<Shair />} />
          <Route path="recomendacion" element={<Recomendacion />} />
          <Route path="ingreso" element={<Formulario />} />
          <Route
            path="administracion"
            element={
              <RutaProtegida>
                <Administracion />
              </RutaProtegida>
            }
          >
            <Route path="superadministrador" element={<Superadministrador />} />
            <Route path="administrador" element={<Administrador />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
// ---------- Exportación del componente ----------
export default App;
