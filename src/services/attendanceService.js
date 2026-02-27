const API_URL = "http://localhost:5003/api/attendance";

const getToken = () => localStorage.getItem("token");

export const getMyAttendance = async () => {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!response.ok) throw new Error("Error obteniendo asistencia");

  return response.json();
};

export const getAttendanceByUser = async (userId) => {
  const response = await fetch(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!response.ok) throw new Error("Error obteniendo asistencia");

  return response.json();
};

export const updateAttendance = async (userId, days) => {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ days })
  });

  if (!response.ok) throw new Error("Error actualizando asistencia");

  return response.json();
};