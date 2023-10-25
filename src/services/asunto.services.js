const API = 'https://apiticketturno-production.up.railway.app/asunto'

export const registerAsunto = data => fetch(`${API}/agregar`, { 
    method: "POST",
    body: JSON.stringify({
        "descripcion": data.descripcion
      }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  export const listAsunto = () => fetch(`${API}/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Buscar un Asunto por ID
  export const findAsunto = (idAsunto) => fetch(`${API}/buscar/${idAsunto}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Actualizar un Asunto por ID
  export const updateAsunto = (idAsunto, data) => fetch(`${API}/actualizar/${idAsunto}`, {
    method: "PUT",
    body: JSON.stringify({
      "descripcion": data.descripcion
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Eliminar un Asunto por ID
  export const deleteAsunto = (idAsunto) => fetch(`${API}/eliminar/${idAsunto}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });