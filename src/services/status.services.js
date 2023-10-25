const API = 'https://apiticketturno-production.up.railway.app/status'

export const registerStatus = data => fetch(`${API}/agregar`, { 
    method: "POST",
    body: JSON.stringify({
        "descripcion": data.descripcion
      }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  export const listStatus = () => fetch(`${API}/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Buscar un Status por ID
  export const findStatus = (idStatus) => fetch(`${API}/buscar/${idStatus}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Actualizar un Status por ID
  export const updateStatus = (idStatus, data) => fetch(`${API}/actualizar/${idStatus}`, {
    method: "PUT",
    body: JSON.stringify({
      "descripcion": data.descripcion
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Eliminar un Status por ID
  export const deleteStatus = (idStatus) => fetch(`${API}/eliminar/${idStatus}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });