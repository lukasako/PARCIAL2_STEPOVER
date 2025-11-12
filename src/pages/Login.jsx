import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";
import loginImage from "../assets/login-image.jpg";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      const role = JSON.parse(localStorage.getItem("user")).role;
      if (role === "admin") navigate("/admin");
      if (role === "boss") navigate("/boss");
      if (role === "employee") navigate("/employee");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-layout">
      <div className="login-image-section">
        <img src={loginImage} alt="Login visual" />
        <div className="image-overlay">
          <h1>StepOver</h1>
          <p>Gestión simple, moderna y eficiente.</p>
        </div>
      </div>

      <div className="login-form-section">
        <div className="login-box">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <label>Usuario</label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Ingresar</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
