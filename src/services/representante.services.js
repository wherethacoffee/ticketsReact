const API = 'https://apiticketturno-production.up.railway.app/rep'

export const registerRepresentante = data => fetch(`${API}/agregar`, {
    method: "POST",
    body: JSON.stringify({
        "nombre": data.nombre,
        "celular": data.celular,
        "telefono": data.telefono,
        "correo": data.correo
    }),
    headers: {
        "Content-Type": "application/json"
    }
});

export const listRepresentante = () => fetch(`${API}/listar`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
});

// Buscar un representante por ID
export const findRepresentante = (idRep) => fetch(`${API}/buscar/${idRep}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
});

// Actualizar un representante por ID
export const updateRepresentante = (idRep, data) => fetch(`${API}/actualizar/${idRep}`, {
    method: "PUT",
    body: JSON.stringify({
        "nombre": data.nombre,
        "celular": data.celular,
        "telefono": data.telefono,
        "correo": data.correo
    }),
    headers: {
        "Content-Type": "application/json"
    }
});

// Eliminar un representante por ID
export const deleteRepresentante = (idRep) => fetch(`${API}/eliminar/${idRep}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    }
});