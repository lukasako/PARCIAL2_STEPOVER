import express from "express";
import cors from "cors";
import { initializeUsers } from "./models/users.js";
import { initializeFoods } from "./models/foods.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import teamAttendanceRoutes from "./routes/teamAttendanceRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import areaRoutes from "./routes/areaRoutes.js";

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

//acciones antes de levantar el serv
await initializeUsers();
initializeFoods();

app.get("/", (req, res) => {
  res.json({ message: "API StepOver funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/team-attendance", teamAttendanceRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/areas", areaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});