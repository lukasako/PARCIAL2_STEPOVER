const API_URL = "http://localhost:5003/api/menus";

const getToken = () => localStorage.getItem("token");

export const getMenuByUser = async (userId) => {
  const response = await fetch(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!response.ok) throw new Error("Error obteniendo menú");

  return response.json();
};

export const updateMenu = async (userId, selections) => {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ selections })
  });

  if (!response.ok) throw new Error("Error actualizando menú");

  return response.json();
};