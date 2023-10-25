const API = 'https://apiticketturno-production.up.railway.app/turno'

export const registerTurno = data => fetch(`${API}/agregar`, { 
    method: "POST",
    body: JSON.stringify({
        "idRep": data.nombre_realiza_tramite,
        "idMunicipio": data.municipio,
        "idStatus": 1,
        "idAsunto": data.asunto,
        "idNivel": data.nivel,
        "curp_alumno": data.curp
      }),
    headers: {
      "Content-Type": "application/json"
    }
  });
 

  export const listTurno = () => fetch(`${API}/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  export const listSolicitudes = () => fetch(`${API}/statusTotal`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Buscar un turno por ID
  export const findTurno = (idTurno) => fetch(`${API}/buscar/${idTurno}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Actualizar un turno por ID
  export const updateTurno = (id, curp, data) => fetch(`${API}/actualizar/${id}/${curp}`, {
    method: "PUT",
    body: JSON.stringify({
      "idRep": data.idRep,  // Asegúrate de que estás utilizando el ID del representante
      "idMunicipio": data.idMunicipio,
      "idAsunto": data.idAsunto,
      "idNivel": data.idNivel,
      "curp_alumno": data.curp
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
  
  );
  
  // Eliminar un turno por ID
  export const deleteTurno = (idTurno) => fetch(`${API}/eliminar/${idTurno}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });

  export const switchTurnoStatus = (idTurno) => fetch(`${API}/cambiarStatus/${idTurno}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  });