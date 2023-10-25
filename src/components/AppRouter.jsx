import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Inicio from "./Inicio";
import Login from "./Login";
import RegistroTickets from "./FormularioTickets";
import CrearUsuario from "./CrearUsuario";
import TurnoAdminComponent from "./TurnosAdmin";

const AppRouter = () => {
  return (
    <Router>
      <Route path="/" element={<Inicio />} />
      <Route path="/iniciar-sesion" element={<Login />} />
      <Route path="/crear-ticket" element={<RegistroTickets />} />
      <Route path="/crear-cuenta" element={<CrearUsuario />} />
      <Route path="/tickets-admin" element={<TurnoAdminComponent />} />
      {/* Otras rutas */}
    </Router>
  );
};

export default AppRouter;
