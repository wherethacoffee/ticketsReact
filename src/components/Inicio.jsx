import React from "react";
import logo from "../images/logo.jpg";
import "../styles/InicioStyle.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Modal from "./Modal";
import { useState } from "react";
import tickeImg from "../images/ticket_img.jpg";

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
        <h1 className="heading">Bienvenido al sistema de tickets de trámites escolares!</h1>
        {isLoggedIn && isAdmin ? (
          // Si está logueado como administrador, muestra el botón "Cerrar Sesión"
          <button className="small-button" onClick={onLogout}>
            Cerrar Sesión
          </button>
        ) : (
          // Si no está logueado o no es administrador, muestra el botón "Iniciar Sesión"
          <Link to="/login" className="small-button">
            Iniciar Sesión
          </Link>
        )}
      </header>
      <div className="content">
        <div className="button-container-vertical">
          <Link to="/crear-ticket-existente" className="large-button">
            Crear Ticket de alumno ya ingresado
          </Link>
          <Link to="/crear-ticket-nuevo" className="large-button">
            Nuevo ingreso de alumno
          </Link>
          {isLoggedIn && isAdmin && (
            <Link to="/catalogos" className="large-button">
              Modificar Catalogos
            </Link>
          )}
          {isLoggedIn && isAdmin && (
            <Link to="/tickets-admin" className="large-button">
              Modificar Tickets
            </Link>
          )}
          {isLoggedIn && isAdmin && (
            <Link to="/grafica-municipio" className="large-button">
              Grafica por Municipios
            </Link>
          )}
          {isLoggedIn && isAdmin && (
            <Link to="/grafica-total" className="large-button">
              Grafica total
            </Link>
          )}
          {showModal && <Modal onClose={handleCloseModal} />}
        </div>
      </div>
      <img className="ticket-img" src={tickeImg} alt="ticket"/>
    </div>
  );
};

export default Inicio;
