const API_URL = "http://localhost:5003/api/roles";

const getToken = () => localStorage.getItem("token");

export const getRoles = async () => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.json();
};

export const createRole = async (role) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ role })
  });

  return response.json();
};