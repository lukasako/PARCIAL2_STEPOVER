const API_URL = "http://localhost:5003/api/areas";

const getToken = () => localStorage.getItem("token");

export const getAreas = async () => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.json();
};

export const createArea = async (area) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ area })
  });

  return response.json();
};