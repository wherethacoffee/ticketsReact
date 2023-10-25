const API = 'https://apiticketturno-production.up.railway.app/municipio'

export const registerMunicipio = data => fetch(`${API}/agregar`, { 
    method: "POST",
    body: JSON.stringify({
        "nombre": data.nombre,
        "idEstado": data.idEstado
      }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  export const listMunicipio = () => fetch(`${API}/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Buscar un municipio por ID
  export const findMunicipio = (idMunicipio) => fetch(`${API}/buscar/${idMunicipio}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  //Listar municipios por Estado
  export const listMunicipiosByIdEstado = (idEstado) => fetch(`${API}/listarPorEstado/${idEstado}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Actualizar un municipio por ID
  export const updateMunicipio = (idMunicipio, data) => fetch(`${API}/actualizar/${idMunicipio}`, {
    method: "PUT",
    body: JSON.stringify({
      "nombre": data.nombre,
      "idEstado": data.idEstado
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Eliminar un municipio por ID
  export const deleteMunicipio = (idMunicipio) => fetch(`${API}/eliminar/${idMunicipio}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });