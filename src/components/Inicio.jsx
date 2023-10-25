import React from "react";
import logo from "../images/logo.jpg";
import "../styles/InicioStyle.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Modal from "./Modal";
import { useState } from "react";

const Inicio = ({ isLoggedIn, isAdmin, onLogout }) => {
  const [cookies, setCookie] = useCookies(["cookieName"]);
  const [showModal, setShowModal] = useState(!cookies.cookieName);

  const handleCloseModal = () => {
    setCookie("cookieName", true, { path: "/" });
    setShowModal(false);
  };

  return (
    <div className="inicio-container">
      <header className="header">
        <img className="logo" src={logo} alt="Logo" />
        <h1 className="heading">Sistema de Tickets</h1>
        {isLoggedIn && isAdmin ? (
          // Si está logueado como administrador, muestra el botón "Cerrar Sesión"
          <button className="small-button" onClick={onLogout}>
            Cerrar Sesión
          </button>
        ) : (
          // Si no está logueado o no es administrador, muestra el botón "Iniciar Sesión"
          <Link to="/iniciar-sesion" className="small-button">
            Iniciar Sesión
          </Link>
        )}
      </header>
      <div className="content">
        <div className="button-container-vertical">
          <Link to="/crear-ticket" className="large-button">
            Crear Ticket
          </Link>
          <Link to="/alumno" className="large-button">
            Nuevo ingreso
          </Link>
          {isLoggedIn && isAdmin && (
            <Link to="/crud-catalogos" className="large-button">
              Modificar Catalogos
            </Link>
          )}
          {isLoggedIn && isAdmin && (
            <Link to="/tickets-admin" className="large-button">
              Modificar Tickets
            </Link>
          )}
          {isLoggedIn && isAdmin && (
            <Link to="/dashboard" className="large-button">
              Dashboard Municipios
            </Link>
          )}
          {isLoggedIn && isAdmin && (
            <Link to="/dashboard-total" className="large-button">
              Dashboard
            </Link>
          )}
          {showModal && <Modal onClose={handleCloseModal} />}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
