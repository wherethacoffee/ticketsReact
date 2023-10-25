import React, { useEffect } from "react";
import Cookies from "js-cookie";
import "../styles/Modal.css";

const Modal = ({ onClose }) => {
  useEffect(() => {
    const hasAcceptedCookies = Cookies.get("acceptedCookies");
    if (!hasAcceptedCookies) {
      // Mostrar el modal si las cookies no han sido aceptadas
      document.querySelector(".modal").style.display = "block";
    }
  }, []);

  const handleAcceptCookies = () => {
    // Establecer la cookie y cerrar el modal
    Cookies.set("acceptedCookies", "true", { expires: 365 }); // La cookie expirará en 1 año
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Política de Cookies</h2>
        <p>
          Este sitio web utiliza cookies para garantizar que obtenga la mejor
          experiencia en nuestro sitio web. Al continuar utilizando nuestro
          sitio, usted acepta nuestra política de cookies.
        </p>
        <button onClick={handleAcceptCookies}>Aceptar</button>
      </div>
    </div>
  );
};

export default Modal;
