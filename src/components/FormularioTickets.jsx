import React from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import "../styles/FormStyle.css";
import { registerTurno } from "../services/turno.services";
import { listMunicipio, findMunicipio } from "../services/municipio.services";
import { listNivel, findNivel } from "../services/nivel.services";
import { useState, useEffect } from "react";
import { listAsunto, findAsunto } from "../services/asunto.services";
import { listRepresentante } from "../services/representante.services";
import { listAlumno } from "../services/alumno.services";
import { useNavigate } from 'react-router-dom';

const RegistroTickets = () => {
    const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    control,
  } = useForm();

  const [niveles, setNiveles] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [asuntos, setAsuntos] = useState([]);

  // Resto del código...
  useEffect(() => {
    // Cargar datos para el select de Nivel
    const fetchNiveles = async () => {
      try {
        const response = await listNivel();
        const nivelesData = await response.json();
        setNiveles(nivelesData);
      } catch (error) {
        console.error("Error al obtener los niveles", error);
      }
    };
    // Cargar datos para el select de Municipio usando la función listMunicipio
    const fetchMunicipios = async () => {
      try {
        const response = await listMunicipio();
        const municipiosData = await response.json();
        setMunicipios(municipiosData);
      } catch (error) {
        console.error("Error al obtener municipios", error);
      }
    };

    // Cargar datos para el select de Asunto
    const fetchAsuntos = async () => {
      try {
        const response = await listAsunto();
        const asuntosData = await response.json();
        setAsuntos(asuntosData);
      } catch (error) {
        console.error("Error al obtener asuntos", error);
      }
    };

    // Llama a la función para cargar los municipios
    fetchMunicipios();
    fetchNiveles();
    fetchAsuntos();
  }, []);

  const getRepresentanteId = async (nombre) => {
    try {
      // Obtener la lista de representantes
      const response = await listRepresentante();
      const representantes = await response.json();

      // Buscar el representante por nombre
      const representanteEncontrado = representantes.find(
        (rep) => rep.nombre === nombre
      );

      if (representanteEncontrado) {
        return representanteEncontrado;
      } else {
        console.error("Representante no encontrado");
        // Puedes manejar el caso en que el representante no se encuentre
        // Puedes lanzar un error, devolver un valor predeterminado, etc.
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el representante", error);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
      throw error;
    }
  };

  const getAlumnoCurp = async (curp) => {
    try {
      // Obtener la lista de representantes
      const responseAlumno = await listAlumno();
      const alumnos = await responseAlumno.json();

      // Buscar el representante por nombre
      const alumnoEncontrado = alumnos.find((alumno) => alumno.curp === curp);

      if (alumnoEncontrado) {
        return alumnoEncontrado;
      } else {
        console.error("Alumno no encontrado");
        // Puedes manejar el caso en que el representante no se encuentre
        // Puedes lanzar un error, devolver un valor predeterminado, etc.
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el alumno", error);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      // Obtener el ID del representante basado en el nombre
      const idRep = await getRepresentanteId(data.nombre_realiza_tramite);
      const curpAlumno = await getAlumnoCurp(data.curp);

      // Verificar que se obtuvo un ID de representante
      if (!idRep) {
        throw new Error("No se encontró un representante con ese nombre.");
      }

      if (idRep.correo !== data.correo) {
        throw new Error(
          "El correo no coincide con el registrado para el representante."
        );
      }

      if (idRep.telefono !== data.telefono) {
        throw new Error(
          "El teléfono no coincide con el registrado para el representante."
        );
      }

      if (idRep.celular !== data.celular) {
        throw new Error(
          "El celular no coincide con el registrado para el representante."
        );
      }

      if (!curpAlumno) {
        throw new Error("No se encontró un alumno con esa curp.");
      }

      if (curpAlumno.nombre !== data.nombre) {
        throw new Error(
          "El nombre no coincide con el registrado para el alumno."
        );
      }

      if (curpAlumno.paterno !== data.paterno) {
        throw new Error(
          "El apellido paterno no coincide con el registrado para el alumno."
        );
      }

      if (curpAlumno.materno !== data.materno) {
        throw new Error(
          "El apellido materno no coincide con el registrado para el alumno."
        );
      }

      data.nombre_realiza_tramite = idRep.idRep;

      // Enviar la solicitud con el objeto body
      const response = await registerTurno(data);
      console.log(idRep, data);

      // Verificar si la respuesta contiene un archivo PDF
      if (response.headers.get("Content-Type") === "application/pdf") {
        // Obtener el blob del PDF
        const blob = await response.blob();

        // Crear un objeto URL del blob
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace y hacer clic en él para iniciar la descarga
        const a = document.createElement("a");
        a.href = url;
        a.download = "turno.pdf";
        a.click();

        // Limpiar el objeto URL después de la descarga
        window.URL.revokeObjectURL(url);
      }

      // Mostrar mensaje de éxito solo si la solicitud se completa con éxito
      Swal.fire({
        icon: "success",
        title: "Ticket registrado",
        html: `
                        <p>Datos del alumno</p>
                        <p><strong>CURP:</strong> ${data.curp}</p>
                        <p><strong>Nombre:</strong> ${curpAlumno.nombre}</p>
                        <p><strong>Apellidos:</strong> ${curpAlumno.paterno} ${curpAlumno.materno}</p>

                      
                    `,
      });
      navigate('/')
    } catch (error) {
      console.error("Error al registrar el turno", error);
      Swal.fire({
        icon: "error",
        title: "Error al registrar el turno",
        text: error.message,
      });
    }
  };

  const update = () => {};

  return (
    <div className="container">
      <h1>Ticket de turno</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nombre_realiza_tramite">
          Nombre completo de quien realizará el trámite:
        </label>
        <input
          type="text"
          {...register("nombre_realiza_tramite", {
            required: {
              value: true,
              message: "Rellene el campo vacio",
            },
            pattern: {
              value: /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+ [A-Za-záéíóúüñÁÉÍÓÚÜÑ]+$/,
              message:
                "Digite su nombre completo (primer nombre y primer apellido)",
            },
          })}
        />
        {errors.nombre_realiza_tramite && (
          <span>{errors.nombre_realiza_tramite.message}</span>
        )}
        <label htmlFor="curp">CURP:</label>
        <input
          type="text"
          {...register("curp", {
            required: {
              value: "true",
              message: "Digite la CURP del alumno",
            },
            pattern: {
              value: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/,
              message: "CURP no valida",
            },
          })}
        />
        {errors.curp && <span>{errors.curp.message}</span>}
        {} <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          {...register("nombre", {
            required: {
              value: "true",
              message: "Digite el nombre del alumno",
            },
            minLength: {
              value: 2,
              message: "Debe de ser de más de dos caracteres",
            },
            maxLength: {
              value: 15,
              message: "Debe de ser de menos de quince caracteres",
            },
          })}
        />
        {errors.nombre && <span>{errors.nombre.message}</span>}
        <label htmlFor="paterno">Paterno:</label>
        <input
          type="text"
          {...register("paterno", {
            required: {
              value: "true",
              message: "Digite el primer apellido del alumno",
            },
            minLength: {
              value: 2,
              message: "Debe de ser de más de dos caracteres",
            },
            maxLength: {
              value: 15,
              message: "Debe de ser de menos de quince caracteres",
            },
          })}
        />
        {errors.paterno && <span>{errors.paterno.message}</span>}
        <label htmlFor="materno">Materno:</label>
        <input
          type="text"
          {...register("materno", {
            required: {
              value: "true",
              message: "Digite el segundo apellido del alumno",
            },
            minLength: {
              value: 2,
              message: "Debe de ser de más de dos caracteres",
            },
            maxLength: {
              value: 15,
              message: "Debe de ser de menos de quince caracteres",
            },
          })}
        />
        {errors.materno && <span>{errors.materno.message}</span>}
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="number"
          {...register("telefono", {
            required: {
              value: true,
              message: "Digite su telefono",
            },
            minLength: {
              value: 10,
              message: "Minimo 10 caracteres",
            },
            maxLength: {
              value: 10,
              message: "Maximo 10 caracteres",
            },
          })}
        />
        {errors.telefono && <span>{errors.telefono.message}</span>}
        <label htmlFor="celular">Celular:</label>
        <input
          type="number"
          {...register("celular", {
            required: {
              value: true,
              message: "Digite su celular",
            },
            minLength: {
              value: 10,
              message: "Minimo 10 caracteres",
            },
            maxLength: {
              value: 10,
              message: "Maximo 10 caracteres",
            },
          })}
        />
        {errors.celular && <span>{errors.celular.message}</span>}
        <label htmlFor="correo">Correo:</label>
        <input
          type="email"
          {...register("correo", {
            required: {
              value: "true",
              message: "Rellene el campo vacio",
            },
            pattern: {
              value: /[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/,
              message: "Digite un correo valido",
            },
          })}
        />
        {errors.correo && <span>{errors.correo.message}</span>}
        <label htmlFor="nivel">Nivel:</label>
        <select
          {...register("nivel", {
            validate: (value) => {
              return value !== "seleccionar" || "Selecciona un nivel";
            },
          })}
        >
          <option value="seleccionar">Seleccionar</option>
          {niveles.map((nivel) => (
            <option key={nivel.idNivel} value={nivel.idNivel}>
              {nivel.descripcion}
            </option>
          ))}
        </select>
        {errors.nivel && <span>{errors.nivel.message}</span>}
        <label htmlFor="municipio">Municipio:</label>
        <select
          {...register("municipio", {
            validate: (value) => {
              return value !== "seleccionar" || "Selecciona un municipio";
            },
          })}
        >
          <option value="seleccionar">Seleccionar</option>
          {municipios.map((municipio) => (
            <option key={municipio.idMunicipio} value={municipio.idMunicipio}>
              {municipio.nombre}
            </option>
          ))}
        </select>
        {errors.municipio && <span>{errors.municipio.message}</span>}
        <label htmlFor="asunto">Asunto:</label>
        <select
          {...register("asunto", {
            validate: (value) => {
              return value !== "seleccionar" || "Selecciona un asunto";
            },
          })}
        >
          <option value="seleccionar">Seleccionar</option>
          {asuntos.map((asunto) => (
            <option key={asunto.idAsunto} value={asunto.idAsunto}>
              {asunto.descripcion}
            </option>
          ))}
        </select>
        {errors.asunto && <span>{errors.asunto.message}</span>}
        <div className="buttons-container">
          <button type="submit" className="btn-submit-ticket">
            Generar Turno
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroTickets;
