import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AttendanceProvider } from "./context/AttendanceContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AttendanceProvider>
    <App />
  </AttendanceProvider>
);
