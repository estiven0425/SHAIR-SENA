import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Shair from "./pages/home/Shair";
import Formulario from "./pages/admin/Formulario";
import Administracion from "./pages/admin/Administracion";
import Recomendacion from "./pages/home/Recomendacion";
import Superadministrador from "./components/admin/Superadministrador";
import Administrador from "./components/admin/Administrador";
import Error from "./pages/error/Error";
import RutaProtegida from "./utils/admin/secure/RutaProtegida";
import "./assets/styles/style.css";

function App() {
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

export default App;
