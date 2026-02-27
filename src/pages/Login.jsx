import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";
import loginImage from "../assets/login-image.jpg";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(username, password);

    if (!result.success) {
      setError(result.message || "Usuario o contraseña incorrectos");
      return;
    }

    const role = result.user.role;

    if (role === "admin") navigate("/admin");
    else if (role === "boss") navigate("/boss");
    else if (role === "employee") navigate("/employee");
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Ingresar</button>

            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;