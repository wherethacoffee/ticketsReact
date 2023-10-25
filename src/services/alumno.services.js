const API = 'https://apiticketturno-production.up.railway.app/alumno'

export const registerAlumno = data => fetch(`${API}/agregar`, { 
    method: "POST",
    body: JSON.stringify({
        "curp": data.curp,
        "nombre": data.nombre,
        "paterno": data.paterno,
        "materno": data.materno
      }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  export const listAlumno = () => fetch(`${API}/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Buscar un admin por ID
  export const findAlumno = (idAlumno) => fetch(`${API}/buscar/${idAlumno}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Actualizar un admin por ID
  export const updateAlumno = (idAlumno, data) => fetch(`${API}/actualizar/${idAlumno}`, {
    method: "PUT",
    body: JSON.stringify({
        "curp": data.curp,
        "nombre": data.nombre,
        "paterno": data.paterno,
        "materno": data.materno
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  // Eliminar un admin por ID
  export const deleteAlumno = (curp) => fetch(`${API}/eliminar/${curp}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });

