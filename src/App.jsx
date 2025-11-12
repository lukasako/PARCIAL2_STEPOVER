import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import BossPage from "./pages/BossPage";
import EmployeePage from "./pages/EmployeePage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/colors.css";
import "./styles/main.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} />
          <Route path="/boss" element={<ProtectedRoute role="boss"><BossPage /></ProtectedRoute>} />
          <Route path="/employee" element={<ProtectedRoute role="employee"><EmployeePage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
