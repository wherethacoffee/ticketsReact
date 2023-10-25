const API = 'https://apiticketturno-production.up.railway.app/nivel'

export const registerNivel = data => fetch(`${API}/agregar`, { 
    method: "POST",
    body: JSON.stringify({
        "descripcion": data.descripcion
      }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  export const listNivel = () => fetch(`${API}/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Buscar un Nivel por ID
  export const findNivel = (idNivel) => fetch(`${API}/buscar/${idNivel}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Actualizar un Nivel por ID
  export const updateNivel = (idNivel, data) => fetch(`${API}/actualizar/${idNivel}`, {
    method: "PUT",
    body: JSON.stringify({
      "descripcion": data.descripcion
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Eliminar un Nivel por ID
  export const deleteNivel = (idNivel) => fetch(`${API}/eliminar/${idNivel}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });