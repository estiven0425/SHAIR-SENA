import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formulario from "./pages/admin/Formulario";
import Shair from "./pages/home/Shair";
import './assets/styles/style.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Shair />} />
          <Route path="ingreso" element={<Formulario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;