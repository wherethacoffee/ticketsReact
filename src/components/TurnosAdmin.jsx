import React, { useState, useEffect } from "react";
import {
  listTurno,
  findTurno,
  registerTurno,
  updateTurno,
  deleteTurno,
  switchTurnoStatus,
} from "../services/turno.services"; // Ajusta la ruta según sea necesario
import { listMunicipio } from "../services/municipio.services";
import { listNivel } from "../services/nivel.services";
import { listAsunto } from "../services/asunto.services";
import { listRepresentante } from "../services/representante.services";
import RegistroTickets from "./FormularioTickets";
import "../styles/TurnoAdmin.css";

const TurnoAdminComponent = () => {
  const [turnos, setTurnos] = useState([]);
  const [representantes, setRepresentantes] = useState([]);
  const [idRepresentante, setIdRepresentante] = useState(null);
  const [municipios, setMunicipio] = useState([]);
  const [niveles, setNivel] = useState([]);
  const [asuntos, setAsunto] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    idRep: null,
    curp: "",
    idMunicipio: null, // Inicializa como null
    idNivel: null, // Inicializa como null
    idAsunto: null, // Inicializa como null
    // Agrega otros campos aquí según sea necesario
  });

  useEffect(() => {
    // Cargar la lista de turnos al montar el componente
    loadTurnos();
    loadMunicipios();
    loadNiveles();
    loadAsuntos();
    loadRepresentantes(); // Agrega esta línea
  }, []);

  const loadRepresentantes = async () => {
    try {
      // Llama a tu servicio para obtener la lista de representantes
      // (Asumiendo que hay un servicio llamado listRepresentante)
      const response = await listRepresentante();
      const data = await response.json();
      setRepresentantes(data);
    } catch (error) {
      console.error("Error al cargar la lista de representantes:", error);
    }
  };

  const loadTurnos = async () => {
    try {
      const response = await listTurno();
      const data = await response.json();
      setTurnos(data);
    } catch (error) {
      console.error("Error al cargar la lista de turnos:", error);
    }
  };

  const loadMunicipios = async () => {
    try {
      const response = await listMunicipio();
      const data = await response.json();
      setMunicipio(data);
    } catch (error) {
      console.error("Error al cargar la lista de municipios:", error);
    }
  };

  const loadNiveles = async () => {
    try {
      const response = await listNivel();
      const data = await response.json();
      setNivel(data);
    } catch (error) {
      console.error("Error al cargar la lista de niveles:", error);
    }
  };

  const loadAsuntos = async () => {
    try {
      const response = await listAsunto();
      const data = await response.json();
      setAsunto(data);
    } catch (error) {
      console.error("Error al cargar la lista de asuntos:", error);
    }
  };

  const handleSearch = async () => {
    if (searchValue.trim() === "") {
      // Si el campo de búsqueda está vacío, cargar todos los turnos
      loadTurnos();
    } else {
      // Buscar por CURP o nombre
      try {
        const response = await findTurno(searchValue);
        const data = await response.json();
        setTurnos([data]); // Poner el resultado en un array para mantener la consistencia
      } catch (error) {
        console.error("Error al buscar el turno:", error);
        setTurnos([]); // Limpiar la lista en caso de error
      }
    }
  };

  const handleEdit = (turno) => {
    setSelectedTurno(turno);
    setEditedData({
      nTurno: turno.nTurno,
      idRep: turno.Representante.idRep, // Cambia esto al ID del representante
      curp: turno.Alumno.curp,
      idMunicipio: turno.Municipio.idMunicipio,
      idNivel: turno.Nivel.idNivel,
      idAsunto: turno.Asunto.idAsunto,
      // Añade otros campos aquí según sea necesario
    });
    setIdRepresentante(turno.Representante.id); // Actualiza el ID del representante seleccionado
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdateForm = async () => {
    try {
      await updateTurno(selectedTurno.Alumno.curp, editedData);
      console.log(selectedTurno.Alumno.curp);
      console.log(editedData);
      loadTurnos(); // Recargar la lista después de la actualización
      setSelectedTurno(null); // Limpiar el turno seleccionado
      setIsEditing(false); // Desactivar el modo de edición
    } catch (error) {
      console.error("Error al actualizar el turno:", error);
    }
  };

  const handleDelete = async () => {
    // Implementar la lógica para eliminar el turno seleccionado
    if (selectedTurno) {
      try {
        await deleteTurno(selectedTurno.idTurno);
        loadTurnos(); // Recargar la lista después de la eliminación
        setSelectedTurno(null); // Limpiar el turno seleccionado
      } catch (error) {
        console.error("Error al eliminar el turno:", error);
      }
    }
  };

  const handleStatusChange = async () => {
    // Implementar la lógica para cambiar el estado del turno seleccionado
    if (selectedTurno) {
      try {
        console.log(selectedTurno);
        // Actualizar el campo "id_status" del turno
        await switchTurnoStatus(selectedTurno.idTurno);
        loadTurnos(); // Recargar la lista después del cambio de estado
      } catch (error) {
        console.error("Error al cambiar el estado del turno:", error);
      }
    }
  };

  return (
    <div className="container-tickets" id="turno-container">
      {/* Componente para la búsqueda por CURP o nombre */}
      <div className="main-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por CURP o nombre"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        {/* Lista de turnos */}
        <ul className="turno-list">
          {turnos.map((turno) => {
            try {
              return (
                <li key={turno.idTurno} onClick={() => setSelectedTurno(turno)}>
                  {turno.nTurno} - {turno.Municipio.nombre} -{" "}
                  {turno.Alumno.curp} - {turno.Representante.nombre} -{" "}
                  {turno.Status.descripcion}
                  {/* Detalles y acciones para el turno seleccionado */}
                  {selectedTurno && selectedTurno.idTurno === turno.idTurno && (
                    <div className="details-container">
                      <h2>Detalles del Turno</h2>
                      <p>ID: {selectedTurno.idTurno}</p>
                      <p>
                        Nombre del Representante:{" "}
                        {selectedTurno.Representante.nombre}
                      </p>
                      <p>CURP del Alumno: {turno.Alumno.curp}</p>
                      <p>Municipio: {turno.Municipio.nombre}</p>
                      <p>Asunto: {turno.Asunto.descripcion}</p>
                      <p>Nivel: {turno.Nivel.descripcion}</p>
                      <p>Status: {turno.Status.descripcion}</p>
                      {/* ... Detalles ... */}
                      <div className="actions-container">
                        <button onClick={() => handleEdit(selectedTurno)}>
                          Editar
                        </button>
                        <button onClick={handleDelete}>Eliminar</button>
                        {/* Cambiar el estado del turno */}
                        <button onClick={() => handleStatusChange()}>
                          Cambiar status
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Formulario de edición */}
                  {selectedTurno &&
                    isEditing &&
                    selectedTurno.idTurno === turno.idTurno && (
                      <div className="edit-form">
                        <h2>Editar Turno</h2>
                        <label>
                          Representante:
                          <select
                            value={editedData.idRep}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                idRep: e.target.value,
                              })
                            }
                          >
                            <option value={null}>
                              Selecciona un representante
                            </option>
                            {representantes.map((representante) => (
                              <option
                                key={representante.idRep}
                                value={representante.idRep}
                              >
                                {representante.nombre}
                              </option>
                            ))}
                          </select>
                        </label>
                        <br />

                        <label>
                          CURP del alumno:
                          <input
                            type="text"
                            value={editedData.curp}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                curp: e.target.value,
                              })
                            }
                          />
                        </label>
                        <br />
                        <label>
                          Municipio:
                          <select
                            value={editedData.idMunicipio}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                idMunicipio: e.target.value,
                              })
                            }
                          >
                            <option value={null}>
                              Selecciona un municipio
                            </option>
                            {municipios.map((municipio) => (
                              <option
                                key={municipio.idMunicipio}
                                value={municipio.idMunicipio}
                              >
                                {municipio.nombre}
                              </option>
                            ))}
                          </select>
                        </label>

                        <br />

                        <label>
                          Nivel:
                          <select
                            value={editedData.idNivel}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                idNivel: e.target.value,
                              })
                            }
                          >
                            <option value={null}>Selecciona un nivel</option>
                            {niveles.map((nivel) => (
                              <option key={nivel.idNivel} value={nivel.idNivel}>
                                {nivel.descripcion}
                              </option>
                            ))}
                          </select>
                        </label>
                        <br />

                        <label>
                          Asunto:
                          <select
                            value={editedData.idAsunto}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                idAsunto: e.target.value,
                              })
                            }
                          >
                            <option value={null}>Selecciona un asunto</option>
                            {asuntos.map((asunto) => (
                              <option
                                key={asunto.idAsunto}
                                value={asunto.idAsunto}
                              >
                                {asunto.descripcion}
                              </option>
                            ))}
                          </select>
                        </label>

                        {/* Agrega otros campos del formulario según tus necesidades */}
                        <div className="actions-container">
                          <button onClick={handleUpdateForm}>
                            Guardar Cambios
                          </button>
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                        {/* ... Campos de edición ... */}
                      </div>
                    )}
                </li>
              );
            } catch (error) {
              console.error(
                "Error al renderizar un elemento de la lista de turnos:",
                error
              );
              // Puedes manejar el error de alguna manera, como mostrar un mensaje alternativo
              return (
                <li key={turno.idTurno} onClick={() => setSelectedTurno(turno)}>
                  Turno no encontrado
                </li>
              );
            }
          })}
        </ul>
      </div>
      {/* Formulario para registrar un nuevo turno */}
      <div className="form-container">
        <div>
          <h2>Registrar Nuevo Turno</h2>
        </div>
        {/* Implementa el formulario para recopilar la información del nuevo turno */}
        {/* y llama a la función handleRegister al hacer clic en un botón */}
        <RegistroTickets></RegistroTickets>
      </div>
    </div>
  );
};

export default TurnoAdminComponent;
