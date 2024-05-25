import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Shair from "./pages/home/Shair";
import Formulario from "./pages/admin/Formulario";
import Administracion from "./pages/admin/Administracion";
import Recomendacion from "./pages/home/Recomendacion";
import './assets/styles/style.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Footer />}>
          <Route index element={<Shair />} />
          <Route path="recomendacion" element={<Recomendacion />} />
          <Route path="ingreso" element={<Formulario />} />
          <Route path="administracion" element={<Administracion />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;