import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const decoded = decodeToken(token);

    if (decoded) {
      setUser(decoded);
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5003/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        throw new Error("Credenciales inválidas");
      }

      localStorage.setItem("token", data.token);

      const decoded = decodeToken(data.token);

      setUser(decoded);

      return { success: true, user: decoded };

    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};