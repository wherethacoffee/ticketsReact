const API = 'https://apiticketturno-production.up.railway.app/admin'

export const registerAdmin = data => fetch(`${API}/agregar`, { 
    method: "POST",
    body: JSON.stringify({
        "username": data.username,
        "pwd": data.password
      }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  export const listAdmins = () => fetch(`${API}/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Buscar un admin por ID
  export const findAdmin = (idAdmin) => fetch(`${API}/buscar/${idAdmin}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Actualizar un admin por ID
  export const updateAdmin = (idAdmin, data) => fetch(`${API}/actualizar/${idAdmin}`, {
    method: "PUT",
    body: JSON.stringify({
      "username": data.username,
      "pwd": data.password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Eliminar un admin por ID
  export const deleteAdmin = (idAdmin) => fetch(`${API}/eliminar/${idAdmin}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });

  export const loginAdmin = data => fetch(`${API}/login`, { 
    method: "POST",
    body: JSON.stringify({
        "username": data.username,
        "pwd": data.password
      }),
    headers: {
      "Content-Type": "application/json"
    }
  });