import React, { useState, useEffect, useMemo } from "react";
import {
  registerAlumno,
  listAlumno,
  deleteAlumno,
  updateAlumno,
} from "../services/alumno.services";
import {
  registerRepresentante,
  listRepresentante,
  deleteRepresentante,
  updateRepresentante,
} from "../services/representante.services";
import {
  registerAsunto,
  listAsunto,
  deleteAsunto,
  updateAsunto,
} from "../services/asunto.services";
import {
  registerNivel,
  listNivel,
  deleteNivel,
  updateNivel,
} from "../services/nivel.services";
import {
  registerEstado,
  listEstado,
  updateEstado,
  deleteEstado,
} from "../services/estado.services";
import {
  registerMunicipio,
  listMunicipio,
  updateMunicipio,
  deleteMunicipio,
} from "../services/municipio.services";
import {
  registerAdmin,
  listAdmins,
  updateAdmin,
  deleteAdmin,
} from "../services/admin.services";
import { useTable } from "react-table";

import "../styles/CrudComponent.css"; // Asegúrate de tener un archivo CSS para los estilos

const CrudComponent = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [alumnos, setAlumnos] = useState([]);
  const [representantes, setRepresentantes] = useState([]);
  const [asuntos, setAsuntos] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [admins, setAdmins] = useState([]);

  const columnsAlumno = useMemo(
    () => [
      { Header: "CURP", accessor: "curp" },
      { Header: "Nombre", accessor: "nombre" },
      { Header: "Apellido Paterno", accessor: "paterno" },
      { Header: "Apellido Materno", accessor: "materno" },
      // Agrega más columnas según las propiedades de tu modelo de datos
    ],
    []
  );

  const columnsRepresentantes = useMemo(
    () => [
      { Header: "ID", accessor: "idRep" },
      { Header: "Nombre", accessor: "nombre" },
      { Header: "Celular", accessor: "celular" },
      { Header: "Telefono", accessor: "telefono" },
      { Header: "Correo", accessor: "correo" },
      // Agrega más columnas según las propiedades de tu modelo de datos
    ],
    []
  );

  const columnsAsuntos = useMemo(
    () => [
      { Header: "ID", accessor: "idAsunto" },
      { Header: "Descripcion", accessor: "descripcion" },
      // Agrega más columnas según las propiedades de tu modelo de datos
    ],
    []
  );

  const columnsNiveles = useMemo(
    () => [
      { Header: "ID", accessor: "idNivel" },
      { Header: "Descripcion", accessor: "descripcion" },
      // Agrega más columnas según las propiedades de tu modelo de datos
    ],
    []
  );

  const columnsEstados = useMemo(
    () => [
      { Header: "ID", accessor: "idEstado" },
      { Header: "Nombre", accessor: "nombre" },
      // Agrega más columnas según las propiedades de tu modelo de datos
    ],
    []
  );

  const columnsMunicipios = useMemo(
    () => [
      { Header: "ID", accessor: "idMunicipio" },
      { Header: "Nombre", accessor: "nombre" },
      { Header: "idEstado", accessor: "idEstado" },
      // Agrega más columnas según las propiedades de tu modelo de datos
    ],
    []
  );

  const columnsAdmin = useMemo(
    () => [
      { Header: "ID", accessor: "idAdmin" },
      { Header: "Username", accessor: "username" },
      // Agrega más columnas según las propiedades de tu modelo de datos
    ],
    []
  );

  const CustomTable = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
        columns,
        data,
      });

    return (
      <table {...getTableProps()} className="mi-tabla-estilizada">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const fetchAlumnos = async () => {
    try {
      const response = await listAlumno();
      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.error("Error al obtener la lista de alumnos", error);
    }
  };

  const fetchRepresentantes = async () => {
    try {
      const response = await listRepresentante();
      const data = await response.json();
      setRepresentantes(data);
    } catch (error) {
      console.error("Error al obtener la lista de representantes", error);
    }
  };

  const fetchAsuntos = async () => {
    try {
      const response = await listAsunto();
      const data = await response.json();
      setAsuntos(data);
    } catch (error) {
      console.error("Error al obtener la lista de asuntos", error);
    }
  };

  const fetchNivel = async () => {
    try {
      const response = await listNivel();
      const data = await response.json();
      setNiveles(data);
    } catch (error) {
      console.error("Error al obtener la lista de niveles", error);
    }
  };

  const fetchEstado = async () => {
    try {
      const response = await listEstado();
      const data = await response.json();
      setEstados(data);
    } catch (error) {
      console.error("Error al obtener la lista de estados", error);
    }
  };

  const fetchMunicipio = async () => {
    try {
      const response = await listMunicipio();
      const data = await response.json();
      setMunicipios(data);
    } catch (error) {
      console.error("Error al obtener la lista de alumnos", error);
    }
  };

  const fetchAdmin = async () => {
    try {
      const response = await listAdmins();
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error("Error al obtener la lista de adminstradores", error);
    }
  };

  useEffect(() => {
    fetchAlumnos();
    fetchRepresentantes();
    fetchAsuntos();
    fetchEstado();
    fetchMunicipio();
    fetchNivel();
    fetchRepresentantes();
    fetchAdmin();
  }, []);

  const handleButtonClick = (formType) => {
    setSelectedForm(formType);
    setFormData({}); // Reinicia el formulario al cambiar de tipo
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Lógica para enviar los datos del formulario a la API según el tipo de formulario seleccionado
    // Utiliza la función adecuada según el tipo de formulario seleccionado
    try {
      switch (selectedForm) {
        case "alumno":
          await registerAlumno(formData);
          setFormData({});
          fetchAlumnos();
          break;
        case "representante":
          await registerRepresentante(formData);
          setFormData({});
          fetchRepresentantes();
          break;
        case "asunto":
          await registerAsunto(formData);
          setFormData({});
          fetchAsuntos();
          break;
        case "nivel":
          await registerNivel(formData);
          setFormData({});
          fetchNivel();
          break;
        case "estado":
          await registerEstado(formData);
          setFormData({});
          fetchEstado();
          break;
        case "municipio":
          await registerMunicipio(formData);
          setFormData({});
          fetchMunicipio();
          break;
        case "admin":
          await registerAdmin(formData);
          setFormData({});
          fetchAdmin();
          break;
        default:
          console.error("Tipo de formulario no válido");
      }
      // Después de enviar los datos, puedes hacer alguna acción, como recargar los datos.
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  const handleEditar = async (e) => {
    // Lógica para editar
    console.log("Editar:", formData);
    e.preventDefault();
    // Lógica para enviar los datos del formulario a la API según el tipo de formulario seleccionado
    // Utiliza la función adecuada según el tipo de formulario seleccionado
    try {
      switch (selectedForm) {
        case "alumno":
          await updateAlumno(formData.curp, formData);
          setFormData({});
          fetchAlumnos();
          break;
        case "representante":
          await updateRepresentante(formData.idRep, formData);
          setFormData({});
          fetchRepresentantes();
          break;
        case "asunto":
          await updateAsunto(formData.idAsunto, formData);
          setFormData({});
          fetchAsuntos();
          break;
        case "nivel":
          await updateNivel(formData.idNivel, formData);
          setFormData({});
          fetchNivel();
          break;
        case "estado":
          await updateEstado(formData.idEstado, formData);
          setFormData({});
          fetchEstado();
          break;
        case "municipio":
          await updateMunicipio(formData.idMunicipio, formData);
          setFormData({});
          fetchMunicipio();
          break;
        case "admin":
          await updateAdmin(formData.idAdmin, formData);
          setFormData({});
          fetchAdmin();
          break;
        default:
          console.error("Tipo de formulario no válido");
      }
      // Después de enviar los datos, puedes hacer alguna acción, como recargar los datos.
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  const handleBorrar = async (e) => {
    // Lógica para borrar
    console.log("Borrar:", formData);
    e.preventDefault();
    // Lógica para enviar los datos del formulario a la API según el tipo de formulario seleccionado
    // Utiliza la función adecuada según el tipo de formulario seleccionado
    try {
      switch (selectedForm) {
        case "alumno":
          await deleteAlumno(formData.curp);
          setFormData({});
          fetchAlumnos();
          break;
        case "representante":
          await deleteRepresentante(formData.idRep);
          setFormData({});
          fetchRepresentantes();
          break;
        case "asunto":
          await deleteAsunto(formData.idAsunto);
          setFormData({});
          fetchAsuntos();
          break;
        case "nivel":
          await deleteNivel(formData.idNivel);
          setFormData({});
          fetchNivel();
          break;
        case "estado":
          await deleteEstado(formData.idEstado);
          setFormData({});
          fetchEstado();
          break;
        case "municipio":
          await deleteMunicipio(formData.idMunicipio);
          setFormData({});
          fetchMunicipio();
          break;
        case "admin":
          await deleteAdmin(formData.idAdmin);
          setFormData({});
          fetchAdmin();
          break;
        default:
          console.error("Tipo de formulario no válido");
      }
      // Después de enviar los datos, puedes hacer alguna acción, como recargar los datos.
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const buttonName = e.nativeEvent.submitter.name;

    if (buttonName === "agregar") {
      await handleAgregar(e);
    } else if (buttonName === "editar") {
      await handleEditar(e);
    } else if (buttonName === "borrar") {
      await handleBorrar(e);
    }
  };

  return (
    <div className="crud-container">
      <h1>Editor para Administradores</h1>
      <div className="container-crud">
        <button
          className="container-crud"
          onClick={() => handleButtonClick("alumno")}
        >
          Alumno
        </button>
        <button onClick={() => handleButtonClick("representante")}>
          Representante
        </button>
        <button onClick={() => handleButtonClick("asunto")}>Asunto</button>
        <button onClick={() => handleButtonClick("nivel")}>Nivel</button>
        <button onClick={() => handleButtonClick("estado")}>Estado</button>
        <button onClick={() => handleButtonClick("municipio")}>
          Municipio
        </button>
        <button onClick={() => handleButtonClick("admin")}>Admin</button>
      </div>
      {selectedForm && (
        <form
          className="form-container-crud"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          {selectedForm === "alumno" && (
            <>
              <h3>El campo de "CURP" es obligatorio para editar y eliminar</h3>
              <label htmlFor="curp">CURP:</label>
              <input
                type="text"
                id="curp"
                name="curp"
                value={formData.curp || ""}
                onChange={(e) =>
                  setFormData({ ...formData, curp: e.target.value })
                }
              />
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <label htmlFor="paterno">Apellido Paterno:</label>
              <input
                type="text"
                id="paterno"
                name="paterno"
                value={formData.paterno || ""}
                onChange={(e) =>
                  setFormData({ ...formData, paterno: e.target.value })
                }
              />
              <label htmlFor="materno">Apellido Materno:</label>
              <input
                type="text"
                id="materno"
                name="materno"
                value={formData.materno || ""}
                onChange={(e) =>
                  setFormData({ ...formData, materno: e.target.value })
                }
              />

              <div className="button-group">
                <button type="submit" name="agregar">
                  Agregar
                </button>
                <button type="submit" name="editar">
                  Editar
                </button>
                <button type="submit" name="borrar">
                  Borrar
                </button>
              </div>

              <div>
                <h2>Listado de Alumnos</h2>
                <CustomTable columns={columnsAlumno} data={alumnos} />
              </div>
            </>
          )}
          {selectedForm === "representante" && (
            <div className="form-container-crud">
              <h3>El campo de "ID" solo es necesario para editar y eliminar</h3>
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="idRep"
                name="idRep"
                value={formData.idRep || ""}
                onChange={(e) =>
                  setFormData({ ...formData, idRep: e.target.value })
                }
              />

              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />

              <label htmlFor="celular">Celular:</label>
              <input
                type="text"
                id="celular"
                name="celular"
                value={formData.celular || ""}
                onChange={(e) =>
                  setFormData({ ...formData, celular: e.target.value })
                }
              />

              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono || ""}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
              />

              <label htmlFor="correo">Correo:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo || ""}
                onChange={(e) =>
                  setFormData({ ...formData, correo: e.target.value })
                }
              />

              <div className="button-group">
                <button type="submit" name="agregar">
                  Agregar
                </button>
                <button type="submit" name="editar">
                  Editar
                </button>
                <button type="submit" name="borrar">
                  Borrar
                </button>
              </div>

              <h2>Listado de Alumnos</h2>
              <CustomTable
                columns={columnsRepresentantes}
                data={representantes}
              />
            </div>
          )}

          {selectedForm === "asunto" && (
            <div className="form-container-crud">
              <h3>El campo de "ID" solo es necesario para editar y eliminar</h3>

              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="idAsunto"
                name="idAsunto"
                value={formData.idAsunto || ""}
                onChange={(e) =>
                  setFormData({ ...formData, idAsunto: e.target.value })
                }
              />

              <label htmlFor="descripcion">Descripción:</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion || ""}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
              />

              <div className="button-group">
                <button type="submit" name="agregar">
                  Agregar
                </button>
                <button type="submit" name="editar">
                  Editar
                </button>
                <button type="submit" name="borrar">
                  Borrar
                </button>
              </div>
              <h2>Listado de Asuntos</h2>
              <CustomTable columns={columnsAsuntos} data={asuntos} />
            </div>
          )}

          {selectedForm === "nivel" && (
            <div className="form-container-crud">
              <h3>El campo de "ID" solo es necesario para editar y eliminar</h3>
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="idNivel"
                name="idNivel"
                value={formData.idNivel || ""}
                onChange={(e) =>
                  setFormData({ ...formData, idNivel: e.target.value })
                }
              />

              <label htmlFor="descripcion">Descripción:</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion || ""}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
              />

              <div className="button-group">
                <button type="submit" name="agregar">
                  Agregar
                </button>
                <button type="submit" name="editar">
                  Editar
                </button>
                <button type="submit" name="borrar">
                  Borrar
                </button>
              </div>
              <h2>Listado de Niveles</h2>
              <CustomTable columns={columnsNiveles} data={niveles} />
            </div>
          )}

          {selectedForm === "estado" && (
            <div className="form-container-crud">
              <h3>El campo de "ID" solo es necesario para editar y eliminar</h3>
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="idEstado"
                name="idEstado"
                value={formData.idEstado || ""}
                onChange={(e) =>
                  setFormData({ ...formData, idEstado: e.target.value })
                }
              />

              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />

              <div className="button-group">
                <button type="submit" name="agregar">
                  Agregar
                </button>
                <button type="submit" name="editar">
                  Editar
                </button>
                <button type="submit" name="borrar">
                  Borrar
                </button>
              </div>

              <h2>Listado de Estados</h2>
              <CustomTable columns={columnsEstados} data={estados} />
            </div>
          )}

          {selectedForm === "municipio" && (
            <div className="form-container-crud">
              <h3>El campo de "ID" solo es necesario para editar y eliminar</h3>
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="idMunicipio"
                name="idMunicipio"
                value={formData.idMunicipio || ""}
                onChange={(e) =>
                  setFormData({ ...formData, idMunicipio: e.target.value })
                }
              />

              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />

              <label htmlFor="estado">Estado:</label>
              <select
                id="estado"
                name="estado"
                value={formData.idEstado || ""}
                onChange={(e) =>
                  setFormData({ ...formData, idEstado: e.target.value })
                }
              >
                <option value="seleccionar">Seleccionar</option>
                {estados.map((estado) => (
                  <option key={estado.idEstado} value={estado.idEstado}>
                    {estado.nombre}
                  </option>
                ))}
              </select>

              <div className="button-group">
                <button type="submit" name="agregar">
                  Agregar
                </button>
                <button type="submit" name="editar">
                  Editar
                </button>
                <button type="submit" name="borrar">
                  Borrar
                </button>
              </div>
              <h2>Listado de Municipios</h2>
              <CustomTable columns={columnsMunicipios} data={municipios} />
            </div>
          )}

          {selectedForm === "admin" && (
            <div className="form-container-crud">
              <h3>El campo de "ID" solo es necesario para editar y eliminar</h3>
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="idAdmin"
                name="idAdmin"
                value={formData.idAdmin || ""}
                onChange={(e) =>
                  setFormData({ ...formData, idAdmin: e.target.value })
                }
              />
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username || ""}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <div className="button-group">
                <button type="submit" name="editar">
                  Editar
                </button>
                <button type="submit" name="borrar">
                  Borrar
                </button>
              </div>
              <h2>Listado de Administradores</h2>
              <CustomTable columns={columnsAdmin} data={admins} />
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default CrudComponent;
