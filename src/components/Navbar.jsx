import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar({ darkMode, setDarkMode }){
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="navbar">
      <img src="../public/stepover.png" alt="StepOver Isotipo" name="StepOver"/>
      <div className="nav-user">
      <div className={`theme-toggle ${darkMode ? "dark" : ""}`} onClick={() => setDarkMode(!darkMode)}>
        <span className="toggle-icon">
          {darkMode ? "🌙" : "☀️"}
        </span>
      </div>
        <span>{user.name}</span>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}
