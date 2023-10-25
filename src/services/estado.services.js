const API = 'https://apiticketturno-production.up.railway.app/estado'

export const registerEstado = data => fetch(`${API}/agregar`, { 
    method: "POST",
    body: JSON.stringify({
        "nombre": data.nombre
      }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  export const listEstado = () => fetch(`${API}/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Buscar un Estado por ID
  export const findEstado = (idEstado) => fetch(`${API}/buscar/${idEstado}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Actualizar un Estado por ID
  export const updateEstado = (idEstado, data) => fetch(`${API}/actualizar/${idEstado}`, {
    method: "PUT",
    body: JSON.stringify({
      "nombre": data.nombre
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Eliminar un Estado por ID
  export const deleteEstado = (idEstado) => fetch(`${API}/eliminar/${idEstado}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });