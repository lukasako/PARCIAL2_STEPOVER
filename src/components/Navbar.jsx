import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="navbar">
      <img src="../public/stepover.png" alt="StepOver Isotipo" name="StepOver"/>
      <div className="nav-user">
        <span>{user.name} ({user.role})</span>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}
