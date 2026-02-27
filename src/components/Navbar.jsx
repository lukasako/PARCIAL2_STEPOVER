import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/stepover.png"; // mové la imagen a /assets
import "../styles/navbar.css";

export default function Navbar({ darkMode, setDarkMode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="StepOver Logo" className="navbar-logo" />
      </div>

      <div className="nav-center">
        <span className="nav-area">
          <strong> {user.area}</strong>
        </span>
      </div>

      <div className="nav-user">
        <div
          className={`theme-toggle ${darkMode ? "dark" : ""}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          <span className="toggle-icon">
            {darkMode ? "🌙" : "☀️"}
          </span>
        </div>

        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}