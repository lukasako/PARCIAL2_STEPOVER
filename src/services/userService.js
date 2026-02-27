const API_URL = "http://localhost:5003/api/users";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`
});

export const getUsers = async () => {
  const res = await fetch(API_URL, {
    headers: authHeaders()
  });

  if (!res.ok) throw new Error("Error obteniendo usuarios");

  return res.json();
};

export const getTeamUsers = async () => {
  const res = await fetch(`${API_URL}/team`, {
    headers: authHeaders()
  });

  if (!res.ok) throw new Error("Error obteniendo equipo");

  return res.json();
};

export const createUser = async (userData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(userData)
  });

  if (!res.ok) throw new Error("Error creando usuario");

  return res.json();
};

export const updateUser = async (userId, userData) => {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(userData)
  });

  if (!res.ok) throw new Error("Error actualizando usuario");

  return res.json();
};

export const deleteUser = async (userId) => {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
    headers: authHeaders()
  });

  if (!res.ok) throw new Error("Error eliminando usuario");

  return res.json();
};